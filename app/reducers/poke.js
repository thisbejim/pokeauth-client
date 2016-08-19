const initialState = {
  progress: 0,
  loading: false,
  loadingType: 'indeterminate',
  developers: [],
  isAdmin: false,
  snackBarOpen: false,
  snackBarMessage: '',
};

export const poke = (state = initialState, action): Hackathon => {
  switch (action.type) {
    case 'PROGRESS':
      return Object.assign({}, state, { progress: action.value });
    case 'START_LOADING':
      return Object.assign({}, state, { loading: true, loadingType: action.loadingType });
    case 'STOP_LOADING':
      return Object.assign({}, state, { loading: false });
    case 'UPDATE_DEVELOPERS':
      return Object.assign({}, state, { developers: action.developers });
    case 'IS_ADMIN':
      return Object.assign({}, state, { isAdmin: true });
    case 'LOGOUT':
      return Object.assign({}, state, initialState);
    case 'OPEN_SNACK_BAR':
      return Object.assign({}, state, { snackBarOpen: true, snackBarMessage: action.message });
    case 'CLOSE_SNACK_BAR':
      return Object.assign({}, state, { snackBarOpen: false, snackBarMessage: '' });
    default:
      return state;
  }
};
