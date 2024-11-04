import express from 'express';
import { generateids, register } from '../../controllers/admin_controller/admincontroller.js';
import { userValidator, validateUser } from '../../validation/userValidator.js';
const router = express.Router();


router.post('/generate-ids',generateids);
router.post('/register',userValidator,validateUser,register)

export default router;
