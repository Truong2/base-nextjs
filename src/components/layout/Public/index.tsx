import { Footer } from "./Footer";
import { Header } from "./Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-[60px] lg:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
