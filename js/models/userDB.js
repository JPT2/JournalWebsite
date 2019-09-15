var database = {
  addUser: addUser,
  get: fetch,
  verifyLogin: verifyLogin,
  delete: deleteUser,
  exists: exists,
  updateUser: updateUser,
  updatePermissions: updatePermissions,
  updateAffiliation: updateAffiliation,
  updateBirthday: updateBirthday,
  updateFirstName: updateFirstName,
  updateLastName: updateLastName,
  addInterest: addInterest,
  fetchInterests: fetchInterests,
  removeInterest: removeInterest,
  getUsersByPrefix: getUsersByPrefix,
};

module.exports = database;