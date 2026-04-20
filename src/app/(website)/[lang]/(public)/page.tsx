import { setRequestLocale } from "next-intl/server";
import { type Metadata } from "next/types";
import { HomeClient } from "~/components/modules/Home";

export function generateMetadata(): Metadata {
  return {
    title: "Welcome to Our Website",
    description: "A modern Next.js website with internationalization support",
  };
}

export default async function Home(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const { lang } = params;

  setRequestLocale(lang);

  return (
    <div className="min-h-screen">
      <HomeClient />
    </div>
  );
}
