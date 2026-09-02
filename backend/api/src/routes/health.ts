import { Router } from "express";
import { sendSuccess } from "../utils/response.js";

export function createHealthRouter() {
  const router = Router();

  router.get("/health", (_req, res) => {
    return sendSuccess(res, {
      status: "ok",
      service: "nimbus-funnel-api"
    });
  });

  return router;
}
