import { useLocale } from "next-intl";
import Link from "next/link";
import I18nSwitcher from "~/components/I18nSwitcher";
import { DarkModeToggle } from "~/components/ui/DarkModeToggle";

export const Header = () => {
  const locale = useLocale();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold text-blue-600"
            >
              Company
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href={`/${locale}`}
              className="text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href={`/${locale}/services`}
              className="text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              Services
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              Projects
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              Blog
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden items-center space-x-4 md:flex">
            <DarkModeToggle />
            <I18nSwitcher layout="desktop" />
            <Link
              href={`/${locale}/login`}
              className="rounded-md bg-blue-600 px-4 py-2 text-white"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
