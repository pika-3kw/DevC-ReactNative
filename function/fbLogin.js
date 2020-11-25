import axios from "axios";

import { BACKEND_URL } from "../constants";

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
