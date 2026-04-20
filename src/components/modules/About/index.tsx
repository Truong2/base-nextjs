"use client";

import Button from "~/components/ui/Button";
import useElementOnScreen from "~/utils/hooks/useElementOnScreen";
import React from "react";

// Animated wrapper that fades/slides content into view
const AnimatedInView: React.FC<{
  children: React.ReactNode;
  from?: "up" | "down" | "left" | "right";
  delayMs?: number;
  threshold?: number;
}> = ({ children, from = "up", delayMs = 0, threshold = 0.2 }) => {
  const { containerRef, isVisible } = useElementOnScreen({ threshold });

  const transformClass =
    from === "up"
      ? "translate-y-6"
      : from === "down"
        ? "-translate-y-6"
        : from === "left"
          ? "translate-x-6"
          : "-translate-x-6";

  return (
    <div
      ref={containerRef}
      className={[
        "transition-all duration-700 will-change-transform",
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${transformClass}`,
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
};

export function AboutClient() {
  const values = [
    {
      title: "User-first",
      description: "We design features around real healthcare journeys.",
    },
    {
      title: "Reliable",
      description: "We build stable systems teams can trust every day.",
    },
    {
      title: "Practical innovation",
      description: "We use technology to solve meaningful problems.",
    },
  ];

  const stats = [
    { value: "50+", label: "Team members" },
    { value: "120+", label: "Projects delivered" },
    { value: "20+", label: "Countries served" },
    { value: "99.9%", label: "Platform uptime" },
  ];

  const timeline = [
    {
      year: "2019",
      title: "Company founded",
      description: "Started with a mission to simplify digital health delivery.",
    },
    {
      year: "2021",
      title: "First global launch",
      description: "Expanded to international markets with multilingual support.",
    },
    {
      year: "2023",
      title: "Platform scale-up",
      description: "Introduced new analytics and performance infrastructure.",
    },
    {
      year: "2025",
      title: "Next generation products",
      description: "Focused on smarter experiences and better outcomes.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        {/* Decorative background blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <AnimatedInView from="up">
              <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                About our team
              </h1>
            </AnimatedInView>
            <AnimatedInView from="up" delayMs={100}>
              <p className="mb-8 text-xl text-blue-100 md:text-2xl">
                We build thoughtful digital products for modern healthcare.
              </p>
            </AnimatedInView>
            <AnimatedInView from="up" delayMs={200}>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="large" variant="primary" aria-label="primary-cta">
                  Work with us
                </Button>
                <Button
                  size="large"
                  variant="outline-white"
                  aria-label="secondary-cta"
                >
                  Meet the team
                </Button>
              </div>
            </AnimatedInView>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <AnimatedInView>
                <h2 className="mb-4 text-4xl font-bold text-gray-900">
                  Who we are
                </h2>
              </AnimatedInView>
              <AnimatedInView delayMs={100}>
                <p className="mx-auto max-w-2xl text-xl text-gray-600">
                  A product and engineering team dedicated to quality and impact.
                </p>
              </AnimatedInView>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <AnimatedInView>
                <div className="rounded-lg bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Our mission
                  </h3>
                  <p className="text-gray-600">
                    Help organizations deliver better health experiences through
                    simple, scalable technology.
                  </p>
                </div>
              </AnimatedInView>

              <AnimatedInView delayMs={100}>
                <div className="rounded-lg bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Our vision
                  </h3>
                  <p className="text-gray-600">
                    Make digital healthcare accessible, efficient, and human
                    centered for everyone.
                  </p>
                </div>
              </AnimatedInView>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <AnimatedInView>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Our values
              </h2>
            </AnimatedInView>
            <AnimatedInView delayMs={100}>
              <p className="mx-auto max-w-2xl text-gray-600">
                Principles that guide how we design, build, and collaborate.
              </p>
            </AnimatedInView>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item, index) => (
              <AnimatedInView key={item.title} delayMs={(index + 1) * 75}>
                <div className="rounded-lg bg-white p-8 shadow transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <AnimatedInView>
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Leadership team
              </h2>
            </AnimatedInView>
            <AnimatedInView delayMs={100}>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Meet the people shaping our product and culture.
              </p>
            </AnimatedInView>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <AnimatedInView>
              <div className="rounded-lg bg-white p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Alex Johnson
                </h3>
                <p className="text-gray-600">Chief Executive Officer</p>
              </div>
            </AnimatedInView>

            <AnimatedInView delayMs={100}>
              <div className="rounded-lg bg-white p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-12 w-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Mia Chen
                </h3>
                <p className="text-gray-600">Chief Product Officer</p>
              </div>
            </AnimatedInView>

            <AnimatedInView delayMs={200}>
              <div className="rounded-lg bg-white p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-purple-100">
                  <svg
                    className="h-12 w-12 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Daniel Kim
                </h3>
                <p className="text-gray-600">Head of Engineering</p>
              </div>
            </AnimatedInView>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <AnimatedInView>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                By the numbers
              </h2>
            </AnimatedInView>
            <AnimatedInView delayMs={100}>
              <p className="mx-auto max-w-2xl text-gray-600">
                Milestones we are proud of as we continue to grow.
              </p>
            </AnimatedInView>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <AnimatedInView key={item.label} delayMs={(index + 1) * 75}>
                <div className="rounded-lg bg-white p-8 text-center shadow transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-2 text-4xl font-bold text-blue-600">
                    {item.value}
                  </div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <AnimatedInView>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Our journey
              </h2>
            </AnimatedInView>
            <AnimatedInView delayMs={100}>
              <p className="mx-auto max-w-2xl text-gray-600">
                Key moments that shaped our product and team.
              </p>
            </AnimatedInView>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-200" />
            {timeline.map((item, index) => (
              <AnimatedInView key={item.year} delayMs={(index + 1) * 100}>
                <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div
                    className={`md:${(index + 1) % 2 === 0 ? "order-2" : "order-1"}`}
                  >
                    <div className="rounded-lg bg-white p-6 shadow">
                      <div className="mb-1 text-sm font-medium text-blue-600">
                        {item.year}
                      </div>
                      <div className="mb-2 text-lg font-semibold text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-gray-600">{item.description}</div>
                    </div>
                  </div>
                  <div className="hidden items-center justify-center md:flex">
                    <div className="h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow" />
                  </div>
                </div>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">Join us on this mission</h2>
          <p className="mb-8 text-xl text-blue-100">
            Build meaningful products with a team that values quality and impact.
          </p>
          <Button
            size="large"
            variant="outline-white"
            aria-label="join-our-team"
          >
            Join our team
          </Button>
        </div>
      </section>
    </>
  );
}
