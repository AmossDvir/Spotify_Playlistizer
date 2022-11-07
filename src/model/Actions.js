export const createAuthCode = (code) => {
  return { type: "AUTH_CODE", payload: code };
};

// export const setLoggedIn = 