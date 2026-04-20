"use client";

import { useLocale } from "next-intl";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Fragment } from "react";
import ButtonIcon from "~/components/ui/ButtonIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { LANGUAGE, languageLabels } from "~/navigation";

const I18nSwitcher = ({ layout }: { layout: "mobile" | "desktop" }) => {
  const lang = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const handleSwitchLanguage = (lang: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${params.lang}`, `/${lang}`);
    router.push(newPath);
  };

  switch (layout) {
    case "desktop":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <ButtonIcon
              iconOptions={{
                type: "iconWithLabel",
              }}
              className="group border-secondary uppercase text-secondary hover:bg-secondary hover:text-white"
              size="small"
              variant={"outline"}
            >
              {lang}
            </ButtonIcon>
          </PopoverTrigger>
          <PopoverContent
            sideOffset={24}
            className="w-fit rounded-none p-0"
            align="end"
          >
            <div className="flex flex-col items-start gap-2 px-4 py-2 text-sm font-bold leading-[22px] shadow-sm">
              {Object.values(LANGUAGE)
                .filter(value => value !== lang)
                .map((key, index) => (
                  <Fragment key={key}>
                    <button
                      className="text-brand hover:opacity-80"
                      onClick={() => handleSwitchLanguage(key)}
                    >
                      {languageLabels[key]}[{key.toLocaleUpperCase()}]
                    </button>
                    {index !==
                      Object.values(LANGUAGE).filter(key => key !== lang)
                        .length -
                        1 && <div className="h-px w-full bg-[#f2f2f2]" />}
                  </Fragment>
                ))}
            </div>
          </PopoverContent>
        </Popover>
      );
    case "mobile":
      return (
        <div className="flex items-center gap-4">
          {Object.values(LANGUAGE).map((key, index) => (
            <Fragment key={key}>
              <button
                className={`relative flex h-12 items-center after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-secondary after:transition-transform after:duration-300 after:ease-in-out after:content-[''] ${
                  key === lang ? "after:scale-x-100" : "after:scale-x-0"
                }`}
                key={key}
                onClick={() => handleSwitchLanguage(key)}
              >
                {key.toUpperCase()}
              </button>
              {index !== Object.keys(LANGUAGE).length - 1 && (
                <div className="h-6 w-[2px] bg-slate-200" />
              )}
            </Fragment>
          ))}
        </div>
      );
  }
};

export default I18nSwitcher;
