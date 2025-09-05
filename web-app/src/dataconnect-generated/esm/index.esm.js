import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'mylovev2',
  location: 'us-central1'
};

export const userInsertRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UserInsert');
}
userInsertRef.operationName = 'UserInsert';

export function userInsert(dc) {
  return executeMutation(userInsertRef(dc));
}

export const listPhotosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPhotos');
}
listPhotosRef.operationName = 'ListPhotos';

export function listPhotos(dc) {
  return executeQuery(listPhotosRef(dc));
}

export const addCommentRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddComment');
}
addCommentRef.operationName = 'AddComment';

export function addComment(dc) {
  return executeMutation(addCommentRef(dc));
}

export const getAlbumsForCoupleRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAlbumsForCouple');
}
getAlbumsForCoupleRef.operationName = 'GetAlbumsForCouple';

export function getAlbumsForCouple(dc) {
  return executeQuery(getAlbumsForCoupleRef(dc));
}

