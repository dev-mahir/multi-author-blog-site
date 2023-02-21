

export const authMiddleware = (req, res, next) => {
  const bearer_token = req.headers.authorization;
  const token = bearer_token.split(" ")[1];

  console.log(token);
  
}