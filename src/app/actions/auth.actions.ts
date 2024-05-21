"use server"

import { z } from "zod"
import { signUpFormSchema, signInFormSchema, errandSchema, transactionSchema } from "../../types"
import { Argon2id } from "oslo/password"
import { generateId } from "lucia"
import { chat, errand, message, transactionTable, userTable } from "@/database/schema"
import db from "@/database"
import { lucia, validateRequest } from "@/database/auth"
import { cookies } from "next/headers"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// Function for sign-up
export const signUp = async (values: z.infer<typeof signUpFormSchema>) => {
    const hashedPassword = await new Argon2id().hash(values.password)
    const userId = generateId(15)

    try {
        await db
            .insert(userTable)
            .values({
                id: userId,
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                passwordHash: hashedPassword,
                studentNumber: values.studentNumber,
                address: values.address,
                dept: values.dept,
            })
            .returning({
                id: userTable.id,
                email: userTable.email,
            })

        return {
            success: true,
            values: {
                userId,
            },
        };

    } catch (e) {
        return {
            success: false,
            error: e,
        };
    }
}

// Function for sign-in
export const signIn = async (values: z.infer<typeof signInFormSchema>) => {
    const existingUser = await db.query.userTable.findFirst({
        where: (table) => eq(table.email, values.email),
    })

    if (!existingUser) {
        return {
            success: false,
            error: "User not found"
        }
    }

    const isValidPassword = await new Argon2id().verify(
        existingUser.passwordHash,
        values.password
    )

    if (!isValidPassword) {
        return {
            success: false,
            error: "Incorrect Email or Password"
        }
    }

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30,
    })

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return {
        success: "Logged In Succcesfully",
    };
    //
}

// Function for sign-out
export const signOut = async () => {
    try {
        const { session } = await validateRequest();

        if (!session) {
            return {
                error: "Unauthorized"
            }
        }

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (error: any) {
        return {
            error: error?.message,
        }
    }
}

export const createPost = async (userId: string, values: z.infer<typeof errandSchema>) => {
    const userCode = generateId(15)
    try {
        const user = await db.query.userTable.findFirst({
            where: eq(userTable.id, userId),
        });

        await db
            .insert(errand)
            .values({
                id: userCode,
                title: values.title,
                userId: userId,
                description: values.description,
                payment: values.payment,
                dateCreated: new Date(),
                status: "Available"
            })
        revalidatePath("/homepage/dashboard");
        return {
            success: true,
            values: {
                userId,
            },

        };
    } catch (e) {
        return {
            success: false,
            error: e,
        };
    }
}

export const getPost = async () => {
    try {
        const post = await db.query.errand.findMany({
            where: eq(errand.status, "Available"),
            columns: {
                id: true,
                title: true,
                description: true,
                payment: true,
                dateCreated: true,
                status: true,
            },
            with: {
                user: {
                    columns: {
                        firstName: true,
                        lastName: true,
                    }
                }
            },
        });

        return post;
    } catch (error) {
        throw new Error("Failed to fetch posts");
    }
};

export const acceptErrand = async (errandId: string, userId: string) => {
    try {
        // Fetch the user who is accepting the errand
        const user = await db.query.userTable.findFirst({
            where: eq(userTable.id, userId),
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Fetch the errand details and the user who posted it
        const errandDetails = await db.query.errand.findFirst({
            where: eq(errand.id, errandId),
            with: {
                user: true,
            },
        });

        if (!errandDetails) {
            throw new Error("Errand not found");
        }

        const posterId = errandDetails.userId;

        // Check if the user trying to accept the errand is the same as the user who posted it
        if (posterId === userId) {
            throw new Error("You cannot accept your own errand");
        }

        // Update the errand status and assigned user
        await db
            .update(errand)
            .set({
                status: 'Accepted',
                assignedUserId: userId,
            })
            .where(eq(errand.id, errandId));

        // Generate a conversation ID
        const conversationId = generateId(15);

        // Insert a new chat entry
        await db.insert(chat).values({
            id: conversationId,
            senderId: userId,
            receiverId: posterId,
        });

        // Insert the auto-generated message
        await db.insert(message).values({
            id: generateId(15),
            content: `Hi, I am ${user.firstName} ${user.lastName}. I'll be doing your errand for you.`,
            timestamp: new Date(),
            senderId: userId,
            conversationId: conversationId,
        });

        revalidatePath("/homepage/dashboard")

        return {
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            error: e,
        };
    }
};

export async function fetchCurrentUserId() {
    const session = await validateRequest(); // Assuming validateRequest returns the user session
    if (session) {
        const user = await db.query.userTable.findFirst({
            where: eq(userTable.email, session.user?.email),
            columns: { id: true },
        });
        return user?.id;
    } else {
        throw new Error("Unauthorized");
    }
}

export const fetchUsers = async () => {
    const users = await db.query.userTable.findMany({
        columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        }
    });
    return users;
};

export const fetchChats = async () => {
    const chats = await db.query.chat.findMany({
        columns: {
            id: true,
            senderId: true,
            receiverId: true,
        },
    });
    return chats;
};

// Function to fetch messages
export const fetchMessages = async (chatId: string) => {
    const messages = await db.query.message.findMany({
        where: eq(message.conversationId, chatId),
        columns: {
            id: true,
            content: true,
            timestamp: true,
            senderId: true,
            conversationId: true,
        },
        with: {
            sender: {
                columns: {
                    firstName: true,
                    lastName: true,
                }
            },
        }
    });
    return messages;
};

// Function to send a message
export const sendMessage = async (chatId: string, senderId: string, content: string) => {
    await db.insert(message).values({
        id: generateId(15),
        conversationId: chatId,
        senderId,
        content,
        timestamp: new Date(),
    });
};

export const getPayableTransaction = async () => {
    try {
        const { user } = await validateRequest()
        const userId = user?.id

        if (!userId) {
            throw new Error("User is non-existent")
        }

        const completed_errand = await db.query.errand.findMany({
            where: eq(errand.status, "Accepted"),
            with: {
                assignedUser: {
                    columns: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })

        return completed_errand;
    } catch (error) {
        throw new Error("Failed to get Payable Transactions")
    }
}

export const sendPayment = async (values: z.infer<typeof transactionSchema>) => {
    try {
        await db
            .insert(transactionTable)
            .values({
                id: generateId(15),
                receiverAccountNumber: values.receiverAccountNumber,
                senderAccountNumber: values.senderAccountNumber,
                amount: values.amount,
                errandId: values.errandId,
            })

        await db
            .update(errand)
            .set({
                status: "Completed",
            })

        revalidatePath("/homepage/dashboard");
        return {
            success: true,
        };
    } catch (error) {
        throw new Error("Failed to Pay")
    }
}