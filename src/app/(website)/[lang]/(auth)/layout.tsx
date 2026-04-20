import Link from "next/link";
import Button from "~/components/ui/Button";
import { ROUTE_URL } from "~/constants";

export const metadata = {
  title: "Source base",
  description: "Source base",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="from-primary/5 to-primary/10 relative h-screen overflow-hidden bg-gradient-to-b">
      {/* Background Medical Icons */}
      <div className="pointer-events-none absolute inset-0">
        <div className="border-primary/20 absolute left-10 top-20 flex h-8 w-8 items-center justify-center rounded-full border-2">
          <span className="text-primary/30 text-xs">+</span>
        </div>
        <div className="border-primary/20 absolute right-20 top-32 flex h-6 w-6 items-center justify-center rounded-full border">
          <span className="text-primary/30 text-xs">♥</span>
        </div>
        <div className="bg-primary/20 absolute left-1/4 top-48 h-4 w-4 rounded-full"></div>
        <div className="border-primary/20 absolute right-1/3 top-64 h-3 w-3 rounded-full border"></div>
        <div className="bg-primary/20 absolute bottom-32 left-1/3 h-5 w-5 rounded-full"></div>
        <div className="border-primary/20 absolute bottom-48 right-1/4 h-4 w-4 rounded-full border"></div>

        {/* Flowing lines */}
        <div className="via-primary/20 absolute left-0 top-40 h-px w-full bg-gradient-to-r from-transparent to-transparent"></div>
        <div className="via-primary/20 absolute bottom-40 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent"></div>
        <div className="via-primary/20 absolute left-20 top-0 h-full w-px bg-gradient-to-b from-transparent to-transparent"></div>
        <div className="via-primary/20 absolute right-20 top-0 h-full w-px bg-gradient-to-b from-transparent to-transparent"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-16 items-center justify-between bg-white px-6">
        <Link
          href={ROUTE_URL.HOME}
          className="flex cursor-pointer items-center space-x-3"
        >
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
            <span className="text-sm font-bold text-white">LOGO</span>
          </div>
          <span className="text-primary text-xl font-bold">SOURCE BASE</span>
        </Link>

        <Button
          variant="outline"
          className="border-primary/30 text-primary hover:bg-primary/5 rounded-lg border px-4 py-2 transition-colors"
        >
          Contact
        </Button>
      </header>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex h-[calc(100vh-128px)] items-center justify-center px-4">
        <div className="flex w-full justify-center">{children}</div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex h-16 items-center justify-center">
        <p className="text-sm text-gray-500">
          ©Copyright Source base. All rights Reserved
        </p>
      </footer>
    </div>
  );
}
