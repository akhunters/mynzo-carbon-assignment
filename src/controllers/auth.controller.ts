import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.authService.login(req.body);
      res.status(200).json(data);
    } catch (err) {
      next({
        message: err?.message,
      });
    }
  };
}

export default AuthController;
