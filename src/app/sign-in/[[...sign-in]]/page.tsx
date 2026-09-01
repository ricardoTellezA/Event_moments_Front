import { SignIn } from "@clerk/nextjs";

import { AuthPageShell } from "@/features/auth/components/auth-page-shell";

export default function SignInPage() {
  return (
    <AuthPageShell
      title="Accede a tus albumes"
      description="Gestiona eventos, enlaces QR y recuerdos compartidos desde tu panel."
    >
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </AuthPageShell>
  );
}
