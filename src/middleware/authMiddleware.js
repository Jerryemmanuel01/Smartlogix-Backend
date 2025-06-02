import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const protect = async (req, res, next) => {
  try {
    let token;
    /**
     * in headers / Bearer (authorization), add the token after login or registration
     * e.g. Bearer evyrnsdfu349fsdn349gdnsf93ew ...
    */
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and pull out id that was added
      const user = await User.findByPk(decoded.id); // get the id and pull record from db

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'User no longer exists'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'User account is deactivated'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Token is invalid or expired',
        data: error
      });
    }
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `Role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const first = errors.array({ onlyFirstError: true })[0];
    return res.status(400).json({
      success: false,
      path: first.path,
      message: first.msg,
    });
  }
  next();
};
