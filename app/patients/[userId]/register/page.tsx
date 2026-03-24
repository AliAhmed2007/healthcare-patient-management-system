import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";

type PageProps = {
  params: Promise<{ userId: string }>;
};

export default async function Register({ params }: PageProps) {

  const resolvedParams = await params;
  const userId = resolvedParams.userId;

  const user = await getUser(userId);
  
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            priority
          />
          <RegisterForm user={user} />
          <p className="py-12 copyright">
            &copy; {new Date().getFullYear()} CarePulse
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        quality={90}
        className="side-img max-w-[390px]"
        alt="patient"
      />
    </div>
  );
}