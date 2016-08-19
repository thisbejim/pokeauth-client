const initialState = {
  applicants: [],
};

export const admin = (state = initialState, action): Hackathon => {
  switch (action.type) {
    case 'UPDATE_APPLICANTS':
      return Object.assign({}, state, { applicants: action.applicants });
    case 'LOGOUT':
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};
