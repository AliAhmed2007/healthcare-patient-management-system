"use server"
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

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