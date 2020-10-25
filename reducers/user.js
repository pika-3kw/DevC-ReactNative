const initState = {
  isAuth: false,
  facebookAccount: {},
};

export default user = (state = initState, action) => {
  switch (action.type) {
    case "SET_FACEBOOK_ACCOUNT": {
      return { ...state, isAuth: true, facebookAccount: action.payload };
    }
    case "REMOVE_FACEBOOK_ACCOUNT": {
      return { ...state, isAuth: false, facebookAccount: {} };
    }
    default:
      return state;
  }
};
