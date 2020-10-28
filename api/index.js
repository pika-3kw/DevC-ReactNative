const host = "http://192.168.1.211:3000";

export const facebookLogin = (email) => `${host}/user?email=${email}`;
