import { Response } from "express";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiError = {
  ok: false;
  error: {
    code: string;
    message: string;
  };
};

export function sendSuccess<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ ok: true, data } satisfies ApiSuccess<T>);
}

export function sendError(res: Response, code: string, message: string, status = 400) {
  return res.status(status).json({ ok: false, error: { code, message } } satisfies ApiError);
}
