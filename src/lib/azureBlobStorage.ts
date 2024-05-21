// Note: The following functions were implemented for Azure Blob Storage but are not currently used in the system,
// as Cloudinary is used for file storage instead.

import { BlobServiceClient } from "@azure/storage-blob";

import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const accountName = process.env.ACCOUNT_NAME!;
const sasToken = process.env.SAS_TOKEN!;
const containerName = process.env.CONTAINER_NAME!;

const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/?${sasToken}`);
const containerClient = blobServiceClient.getContainerClient(containerName);

/**
 * Uploads a file to Azure Blob Storage.
 * @param fileBuffer The file buffer to upload.
 * @param fileName The name of the file to be stored.
 * @returns The URL of the uploaded file.
 */

export async function uploadFileToAzure(fileBuffer: Buffer, fileName: string): Promise<string> {
    try {
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(fileBuffer);
        return blockBlobClient.url;
    } catch (error: any) {
        throw new Error(`Failed to upload file to Azure Blob Storage: ${error.message}`);
    }
}

// for future references
export const uploadDocumentToAzure = async (file: File, fileName: string) => {
    const data = Buffer.from(await file.arrayBuffer());
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const response = await blockBlobClient.uploadData(data, {
        blobHTTPHeaders: {
            blobContentType: file.type,
        },
    });
    if (response._response.status !== 201) {
        throw new Error(
            `Error uploading document ${blockBlobClient.name} to container ${blockBlobClient.containerName}`
        );
    }
};

/**
 * Downloads a document from Azure Blob Storage.
 */
export const downloadDocumentFromAzure = async () => {
    const blockBlobClient = containerClient.getBlockBlobClient("FILENAME-TO-DOWNLOAD");
    const response = await blockBlobClient.download(0);
    if (response.readableStreamBody) {
        return await streamToString(response.readableStreamBody);
    } else {
        throw new Error(
            `Error downloading document ${blockBlobClient.name} from container ${blockBlobClient.containerName}`
        );
    }
};

const streamToString = async (
    readableStream: NodeJS.ReadableStream
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        readableStream.on("data", (data) => {
            chunks.push(data);
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks).toString("base64"));
        });
        readableStream.on("error", reject);
    });
};

/**
 * Deletes a document from Azure Blob Storage.
 */
export const deleteDocumentFromAzure = async () => {
    const response = await containerClient.deleteBlob("FILENAME-TO-DELETE");
    if (response._response.status !== 202) {
        throw new Error(`Error deleting ${"FILENAME-TO-DELETE"}`);
    }
};  