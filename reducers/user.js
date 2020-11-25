const initState = {
  isAuth: false,
  info: {},
  jwtToken: "",
};

export default user = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        isAuth: true,
        info: action.info,
        jwtToken: action.jwtToken,
      };
    }
    case "REMOVE_USER": {
      return initState;
    }
    default:
      return state;
  }
};
