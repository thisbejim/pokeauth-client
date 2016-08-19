const config = {
  apiKey: 'AIzaSyDIO0qyF90wiDcg2uYXVQf_RuJnOLlbr68',
  authDomain: 'pokeauth.firebaseapp.com',
  databaseURL: 'https://pokeauth.firebaseio.com',
};

firebase.initializeApp(config);
export const database = firebase.database();
export const auth = firebase.auth();

export const firebaseError = (code) => {
  switch (code) {
    case 'auth/wrong-password':
      return 'Incorrect email or password';
    case 'auth/user-not-found':
      return 'You have not registered for PokéAuth';
    case 'auth/user-disabled':
      return 'Your PokéAuth account has been disabled';
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/email-already-in-use':
      return 'Invalid email';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed';
    case 'auth/weak-password':
      return 'Password is not strong enough';
    default:
      return 'Unknown error';
  }
};
