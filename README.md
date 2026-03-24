# 🏥 CarePulse - Healthcare Management System

CarePulse is a production-grade patient management system designed to streamline healthcare registration, appointment scheduling, and administrative workflows. Built with a focus on user experience and security, it provides a seamless interface for both patients and hospital administrators.

---

## ✨ Key Features

* **Patient Onboarding**: Advanced multi-step registration with complex form handling (Zod & React Hook Form).
* **Appointment Scheduling**: Real-time appointment requests with specific doctor selection.
* **Admin Dashboard**: A comprehensive management panel to confirm, schedule, or cancel appointments.
* **SMS Notifications**: Automated status updates sent directly to patients via Twilio.
* **Administrative Security**: Secure Passkey/OTP verification for sensitive admin access.
* **File Management**: Secure storage and handling of identification documents using Appwrite Storage.
* **Responsive Design**: Fully optimized for mobile, tablet, and desktop using Tailwind CSS and Shadcn/UI.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Backend/Auth/DB** | [Appwrite](https://appwrite.io/) |
| **Messaging** | [Twilio](https://www.twilio.com/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) |
---

## 🚀 Getting Started

### Prerequisites

* Node.js 18.x or later
* An [Appwrite](https://appwrite.io/) account (Cloud or Self-hosted)
* A [Twilio](https://www.twilio.com/) account for SMS

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AliAhmed2007/healthcare-patient-management-system.git
cd carepulse
```
2. **Environment Setup**
Create a .env.local file in the root directory and add your credentials:
```.env.local
# Appwrite
NEXT_PUBLIC_ENDPOINT=[https://cloud.appwrite.io/v1](https://cloud.appwrite.io/v1)
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_DATABASE_ID=
NEXT_PUBLIC_PATIENT_COLLECTION_ID=
NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=
APPWRITE_API_KEY=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

## 📖 Project Structure

    /app: Next.js App Router pages and layouts.

    /components: Reusable UI components (Forms, Tables, Modals).

    /lib: Server actions, Appwrite configuration, and utility functions.

    /types: TypeScript definitions for project-wide type safety.

    /public: Static assets, icons, and images.

## 🔒 Security Features

    Passkey Verification: Prevents unauthorized access to the Admin Dashboard.

    Data Validation: Strict schema validation on both client and server sides using Zod.

    Document Privacy: Identification documents are stored in private Appwrite buckets with restricted access.

## 📜 Credits

This project was built as part of a deep-dive into modern full-stack development. Special thanks to JavaScript Mastery for the comprehensive architectural guidance.
