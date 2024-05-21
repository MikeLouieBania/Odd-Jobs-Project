import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

// table for the system admin
export const adminTable = pgTable("system_admin", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
});

// table for the different users - company(staff,supervisor,staff) and marines
export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    studentNumber: text("studentNumber").unique(),
    dept: text("dept"),
    address: text("address"),
});

export const errand = pgTable("errand", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    userId: text("user_id").references(() => userTable.id),
    payment: text("payment").notNull(),
    dateCreated: timestamp("date_created", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
    status: text("status").default('available'), // New field for status
    assignedUserId: text("assigned_user_id").references(() => userTable.id), // New field for assigned user
});

export const transactionTable = pgTable("transaction", {
    id: text("id").primaryKey(),
    receiverAccountNumber: text("receiver_account_number").notNull(),
    senderAccountNumber: text("sender_account_number").notNull(),
    amount: text("amount").notNull(),
    errandId: text("errand_id").references(() => errand.id), // Reference to the errand table
});

export const chat = pgTable("chat", {
    id: text("id").primaryKey(),
    senderId: text("sender_id").references(() => userTable.id),
    receiverId: text("receiver_id").references(() => userTable.id)
});

export const message = pgTable("message", {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    timestamp: timestamp("timestamp", {
        withTimezone: true,
        mode: "date",
    }).notNull().defaultNow(),
    senderId: text("sender_id").references(() => userTable.id),
    conversationId: text("conversation_id").references(() => chat.id)
});

export const sessionUserTable = pgTable("user_session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

export const messageRelation = relations(message, ({ one }) => ({
    sender: one(userTable, {
        fields: [message.senderId],
        references: [userTable.id]
    }),
    conversation: one(chat, {
        fields: [message.conversationId],
        references: [chat.id]
    })
}));

export const chatRelation = relations(chat, ({ one }) => ({
    sender: one(userTable, {
        fields: [chat.senderId],
        references: [userTable.id]
    }),
    receiver: one(userTable, {
        fields: [chat.receiverId],
        references: [userTable.id]
    })
}));

export const postRelation = relations(errand, ({ one, many }) => ({
    user: one(userTable, {
        fields: [errand.userId],
        references: [userTable.id]
    }),
    assignedUser: one(userTable, {
        fields: [errand.assignedUserId],
        references: [userTable.id]
    })
}));

export const transactionRelation = relations(transactionTable, ({ one }) => ({
    errand: one(errand, {
        fields: [transactionTable.errandId],
        references: [errand.id]
    })
}));