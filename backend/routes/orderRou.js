import express from 'express';
import { placeOrder } from '../controllers/orderCon.js';

const router = express.Router();

router.post('/place', placeOrder);

export default router;