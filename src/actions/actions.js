export const actionCreatorUpdateAuth = payload => {
  return {
    type: 'UPDATE_AUTH',
    payload,
  };
};

export const actionCreatorLogOut = payload => {
  return {
    type: 'LOGOUT',
  };
};
