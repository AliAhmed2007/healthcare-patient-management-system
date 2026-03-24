import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

// Define the props correctly for Next.js 16 async dynamic APIs
type SearchParamProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: SearchParamProps) {
  const resolvedParams = await searchParams;
  const isAdmin = resolvedParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}
      
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            priority // Added to fix the LCP performance warning
          />
          
          <PatientForm />
          
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; {new Date().getFullYear()} CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        quality={90} // This now works perfectly because we updated next.config.mjs
        className="side-img max-w-[50%]"
        alt="patient"
      />
    </div>
  );
}