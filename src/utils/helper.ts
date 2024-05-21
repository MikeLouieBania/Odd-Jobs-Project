import { z } from "zod";

/**
 * Generates an image validator based on the environment.
 * If running in a browser environment, validates File instances for image type.
 * If running in a non-browser environment, returns a null validator.
 * @returns {z.ZodType<null|File>} - The generated image validator.
 */

export function getImageValidator() {
    let imageValidator;

    if (typeof window === "undefined") {
        imageValidator = z.null();
    } else {
        imageValidator = z
            .instanceof(File)
            .refine((file) => file?.type === "image/png" || file?.type === "image/jpeg", {
                message: "Image file must be a png or jpg",
            });
    }

    return imageValidator;
} 