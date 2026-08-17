export const getFriendlyErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  const message = typeof error === "string" ? error : error?.message || "";
  const text = message.toLowerCase();

  if (!message) return fallback;
  if (text.includes("network") || text.includes("failed to fetch")) {
    return "Network error. Please check your connection and try again.";
  }
  if (text.includes("unauthorized") || text.includes("forbidden")) {
    return "You do not have permission to complete this action.";
  }
  if (text.includes("not found")) {
    return "The requested record could not be found.";
  }
  if (
    text.includes("validation") ||
    text.includes("required field") ||
    text.includes("must not be empty") ||
    text.includes("field is required")
  ) {
    return "Please complete the required fields and try again.";
  }
  if (text.includes("prisma") || text.includes("mongodb") || text.includes("transaction")) {
    return "We could not save this record right now. Please try again later.";
  }

  return fallback;
};
