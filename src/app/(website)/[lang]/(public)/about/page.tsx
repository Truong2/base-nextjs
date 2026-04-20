import { setRequestLocale } from "next-intl/server";
import { type Metadata } from "next/types";
import { AboutClient } from "~/components/modules/About";

export function generateMetadata(): Metadata {
  return {
    title: "About Us",
    description: "Learn more about our company and mission",
  };
}

export default async function About(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const { lang } = params;

  setRequestLocale(lang);

  return (
    <div className="min-h-screen">
      <AboutClient />
    </div>
  );
}
