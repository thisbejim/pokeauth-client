// firebase
import { database } from './firebase';

// actions
import { updateDeveloper } from './poke';

const getDeveloper = (developerId) => async(dispatch) => {
  try {
    const developer = await database.ref('developers').child(developerId).once('value');
    if (developer.val()) {
      dispatch(updateDeveloper(developer.val()));
    } else {
      // developer doesn't exist or has not been approved
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getDeveloper,
};
