"use server"
import { ID, Query } from "node-appwrite";
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
export async function CreateUser(userData: CreateUserParams) {

    try {
        const newuser = await users.create(
            ID.unique(),
            userData.email,
            userData.phone,
            undefined,
            userData.name
        );

        return parseStringify(newuser);
    } catch (error: any) {
        // Check existing user
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal("email", [userData.email]),
            ]);

            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", error);
    }

}

export async function getUser(userId: string) {
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error) {
        console.error(error)
    }
}

export async function registerPatient(patient: any, formData?: FormData) {

    try {
        let file;
        if (formData) {
            const blobFile = formData.get("blobFile") as Blob;
            const fileName = formData.get("fileName") as string;
            const inputFile = InputFile.fromBuffer(blobFile, fileName);
            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
        }

        const newPatient = await databases.createDocument(DATABASE_ID!, PATIENT_COLLECTION_ID!, ID.unique(), {
            ...patient,
            identificationDocumentId: file?.$id || null,
            identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        })

        return parseStringify(newPatient)
    } catch (error) {
        console.error(error)
    }
}

export async function getPatient(userId: string) {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal('userId', userId)]
        )
        return parseStringify(patients.documents[0])
    } catch (error) {
        console.error(error)
    }
}

