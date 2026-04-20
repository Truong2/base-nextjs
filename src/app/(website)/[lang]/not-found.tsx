import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 404 Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-900 md:text-[12rem]">
              4<span className="text-blue-600">0</span>4
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Oops! Page Not Found
            </h2>
            <p className="mb-6 text-lg text-gray-600 md:text-xl">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-gray-500">
              Path:
              <code className="rounded bg-gray-200 px-2 py-1 text-gray-800">
                /404
              </code>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/en`}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </Link>
            <Link
              href={`/contact`}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Contact Support
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Looking for something specific?
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="text-left">
                <h4 className="mb-2 font-medium text-gray-900">
                  Popular Pages
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href={`/about`}
                      className="text-blue-600 transition-colors hover:text-blue-700"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/services`}
                      className="text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Our Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/blog`}
                      className="text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="mb-2 font-medium text-gray-900">
                  Quick Actions
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href={`/contact`}
                      className="text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Get in Touch
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/pricing`}
                      className="text-blue-600 transition-colors hover:text-blue-700"
                    >
                      View Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/`}
                      className="text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Back to Home
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
