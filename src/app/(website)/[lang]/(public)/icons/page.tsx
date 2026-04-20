import { setRequestLocale } from "next-intl/server";
import { type Metadata } from "next/types";
import IconsPage from "~/components/modules/Icon";
import { notFound } from "next/navigation";

export function generateMetadata(): Metadata {
  return {
    title: "Icon Library",
    description: "Icon Library",
  };
}

export default async function Icons(props: {
  params: Promise<{ lang: string }>;
}) {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const params = await props.params;
  const { lang } = params;

  setRequestLocale(lang);

  return (
    <div className="min-h-screen">
      <IconsPage />
    </div>
  );
}
