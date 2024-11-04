import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
const userValidator = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .notEmpty().withMessage('Username is required'),

  body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
    .notEmpty().withMessage('Email is required')
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email already in use');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .notEmpty().withMessage('Password is required'),
];
const loginValidator = [  
    body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
    .notEmpty().withMessage('Email is required')
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({ email: value });
      if (!existingUser) {
        throw new Error('User not found');
      }
      req.user = existingUser; 
      return true; 
    }),
  
    body('password')
      .notEmpty().withMessage('Password is required'),
  ];
const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {    
    return res.status(400).json({ status:false,message: errors.array()[0].msg });
  }
  next(); 
};

export { userValidator, loginValidator,validateUser };
