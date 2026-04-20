"use client";

import Button from "~/components/ui/Button";

export function HomeClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Build modern health experiences
            </h1>
            <p className="mb-8 text-xl text-blue-100 md:text-2xl">
              Fast, reliable, and user-friendly interfaces for healthcare apps.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="large" variant="primary">
                Get started
              </Button>
              <Button size="large" variant="outline-white">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Why teams choose us
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Everything you need to launch and scale health-focused products.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                High performance
              </h3>
              <p className="text-gray-600">
                Optimized pages and APIs deliver a fast experience on every device.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Responsive by default
              </h3>
              <p className="text-gray-600">
                Components adapt smoothly across desktop, tablet, and mobile.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Multi-language ready
              </h3>
              <p className="text-gray-600">
                Support international users with scalable localization workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">Ready to build your next product?</h2>
          <p className="mb-8 text-xl text-blue-100">
            Launch faster with a foundation designed for health platforms.
          </p>
          <Button
            size="large"
            variant="primary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Start now
          </Button>
        </div>
      </section>
    </>
  );
}
