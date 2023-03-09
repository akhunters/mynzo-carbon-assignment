import { User } from "../models/user.model";
import { TLoginReq, TVerifyReq } from "../routes/auth.route";
import TypeormConnection from "../config/typeorm.config";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

interface TLoginRes {
  data?: string;
  token?: string;
  error?: string;
}

interface TVerifyRes {
  data?: User;
  token?: string;
  error?: string;
}

class AuthService {
  constructor() {}

  private generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  };

  public login = async (loginReq: TLoginReq): Promise<TLoginRes> => {
    const user = await TypeormConnection.getRepository(User).findOneBy({
      email: loginReq.email,
    });

    let signedInUser = new User();

    if (user) {
      signedInUser = user;
    } else {
      signedInUser.email = loginReq.email;
      signedInUser = await TypeormConnection.getRepository(User).save(
        signedInUser
      );
    }

    const generatedOTP = this.generateOTP();
    console.log("OTP: ", generatedOTP);

    signedInUser.otp = bcrypt.hashSync(generatedOTP, 16);

    await TypeormConnection.getRepository(User).save(signedInUser);

    return {
      data: "OTP successfully sent",
    };
  };

  public verifyOtp = async (req: TVerifyReq): Promise<TVerifyRes> => {
    let user = await TypeormConnection.getRepository(User).findOneBy({
      email: req.email,
    });
    if (!user) {
      return {
        error: "User not found",
      };
    }

    if (!bcrypt.compareSync(req.otp, user.otp || "")) {
      return {
        error: "Invalid Otp",
      };
    }

    user.otp = null;
    user = await TypeormConnection.getRepository(User).save(user);

    const token = jwt.sign(
      {
        ...user,
      },
      process.env.SECRET
    );

    return {
      data: { ...user },
      token,
    };
  };
}

export default AuthService;
