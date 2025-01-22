import express from "express";
const router = express.Router();
import warehouseController from "../controller/warehouseController.js";

router.post('/warehousecreate', warehouseController.createWarehouse);
router.get('/warehousegetdata', warehouseController.getWarehouses);
router.put('/warehousegetdata/:id', warehouseController.updateWarehouse);
router.delete('/warehousedeletedata/:id', warehouseController.deleteWarehouse);

export default router;