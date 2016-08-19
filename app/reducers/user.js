const initialState = {
  authType: null,
  uid: '',
  email: '',
  password: '',
  approved: [],
  deleteDialogOpen: false,
  access: null,
};

export const user = (state = initialState, action): Hackathon => {
  switch (action.type) {
    case 'UPDATE_USER':
      return Object.assign({}, state, { uid: action.uid, approved: action.approved });
    case 'AUTH_CHECKED':
      return Object.assign({}, state, { authType: action.authType });
    case 'LOGOUT':
      return Object.assign({}, state, initialState);
    case 'OPEN_DELETE_DIALOG':
      return Object.assign({}, state, { deleteDialogOpen: true });
    case 'CLOSE_DELETE_DIALOG':
      return Object.assign({}, state, { deleteDialogOpen: false });
    case 'UPDATE_EMAIL':
      return Object.assign({}, state, { email: action.email });
    case 'UPDATE_PASSWORD':
      return Object.assign({}, state, { password: action.password });
    case 'UPDATE_ACCESS_INFO':
      return Object.assign({}, state, { access: action.developer });
    case 'CLEAR_ACCESS_INFO':
      return Object.assign({}, state, { access: null });
    default:
      return state;
  }
};
