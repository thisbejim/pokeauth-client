const initialState = {
  serviceName: '',
  serviceDescription: '',
  callbackUrl: '',
  uid: '',
};

export const developer = (state = initialState, action): Hackathon => {
  switch (action.type) {
    case 'UPDATE_DEVELOPER':
      return Object.assign({}, state, { ...action.developer });
    case 'LOGOUT':
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};
