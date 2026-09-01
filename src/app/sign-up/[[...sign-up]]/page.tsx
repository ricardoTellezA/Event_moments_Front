import { SignUp } from "@clerk/nextjs";

import { AuthPageShell } from "@/features/auth/components/auth-page-shell";

export default function SignUpPage() {
  return (
    <AuthPageShell
      title="Crea tu cuenta"
      description="Prepara tus albumes privados y comparte cada evento con invitados."
    >
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </AuthPageShell>
  );
}
