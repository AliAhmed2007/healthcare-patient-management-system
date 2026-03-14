"use server"
import { ID } from "node-appwrite"
import { DATABASE_ID, databases, APPOINMENTS_COLLECTION_ID } from "../appwrite.config"
import { parseStringify } from "../utils"

export async function createAppointment(appointment: CreateAppointmentParams) {
    try {
        const newAppointment = await databases.createDocument(DATABASE_ID!, APPOINMENTS_COLLECTION_ID!, ID.unique(), {
            ...appointment,
        })

        return parseStringify(newAppointment)
    } catch (error) {
        console.error(error)
    }
}

export async function getAppointment(appointmentId: string) {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINMENTS_COLLECTION_ID!,
            appointmentId
        )

        return parseStringify(appointment)
    } catch (error) {
        console.error(error)
    }
}
