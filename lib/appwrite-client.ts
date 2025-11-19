import { Client, Account, Databases } from "appwrite";

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (projectId) {
    client
        .setEndpoint(endpoint)
        .setProject(projectId);
} else {
    console.warn("Appwrite Project ID not found in environment variables (NEXT_PUBLIC_APPWRITE_PROJECT_ID)");
}

export const account = new Account(client);
export const databases = new Databases(client);
export { client };
