import { Router } from "express";
import { CoverageStudySchema } from "../schemas/coverage-study.schema.js";
import { CoverageStudyService } from "../services/CoverageStudyService.js";
import { getRequestContext } from "../utils/request-context.js";
import { sendSuccess } from "../utils/response.js";

export function createCoverageStudyRouter(coverageStudyService: CoverageStudyService) {
  const router = Router();

  router.post("/coverage-study", async (req, res, next) => {
    try {
      const input = CoverageStudySchema.parse(req.body);
      const data = await coverageStudyService.create(input, getRequestContext(req));
      return sendSuccess(res, data, 201);
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
