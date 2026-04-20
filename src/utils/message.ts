// Utility function to show error messages
// This will be used in httpClient when we can't use React hooks

let messageInstance: {
  success: (content: string, duration?: number) => void;
  error: (content: string, duration?: number) => void;
  warning: (content: string, duration?: number) => void;
  info: (content: string, duration?: number) => void;
  loading: (content: string, duration?: number) => void;
  destroy: () => void;
} | null = null;

const recentErrorMessages = new Set<string>();
const recentSuccessMessages = new Set<string>();
const ERROR_MESSAGE_TIMEOUT = 3000; // 3 seconds

export const setMessageInstance = (instance: {
  success: (content: string, duration?: number) => void;
  error: (content: string, duration?: number) => void;
  warning: (content: string, duration?: number) => void;
  info: (content: string, duration?: number) => void;
  loading: (content: string, duration?: number) => void;
  destroy: () => void;
}) => {
  messageInstance = instance;
};

export const showErrorMessage = (message: string, duration?: number) => {
  // Check if this error message was recently shown
  if (recentErrorMessages.has(message)) {
    return; // Skip showing duplicate message
  }

  // Add to recent messages set
  recentErrorMessages.add(message);

  // Remove from recent messages after timeout
  setTimeout(() => {
    recentErrorMessages.delete(message);
  }, ERROR_MESSAGE_TIMEOUT);

  if (messageInstance) {
    messageInstance.error(message, duration);
  } else {
    console.error("Error message:", message);
  }
};

export const showSuccessMessage = (message: string, duration?: number) => {
  // Check if this success message was recently shown
  if (recentSuccessMessages.has(message)) {
    return; // Skip showing duplicate message
  }

  // Add to recent messages set
  recentSuccessMessages.add(message);

  // Remove from recent messages after timeout
  setTimeout(() => {
    recentSuccessMessages.delete(message);
  }, ERROR_MESSAGE_TIMEOUT);

  if (messageInstance) {
    messageInstance.success(message, duration);
  } else {
    console.log("Success message:", message);
  }
};
