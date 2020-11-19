import axios from "axios";

import { BACKEND_URL } from "../constants";

export default async (id, token) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}` + `/campaign` + `/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
