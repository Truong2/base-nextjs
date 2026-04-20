// Environment configuration with fallbacks
export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || "development",
  NEXT_PUBLIC_API_ENDPOINT:
    process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000/api",
};

// Validate required environment variables
export const validateEnv = () => {
  const required = ["NEXT_PUBLIC_ENV", "NEXT_PUBLIC_API_ENDPOINT"];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.warn(
      `Missing environment variables: ${missing.join(", ")}. Using defaults.`
    );
  }

  return env;
};
