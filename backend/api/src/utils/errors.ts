import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { sendError } from "./response.js";

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode = 400
  ) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super("VALIDATION_ERROR", message, 400);
  }
}

export class SpamRejectedError extends AppError {
  constructor(message: string) {
    super("SPAM_REJECTED", message, 200);
  }
}

export function formatZodError(error: ZodError) {
  return error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return sendError(res, "VALIDATION_ERROR", formatZodError(error), 400);
  }

  if (error instanceof SpamRejectedError) {
    if (process.env.NODE_ENV !== "production") {
      console.log(error.message);
    }

    return res.status(200).json({ ok: true, data: { spam: true } });
  }

  if (error instanceof AppError) {
    return sendError(res, error.code, error.message, error.statusCode);
  }

  console.error("Unhandled API error", error);
  return sendError(res, "INTERNAL_ERROR", "Internal server error", 500);
}
