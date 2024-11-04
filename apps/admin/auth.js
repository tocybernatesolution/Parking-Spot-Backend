import express from 'express';
import { generateids, login, register } from '../../controllers/admin_controller/admincontroller.js';
import { loginValidator, userValidator, validateUser } from '../../validation/userValidator.js';
import { authenticateToken } from '../../middleware/token.js';
const router = express.Router();


router.post('/generate-ids',authenticateToken,generateids);
router.post('/register',authenticateToken,userValidator,validateUser,register)
router.post('/login',loginValidator,validateUser,login)

export default router;
