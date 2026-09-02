import { Request } from "express";

export type RequestContext = {
  requestIp?: string;
  userAgent?: string;
};

export function getRequestContext(req: Request): RequestContext {
  const forwardedFor = req.header("x-forwarded-for");
  const requestIp = forwardedFor?.split(",")[0]?.trim() || req.ip || undefined;

  return {
    requestIp,
    userAgent: req.header("user-agent") ?? undefined
  };
}
