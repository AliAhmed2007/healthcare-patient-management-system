import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
type PageProps = {
  params: Promise<{ userId: string }>;
};

export default async function NewAppointment({ params }: PageProps) {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;
  
  const patient = await getPatient(userId);
  
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            priority
          />
          <AppointmentForm 
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <p className="copyright mt-10 py-12">
            &copy; {new Date().getFullYear()} CarePulse
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        quality={90}
        className="side-img max-w-[390px] bg-bottom"
        alt="Appointment"
      />
    </div>
  );
}