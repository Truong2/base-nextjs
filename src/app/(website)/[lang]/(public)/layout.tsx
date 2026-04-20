import { GuestGuard } from "~/components/auth";
import PublicLayout from "~/components/layout/Public";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <PublicLayout>{children}</PublicLayout>
    </GuestGuard>
  );
}
