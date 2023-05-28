import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.json( "You are not authenticated!");
  else
  {jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.json("Token is not valid!");
    req.user = user;
    next()
  });}
};