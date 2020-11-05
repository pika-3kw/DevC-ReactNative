export const setUser = (jwtToken, info) => ({
  type: "SET_USER",
  jwtToken,
  info,
});

export const removeUser = () => ({
  type: "REMOVE_USER",
});

export const constant = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
};
