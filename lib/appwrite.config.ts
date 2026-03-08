import * as sdk from 'node-appwrite';

export const {
    NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    NEXT_PUBLIC_APPWRITE_ENDPOINT,
    API_SECRET,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    APPOINMENTS_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

export const client = new sdk.Client();

client
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(API_SECRET!);

// Exporting instances of the services for use in other files
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
