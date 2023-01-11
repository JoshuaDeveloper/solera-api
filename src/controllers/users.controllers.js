import bycript from "bcrypt";
import { connection } from "../db.js";

// Compare password with hash from database using bcrypt
const comparePassword = async (password, hash) => {
  const result = await bycript.compare(password, hash);
  return result;
};

// Find user in database
const findUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Users WHERE username = "${username}"`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const user = results[0];
            comparePassword(password, user.password).then((result) => {
              if (result) {
                resolve(user);
              } else {
                resolve(null);
              }
            });
          } else {
            resolve(null);
          }
        }
      }
    );
  });
};

// Get username from request body
export const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await findUser(username, password);
    return res.send({
      fullName: userFound.fullname,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error });
  }
};
