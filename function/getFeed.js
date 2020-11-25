import axios from "axios";

import { BACKEND_URL } from "../constants";

export default async (id, token) => {
  try {
    const feed = await axios.get(`${BACKEND_URL}` + `/facebook/${id}/feed/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return feed.data;
  } catch (error) {
    console.log(error);
  }
};
