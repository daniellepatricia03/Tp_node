import express from 'express';
import { getclassements } from '../controllers/controllersclassement.js';

const router = express.Router();

router.get('/', getclassements);

export default router;
   