import { Router } from "express";
import { ContactIntentSchema } from "../schemas/contact-intent.schema.js";
import { ContactIntentService } from "../services/ContactIntentService.js";
import { getRequestContext } from "../utils/request-context.js";
import { sendSuccess } from "../utils/response.js";

export function createContactIntentRouter(contactIntentService: ContactIntentService) {
  const router = Router();

  router.post("/contact-intent", async (req, res, next) => {
    try {
      const input = ContactIntentSchema.parse(req.body);
      const data = await contactIntentService.create(input, getRequestContext(req));
      return sendSuccess(res, data, 201);
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
