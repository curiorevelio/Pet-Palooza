import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import sessionRouter from "./session";
import petsRouter from "./pets";
import providersRouter from "./providers";
import servicesRouter from "./services";
import availabilityRouter from "./availability";
import bookingsRouter from "./bookings";
import reviewsRouter from "./reviews";
import discoveryRouter from "./discovery";

const router: IRouter = Router();

// Public routes (no authentication required).
router.use(healthRouter);
router.use(authRouter);

// Gate everything below behind a valid Replit Auth session.
function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
router.use(ensureAuthenticated);

router.use(sessionRouter);
router.use(petsRouter);
router.use(providersRouter);
router.use(servicesRouter);
router.use(availabilityRouter);
router.use(bookingsRouter);
router.use(reviewsRouter);
router.use(discoveryRouter);

export default router;
