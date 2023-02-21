import { tokenVerify } from "../utilis/token.js";

export const authMiddleware = (req, res, next) => {
  const bearer_token = req.headers.authorization;
  const token = bearer_token.split(" ")[1];

  const checkToken = tokenVerify(token);
  if (checkToken) {
    console.log("ok");
  }
};
