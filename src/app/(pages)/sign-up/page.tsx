import SignUpForm from "@/components/SignUpForm";
import { validateRequest } from "@/database/auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
