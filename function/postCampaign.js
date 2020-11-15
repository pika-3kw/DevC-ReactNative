import axios from "axios";

import { BACKEND_URL } from "../constants";

export default async (body, token) => {
  try {
    const result = await axios.post(`${BACKEND_URL}` + `/campaign`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
