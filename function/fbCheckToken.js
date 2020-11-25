import axios from "axios";

import { BACKEND_URL } from "../constants";

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
