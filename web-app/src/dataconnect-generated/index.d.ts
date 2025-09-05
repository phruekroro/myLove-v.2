import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddCommentData {
  comment_insert: Comment_Key;
}

export interface AlbumPhoto_Key {
  albumId: UUIDString;
  photoId: UUIDString;
  __typename?: 'AlbumPhoto_Key';
}

export interface Album_Key {
  id: UUIDString;
  __typename?: 'Album_Key';
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface Couple_Key {
  id: UUIDString;
  __typename?: 'Couple_Key';
}

export interface GetAlbumsForCoupleData {
  albums: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Album_Key)[];
}

export interface Like_Key {
  userId: UUIDString;
  photoId: UUIDString;
  __typename?: 'Like_Key';
}

export interface ListPhotosData {
  photos: ({
    id: UUIDString;
    url: string;
    caption?: string | null;
  } & Photo_Key)[];
}

export interface Photo_Key {
  id: UUIDString;
  __typename?: 'Photo_Key';
}

export interface UserInsertData {
  user_insert: User_Key;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface UserInsertRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UserInsertData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UserInsertData, undefined>;
  operationName: string;
}
export const userInsertRef: UserInsertRef;

export function userInsert(): MutationPromise<UserInsertData, undefined>;
export function userInsert(dc: DataConnect): MutationPromise<UserInsertData, undefined>;

interface ListPhotosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPhotosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPhotosData, undefined>;
  operationName: string;
}
export const listPhotosRef: ListPhotosRef;

export function listPhotos(): QueryPromise<ListPhotosData, undefined>;
export function listPhotos(dc: DataConnect): QueryPromise<ListPhotosData, undefined>;

interface AddCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddCommentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<AddCommentData, undefined>;
  operationName: string;
}
export const addCommentRef: AddCommentRef;

export function addComment(): MutationPromise<AddCommentData, undefined>;
export function addComment(dc: DataConnect): MutationPromise<AddCommentData, undefined>;

interface GetAlbumsForCoupleRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAlbumsForCoupleData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAlbumsForCoupleData, undefined>;
  operationName: string;
}
export const getAlbumsForCoupleRef: GetAlbumsForCoupleRef;

export function getAlbumsForCouple(): QueryPromise<GetAlbumsForCoupleData, undefined>;
export function getAlbumsForCouple(dc: DataConnect): QueryPromise<GetAlbumsForCoupleData, undefined>;

