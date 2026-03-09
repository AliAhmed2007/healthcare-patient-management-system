"use client";
import { AppointmentSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { FieldGroup } from "@/components/ui/field";
import InputField, { FieldTypesEnum } from "../InputField";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/lib/actions/patient.actions";

function PatientForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });

  async function onSubmit(userData: z.infer<typeof AppointmentSchema>) {
    try {
      const user = await CreateUser(userData);
      if (user) router.push(`patients/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      id="form-rhf-input"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 flex-1"
    >
      <section className="space-y-4">
        <h1 className="header">Hi There 👋</h1>
        <p className="text-dark-700">Schedule your first appointment</p>
      </section>
      <FieldGroup>
        <InputField
          fieldType={FieldTypesEnum.INPUT}
          formControl={form.control}
          label="Email"
          name="email"
          placeholder="Enter your Email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="Email"
        />
        <InputField
          fieldType={FieldTypesEnum.INPUT}
          formControl={form.control}
          label="Full Name"
          name="name"
          placeholder="Enter your Full Name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User"
        />
        <InputField
          fieldType={FieldTypesEnum.PHONE_INPUT}
          formControl={form.control}
          label="Phone Number"
          name="phone"
          placeholder="+20 0123456789"
        />
      </FieldGroup>
      <SubmitButton isLoading={form.formState.isSubmitting}>
        Get Started
      </SubmitButton>
    </form>
  );
}

export default PatientForm;
