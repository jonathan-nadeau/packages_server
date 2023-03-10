import express from 'express';
import { packController } from '../controllers';

const router = express.Router();
const packRoute = '/packages';
const packRouteWithIdParams = '/packages/:pack_id';
const { getAllPacks, getPack, createPack, updatePack, deletePack, updateOrDeleteWithoutIdParams } = packController;

router.get(packRoute, getAllPacks);
router.get(packRouteWithIdParams, getPack);
router.post(packRoute, createPack);
router.patch(packRouteWithIdParams, updatePack);
router.patch(packRoute, updateOrDeleteWithoutIdParams);
router.delete(packRoute, updateOrDeleteWithoutIdParams);
router.delete(packRouteWithIdParams, deletePack);

const packRoutes = router;

export default packRoutes;
