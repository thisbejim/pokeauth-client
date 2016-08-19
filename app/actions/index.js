import poke from './poke';
import forms from './forms';
import developer from './developer';
import user from './user';
import admin from './admin';

module.exports = {
  ...poke,
  ...forms,
  ...developer,
  ...user,
  ...admin,
};
