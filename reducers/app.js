const initState = {
  appLoading: false,
};

export default app = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_APP_LOADING": {
      return { ...state, appLoading: true };
    }

    case "HIDE_APP_LOADING": {
      return { ...state, appLoading: false };
    }

    default:
      return state;
  }
};
