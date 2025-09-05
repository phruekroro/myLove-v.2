const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'mylovev2',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const userInsertRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UserInsert');
}
userInsertRef.operationName = 'UserInsert';
exports.userInsertRef = userInsertRef;

exports.userInsert = function userInsert(dc) {
  return executeMutation(userInsertRef(dc));
};

const listPhotosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPhotos');
}
listPhotosRef.operationName = 'ListPhotos';
exports.listPhotosRef = listPhotosRef;

exports.listPhotos = function listPhotos(dc) {
  return executeQuery(listPhotosRef(dc));
};

const addCommentRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddComment');
}
addCommentRef.operationName = 'AddComment';
exports.addCommentRef = addCommentRef;

exports.addComment = function addComment(dc) {
  return executeMutation(addCommentRef(dc));
};

const getAlbumsForCoupleRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAlbumsForCouple');
}
getAlbumsForCoupleRef.operationName = 'GetAlbumsForCouple';
exports.getAlbumsForCoupleRef = getAlbumsForCoupleRef;

exports.getAlbumsForCouple = function getAlbumsForCouple(dc) {
  return executeQuery(getAlbumsForCoupleRef(dc));
};
