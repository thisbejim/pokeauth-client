// firebase
import { database } from './firebase';

const updateApplicants = (applicants) => ({
  type: 'UPDATE_APPLICANTS',
  applicants,
});

const getApplicants = () => async(dispatch) => {
  const applicants = await database.ref('applications').once('value');
  if (applicants.val()) {
    dispatch(updateApplicants(Object.values(applicants.val())));
  }
};

const validApplicant = (developerId) => async() => {
  const applicant = await database.ref('applications').child(developerId).once('value');
  await database.ref('developers').child(developerId).set(applicant.val());
  await database.ref('applications').child(developerId).remove();
};

const invalidApplicant = (developerId) => async() => {
  const applicant = await database.ref('applications').child(developerId).once('value');
  const app = applicant.val();
  await database.ref('blacklist').child(app.callbackUrl).set(true);
  await database.ref('blacklist').child(applicant.uid).set(true);
  await database.ref('applications').child(developerId).remove();
};

module.exports = {
  getApplicants, validApplicant, invalidApplicant,
};
