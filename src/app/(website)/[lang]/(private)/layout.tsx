import { AuthGuard } from "~/components/auth";
import PrivateLayout from "~/components/layout/Private";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <PrivateLayout>{children}</PrivateLayout>
    </AuthGuard>
  );
}
