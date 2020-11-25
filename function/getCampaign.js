import axios from "axios";

import { BACKEND_URL } from "../constants";

export default async (token) => {
  try {
    const res = await axios.get(`${BACKEND_URL}` + `/campaign`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
