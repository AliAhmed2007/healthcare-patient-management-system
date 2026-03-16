"use server"
import { ID, Query } from "node-appwrite"
import { DATABASE_ID, databases, APPOINMENTS_COLLECTION_ID, PATIENT_COLLECTION_ID } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"

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


export async function getRecentAppointments() {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINMENTS_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        )

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointments.documents as unknown as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === "scheduled") {
                acc.scheduledCount += 1
            } else if (appointment.status === "cancelled") {
                acc.cancelledCount += 1
            } else if (appointment.status === "pending") {
                acc.pendingCount += 1
            }

            return acc
        }, initialCounts)

        const documentsWithPatients = await Promise.all(
            appointments.documents.map(async (appointment) => {
                const patientProfile = await databases.getDocument(
                    DATABASE_ID!,
                    PATIENT_COLLECTION_ID!, 
                    appointment.patient
                );

                return {
                    ...appointment,
                    patient: patientProfile, // We overwrite the string ID with the full patient object
                };
            })
        );

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: documentsWithPatients // <-- Pass the newly merged data here
        }
        
        return parseStringify(data)
    } catch (error) {
        console.error(error)
    }
}

export async function updateAppointment({ userId, appointmentId, appointment, type }: UpdateAppointmentParams) {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINMENTS_COLLECTION_ID!,
            appointmentId,
            appointment
        )
        if (!updateAppointment) {
            throw new Error("Appointment Not Found");
        }

        // TODO: SMS Notification

        revalidatePath("/admin")
        return parseStringify(updatedAppointment)

    } catch (error) {
        console.error(error)
    }
}