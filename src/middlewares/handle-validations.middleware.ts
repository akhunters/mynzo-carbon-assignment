import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const handleValidation = (schema: any, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const {
      success,
      error,
    }: {
      success: boolean;
      error: ZodError;
    } = schema.safeParse(req[property]);
    if (success) {
      next();
    } else {
      const issue = error.issues[0];
      const message = `[${issue?.path?.join("][")}] ${issue.message}!`;
      res.status(400).json({
        message,
      });
    }
  };
};

export default handleValidation;
