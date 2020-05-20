import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const encryptPassword = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      reject(err);
      return false;
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(hash);
      return true;
    })
  });
});

const comparePassword = (password, hash) => new Promise(async (resolve, reject) => {
  try {
    const isMatch = await bcrypt.compare(password, hash)
    resolve(isMatch);
    return true;
  } catch (err) {
    reject(err);
    return false;
  }
});

const getToken = payload => {
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
}

const getPayload = token => {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    return { loggedIn: true, payload };
  } catch (err) {
    return { loggedIn: false };
  }
}

export { getToken, getPayload, encryptPassword, comparePassword };