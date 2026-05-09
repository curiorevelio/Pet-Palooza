import { Router, type IRouter } from "express";
import healthRouter from "./health";
import sessionRouter from "./session";
import petsRouter from "./pets";
import providersRouter from "./providers";
import servicesRouter from "./services";
import availabilityRouter from "./availability";
import bookingsRouter from "./bookings";
import reviewsRouter from "./reviews";
import discoveryRouter from "./discovery";

const router: IRouter = Router();

router.use(healthRouter);
router.use(sessionRouter);
router.use(petsRouter);
router.use(providersRouter);
router.use(servicesRouter);
router.use(availabilityRouter);
router.use(bookingsRouter);
router.use(reviewsRouter);
router.use(discoveryRouter);

export default router;
