import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL;

export default async (jwtToken) => {
  try {
    const result = await axios.post(
      `${BACKEND_URL}` + `/auth/facebook/check-token/`,
      {
        jwtToken,
      }
    );

    return result.data.access;
  } catch (error) {
    console.log(error);
  }
};
