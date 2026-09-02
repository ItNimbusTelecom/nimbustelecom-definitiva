import { Router } from "express";
import { LeadSchema } from "../schemas/lead.schema.js";
import { LeadService } from "../services/LeadService.js";
import { getRequestContext } from "../utils/request-context.js";
import { sendSuccess } from "../utils/response.js";

export function createLeadsRouter(leadService: LeadService) {
  const router = Router();

  router.post("/leads", async (req, res, next) => {
    try {
      const input = LeadSchema.parse(req.body);
      const data = await leadService.create(input, getRequestContext(req));
      return sendSuccess(res, data, 201);
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
