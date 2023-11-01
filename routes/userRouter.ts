import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { users } from "../src/models/user";
import { JwtRequest } from '../src/auth/auth';
import verifyJwt from "../src/auth/auth";
import {checkRole} from '../src/middlewares/rbac'
const userRouter: Router = express.Router();

userRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Find if email exists
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }
    // Check Password
    if (user.password !== password) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user.id, type: user.type },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    res.status(200).json(token);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});
userRouter.get(
  "/admin-only",
  verifyJwt,
  checkRole(["admin"]),
  async (req: JwtRequest, res: Response) => {
    res.status(200).json({ message: "This can only be accessed by admins" });
  }
);

userRouter.get(
  "/admin-and-teachers",
  verifyJwt,
  checkRole(["admin", "teacher"]),
  async (req: JwtRequest, res: Response) => {
    res
      .status(200)
      .json({ message: "This can only be accessed by admins and teachers" });
  }
);

userRouter.get(
  "/admin-teachers-students",
  verifyJwt,
  checkRole(["admin", "teacher", "student"]),
  async (req: JwtRequest, res: Response) => {
    res.status(200).json({
      message: "This can only be accessed by admins, teachers and students",
    });
  }
);
export default userRouter;
