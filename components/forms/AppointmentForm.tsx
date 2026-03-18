"use client";
import { getAppointmentSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { FieldGroup } from "@/components/ui/field";
import InputField, { FieldTypesEnum } from "../InputField";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/lib/actions/patient.actions";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Doctors } from "@/constants";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";

function AppointmentForm({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment: Appointment;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    try {
      let status;
      switch (type) {
        case "schedule":
          status = "scheduled";
          break;
        case "cancel":
          status = "cancelled";
          break;
        default:
          status = "pending";
          break;
      }

      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason!,
          note: values.note!,
          status: status as Status,
          schedule: new Date(values.schedule),
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`,
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment.$id,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  return (
    <form
      id="form-rhf-input"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 flex-1"
    >
      {type === "create" && (
        <section className="space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>
      )}
      <FieldGroup>
        {type !== "cancel" && (
          <>
            <InputField
              fieldType={FieldTypesEnum.SELECT}
              formControl={form.control}
              label="Doctor"
              name="primaryPhysician"
              placeholder="Select a Doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </InputField>

            <InputField
              fieldType={FieldTypesEnum.DATE_PICKER}
              formControl={form.control}
              name="schedule"
              label="Expected Appointment Date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <InputField
                fieldType={FieldTypesEnum.TEXTAREA}
                formControl={form.control}
                label="Reason for Appointment"
                name="reason"
                placeholder="Enter a reason for appointment"
              />
              <InputField
                fieldType={FieldTypesEnum.TEXTAREA}
                formControl={form.control}
                label="Notes"
                name="note"
                placeholder="Enter your Notes"
              />
            </div>
          </>
        )}
        {type === "cancel" && (
          <InputField
            fieldType={FieldTypesEnum.TEXTAREA}
            formControl={form.control}
            label="Reason for Cancellation"
            name="cancellationReason"
            placeholder="Enter a reason for cancellation"
          />
        )}
      </FieldGroup>
      <SubmitButton
        isLoading={form.formState.isSubmitting}
        className={`w-full ${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"}`}
      >
        {buttonLabel}
      </SubmitButton>
    </form>
  );
}

export default AppointmentForm;
