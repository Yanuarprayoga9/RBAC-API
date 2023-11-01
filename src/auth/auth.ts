import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface JwtRequest extends Request {
 user?: {
  id: number;
  type: 'admin' | 'teacher' | 'student';
 };
}

const verifyJwt = (req: JwtRequest, res: Response, next: NextFunction) => {
 const authHeader = req.headers.authorization;
 if (!authHeader) {
  return res.status(401).json('No authorization header found');
 }

 const token = authHeader.split(' ')[1];
 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  req.user = decoded as JwtRequest['user'];
  next();
 } catch (err) {
  return res.status(401).json('Invalid token');
 }
};

export default verifyJwt;