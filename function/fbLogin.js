import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL;

export default async (token) => {
  try {
    const user = await axios.post(`${BACKEND_URL}` + `/auth/facebook/login/`, {
      fbToken: token,
    });

    return user.data;
  } catch (error) {
    console.log(error);
  }
};
