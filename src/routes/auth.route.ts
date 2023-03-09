import express from "express";
import AuthController from "../controllers/auth.controller";
import handleValidation from "../middlewares/handle-validations.middleware";
import z from "zod";

const loginValidationSchema = z.object({ email: z.string().email() });

export type TLoginReq = z.infer<typeof loginValidationSchema>;

const authRouter = express.Router();
const authController = new AuthController();

authRouter
  .route("/login")
  .post(handleValidation(loginValidationSchema, "body"), authController.login);

export default authRouter;
