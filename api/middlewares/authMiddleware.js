import createError from "../utilis/createError.js";
import { tokenVerify } from "../utilis/token.js";

export const authMiddleware = (req, res, next) => {
  const { authToken } = req.cookies;

  try {
    const checkToken = tokenVerify(authToken);
    if (checkToken) {
      req.admin = {
        name: checkToken.name,
        id: checkToken._id,
        email: checkToken.email,
        role: checkToken.role,
        loginMethod: checkToken.loginMethod,
        image: checkToken.image,
        access_status:checkToken.access_status
      };
      next();
    }
  } catch (error) {
    next(createError(404, "Only admin allow"));
  }
};
