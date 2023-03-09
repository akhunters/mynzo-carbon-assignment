import { User } from "../models/user.model";
import { TLoginReq } from "../routes/auth.route";
import TypeormConnection from "../config/typeorm.config";
import jwt from "jsonwebtoken";

interface TLoginRes {
  data: User;
  token: string;
}

class AuthService {
  constructor() {}

  private generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
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

    const token = jwt.sign(user, process.env.SECRET);

    return {
      data: signedInUser,
      token: token,
    };
  };
}

export default AuthService;
