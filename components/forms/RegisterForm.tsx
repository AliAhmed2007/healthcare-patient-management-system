"use client";
import { AppointmentSchema, PatientRegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { FieldGroup } from "@/components/ui/field";
import InputField, { FieldTypesEnum } from "../InputField";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

function RegisterForm({ user }: { user: User }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof PatientRegisterSchema>>({
    // @ts-ignore
    resolver: zodResolver(PatientRegisterSchema),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof PatientRegisterSchema>) {
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();

      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: undefined, // Don't send the array/object here
      };
      console.log("This is the patient Data: ", patientData);
      // @ts-ignore
      const patient = await registerPatient(patientData, formData);
      if (patient) router.push(`patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      id="form-rhf-input"
      // @ts-ignore
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-12 flex-1"
    >
      <section className="space-y-4">
        <h1 className="header">Welcome 👋</h1>
        <p className="text-dark-700">Let&apos;s Know more about yourself.</p>
      </section>
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="sub-header">Personal Information</h2>
        </div>
      </section>
      <FieldGroup>
        <InputField
          fieldType={FieldTypesEnum.INPUT}
          formControl={form.control}
          label="Full Name"
          name="name"
          placeholder="Enter your Full Name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
            fieldType={FieldTypesEnum.PHONE_INPUT}
            formControl={form.control}
            label="Phone Number"
            name="phone"
            placeholder="+20 0123456789"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <InputField
            fieldType={FieldTypesEnum.DATE_PICKER}
            formControl={form.control}
            label="Date of Birth"
            name="birthDate"
          />
          <InputField
            fieldType={FieldTypesEnum.SKELETON}
            formControl={form.control}
            label="Gender"
            name="gender"
            renderSkeleton={(field) => (
              <RadioGroup
                className="flex h-11 gap-6 xl:justify-between"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {GenderOptions.map((option) => (
                  <div className="radio-group" key={option}>
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <InputField
            fieldType={FieldTypesEnum.INPUT}
            formControl={form.control}
            label="Address"
            name="address"
            placeholder="14th Street, Helwan"
          />
          <InputField
            fieldType={FieldTypesEnum.INPUT}
            formControl={form.control}
            label="Occupation"
            name="occupation"
            placeholder="Ex. Software Engineer"
            iconSrc="/assets/icons/user.svg"
            iconAlt="User"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <InputField
            fieldType={FieldTypesEnum.INPUT}
            formControl={form.control}
            label="Emergency Contact Name"
            name="emergencyContactName"
            placeholder="Guardian's Name"
            iconSrc="/assets/icons/email.svg"
            iconAlt="Email"
          />
          <InputField
            fieldType={FieldTypesEnum.PHONE_INPUT}
            formControl={form.control}
            label="Emergency Contact Number"
            name="emergencyContactNumber"
            placeholder="+20 0123456789"
          />
        </div>
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
        <InputField
          fieldType={FieldTypesEnum.SELECT}
          formControl={form.control}
          label="Primary Physician"
          name="primaryPhysician"
          placeholder="Select a physician"
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
        <div className="flex flex-col gap-6 xl:flex-row">
          <InputField
            fieldType={FieldTypesEnum.INPUT}
            formControl={form.control}
            label="Insurance Provider"
            name="insuranceProvider"
            placeholder="BlueCross BlueShield"
          />
          <InputField
            fieldType={FieldTypesEnum.INPUT}
            formControl={form.control}
            label="Insurance Policy Number"
            name="insurancePolicyNumber"
            placeholder="ABC123456789"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <InputField
            fieldType={FieldTypesEnum.TEXTAREA}
            formControl={form.control}
            label="Allergies (If Any)"
            name="allergies"
            placeholder="Peanuts, Penicillin, Pollen"
          />
          <InputField
            fieldType={FieldTypesEnum.TEXTAREA}
            formControl={form.control}
            label="Current Medication (If Any)"
            name="currentMedication"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <InputField
            fieldType={FieldTypesEnum.TEXTAREA}
            formControl={form.control}
            label="Family Medical History"
            name="familyMedicalHistory"
            placeholder="Mother had a brain cancer and father had heart disease"
          />
          <InputField
            fieldType={FieldTypesEnum.TEXTAREA}
            formControl={form.control}
            label="Past Medical History"
            name="pastMedicalHistory"
            placeholder="Appendectomy, Tonsillectomy"
          />
        </div>
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>
        <InputField
          fieldType={FieldTypesEnum.SELECT}
          formControl={form.control}
          label="Identification Type"
          name="identificationType"
          placeholder="Select Identification Type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </InputField>

        <InputField
          fieldType={FieldTypesEnum.INPUT}
          formControl={form.control}
          label="Identification Number"
          name="identificationNumber"
          placeholder="123456789"
        />
        <InputField
          fieldType={FieldTypesEnum.SKELETON}
          formControl={form.control}
          label="Scanned Copy of Identificatoin Document"
          name="identificationDocument"
          renderSkeleton={(field) => (
            <FileUploader files={field.value} onChange={field.onChange} />
          )}
        />
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        <InputField
          fieldType={FieldTypesEnum.CHECKBOX}
          name="treatmentConsent"
          label="I consent to treatment"
          formControl={form.control}
        />
        <InputField
          fieldType={FieldTypesEnum.CHECKBOX}
          name="disclosureConsent"
          label="I consent to disclosure for information"
          formControl={form.control}
        />
        <InputField
          fieldType={FieldTypesEnum.CHECKBOX}
          name="privacyConsent"
          label="I consent to privacy policy"
          formControl={form.control}
        />
      </FieldGroup>
      <SubmitButton isLoading={form.formState.isSubmitting}>
        Get Started
      </SubmitButton>
    </form>
  );
}

export default RegisterForm;
