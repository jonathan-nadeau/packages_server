import express from 'express';
import { establishmentController } from '../controllers';

const router = express.Router();
const establishmentRoute = '/establishments';
const establishmentRouteWithIdParams = '/establishments/:establishment_id';
const { createEstablishment, deleteEstablishment, getAllEstablishments, getEstablishment, updateEstablishment } = establishmentController;

router.get(establishmentRoute, getAllEstablishments);
router.get(establishmentRouteWithIdParams, getEstablishment);
router.post(establishmentRoute, createEstablishment);
router.patch(establishmentRouteWithIdParams, updateEstablishment);
router.delete(establishmentRouteWithIdParams, deleteEstablishment);

const establishmentRoutes = router;

export default establishmentRoutes;
