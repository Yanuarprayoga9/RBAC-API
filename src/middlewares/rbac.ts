import { JwtRequest } from '../auth/auth';
import { Response, NextFunction } from 'express';

export function checkRole(allowedRoles: ('admin' | 'teacher' | 'student')[]) {
 return (req: JwtRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user && !allowedRoles.includes(user.type)) {
   return res.status(403).json({ message: `Forbidden, you are a ${user.type} and this service is only available for ${allowedRoles}` });
  }

  next();
 };
}