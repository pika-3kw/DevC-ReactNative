export const setFacebookAccount = (payload) => ({
  type: "SET_FACEBOOK_ACCOUNT",
  payload,
});

export const removeFacebookAccount = () => ({
  type: "REMOVE_FACEBOOK_ACCOUNT",
});

export const VisibilityFilters = {
  SET_FACEBOOK_ACCOUNT: "SET_FACEBOOK_ACCOUNT",
  REMOVE_FACEBOOK_ACCOUNT: "REMOVE_FACEBOOK_ACCOUNT",
};
