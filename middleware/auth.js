import jwt from "jsonwebtoken";
import { getUserByEmail } from "../db/user.js";
// const jwt = require('jsonwebtoken');
// const { getUserByEmail } = require('../db/user'); // Update the path to your user-related functions

export const requireUserAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        return res.render("login", { message: "Access Denied" });
      } else {
        try {
          const user = await getUserByEmail(decodedToken.email);
          if (!user) {
            return res.render("login", { message: "Access Denied" });
          } else {
            req.userEmail = decodedToken.email; 
            next();
          }
        } catch (err) {
          return res.render("login", { message: "Access Denied" });
        }
      }
    });
  } else {
    res.render("login", { message: "Access Denied" });
  }
};

export const requireAdminAuth = (req, res, next) => {
	const token = req.cookies.jwt;
  
	if (token) {
	  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
		if (err) {
		  return res.render("login", { message: "Access Denied" });
		} else {
		  try {
			const user = await getUserByEmail(decodedToken.email);
			if (!user || (user && user.type !== 0)) {
			  return res.render("login", { message: "Access Denied" });
			} else {
			  req.userEmail = decodedToken.email; 
			  next();
			}
		  } catch (err) {
			return res.render("login", { message: "Access Denied" });
		  }
		}
	  });
	} else {
	  res.render("login", { message: "Access Denied" });
	}
  };
  