/**
 * Centralized Global Error Handling Middleware for Express.
 * Catches all unhandled synchronous and asynchronous errors.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);

  // Default to 500 Internal Server Error
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "An unexpected error occurred on the server.";

  // Handle specific JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token.";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token has expired.";
  }

  // Handle Syntax Error in JSON Body
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    statusCode = 400;
    message = "Malformed JSON payload in request body.";
  }

  // Handle Prisma Database Known Request Errors (e.g., duplicate unique field)
  if (err.code === "P2002") {
    statusCode = 400;
    const target = err.meta?.target || "field";
    message = `A record with this ${target} already exists.`;
  } else if (err.code === "P2025") {
    statusCode = 404;
    message = "Requested record not found in database.";
  }

  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * Middleware to catch 404 Not Found routes.
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
