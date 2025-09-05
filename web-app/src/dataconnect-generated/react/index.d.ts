import { UserInsertData, ListPhotosData, AddCommentData, GetAlbumsForCoupleData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useUserInsert(options?: useDataConnectMutationOptions<UserInsertData, FirebaseError, void>): UseDataConnectMutationResult<UserInsertData, undefined>;
export function useUserInsert(dc: DataConnect, options?: useDataConnectMutationOptions<UserInsertData, FirebaseError, void>): UseDataConnectMutationResult<UserInsertData, undefined>;

export function useListPhotos(options?: useDataConnectQueryOptions<ListPhotosData>): UseDataConnectQueryResult<ListPhotosData, undefined>;
export function useListPhotos(dc: DataConnect, options?: useDataConnectQueryOptions<ListPhotosData>): UseDataConnectQueryResult<ListPhotosData, undefined>;

export function useAddComment(options?: useDataConnectMutationOptions<AddCommentData, FirebaseError, void>): UseDataConnectMutationResult<AddCommentData, undefined>;
export function useAddComment(dc: DataConnect, options?: useDataConnectMutationOptions<AddCommentData, FirebaseError, void>): UseDataConnectMutationResult<AddCommentData, undefined>;

export function useGetAlbumsForCouple(options?: useDataConnectQueryOptions<GetAlbumsForCoupleData>): UseDataConnectQueryResult<GetAlbumsForCoupleData, undefined>;
export function useGetAlbumsForCouple(dc: DataConnect, options?: useDataConnectQueryOptions<GetAlbumsForCoupleData>): UseDataConnectQueryResult<GetAlbumsForCoupleData, undefined>;
