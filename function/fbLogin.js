import { BACKEND_URL } from "@env";
import axios from "axios";

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
