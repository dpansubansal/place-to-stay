import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Bearer daisdn123nc
    const googleToken = token.length > 1000;
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        name: payload.name,
        photoUrl: payload.picture,
      };
    } else {
      // verify our custom jwt token
      const decodedTkn = jwt.verify(token, process.env.JWT_SECRET);
      const { id, name, photoUrl } = decodedTkn;
      req.user = { id, name, photoUrl };
    }
    next();
  } catch (er) {
    console.log("error with auth");
    res.status(401).json({
      success: false,
      message: "somethingg went wrong with authorization",
    });
  }
};

export default auth;
