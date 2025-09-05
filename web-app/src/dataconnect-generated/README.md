# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPhotos*](#listphotos)
  - [*GetAlbumsForCouple*](#getalbumsforcouple)
- [**Mutations**](#mutations)
  - [*UserInsert*](#userinsert)
  - [*AddComment*](#addcomment)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPhotos
You can execute the `ListPhotos` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPhotos(): QueryPromise<ListPhotosData, undefined>;

interface ListPhotosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPhotosData, undefined>;
}
export const listPhotosRef: ListPhotosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPhotos(dc: DataConnect): QueryPromise<ListPhotosData, undefined>;

interface ListPhotosRef {
  ...
  (dc: DataConnect): QueryRef<ListPhotosData, undefined>;
}
export const listPhotosRef: ListPhotosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPhotosRef:
```typescript
const name = listPhotosRef.operationName;
console.log(name);
```

### Variables
The `ListPhotos` query has no variables.
### Return Type
Recall that executing the `ListPhotos` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPhotosData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPhotosData {
  photos: ({
    id: UUIDString;
    url: string;
    caption?: string | null;
  } & Photo_Key)[];
}
```
### Using `ListPhotos`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPhotos } from '@dataconnect/generated';


// Call the `listPhotos()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPhotos();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPhotos(dataConnect);

console.log(data.photos);

// Or, you can use the `Promise` API.
listPhotos().then((response) => {
  const data = response.data;
  console.log(data.photos);
});
```

### Using `ListPhotos`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPhotosRef } from '@dataconnect/generated';


// Call the `listPhotosRef()` function to get a reference to the query.
const ref = listPhotosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPhotosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.photos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.photos);
});
```

## GetAlbumsForCouple
You can execute the `GetAlbumsForCouple` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAlbumsForCouple(): QueryPromise<GetAlbumsForCoupleData, undefined>;

interface GetAlbumsForCoupleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAlbumsForCoupleData, undefined>;
}
export const getAlbumsForCoupleRef: GetAlbumsForCoupleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAlbumsForCouple(dc: DataConnect): QueryPromise<GetAlbumsForCoupleData, undefined>;

interface GetAlbumsForCoupleRef {
  ...
  (dc: DataConnect): QueryRef<GetAlbumsForCoupleData, undefined>;
}
export const getAlbumsForCoupleRef: GetAlbumsForCoupleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAlbumsForCoupleRef:
```typescript
const name = getAlbumsForCoupleRef.operationName;
console.log(name);
```

### Variables
The `GetAlbumsForCouple` query has no variables.
### Return Type
Recall that executing the `GetAlbumsForCouple` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAlbumsForCoupleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAlbumsForCoupleData {
  albums: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Album_Key)[];
}
```
### Using `GetAlbumsForCouple`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAlbumsForCouple } from '@dataconnect/generated';


// Call the `getAlbumsForCouple()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAlbumsForCouple();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAlbumsForCouple(dataConnect);

console.log(data.albums);

// Or, you can use the `Promise` API.
getAlbumsForCouple().then((response) => {
  const data = response.data;
  console.log(data.albums);
});
```

### Using `GetAlbumsForCouple`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAlbumsForCoupleRef } from '@dataconnect/generated';


// Call the `getAlbumsForCoupleRef()` function to get a reference to the query.
const ref = getAlbumsForCoupleRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAlbumsForCoupleRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.albums);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.albums);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UserInsert
You can execute the `UserInsert` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
userInsert(): MutationPromise<UserInsertData, undefined>;

interface UserInsertRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UserInsertData, undefined>;
}
export const userInsertRef: UserInsertRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
userInsert(dc: DataConnect): MutationPromise<UserInsertData, undefined>;

interface UserInsertRef {
  ...
  (dc: DataConnect): MutationRef<UserInsertData, undefined>;
}
export const userInsertRef: UserInsertRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the userInsertRef:
```typescript
const name = userInsertRef.operationName;
console.log(name);
```

### Variables
The `UserInsert` mutation has no variables.
### Return Type
Recall that executing the `UserInsert` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UserInsertData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UserInsertData {
  user_insert: User_Key;
}
```
### Using `UserInsert`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, userInsert } from '@dataconnect/generated';


// Call the `userInsert()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await userInsert();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await userInsert(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
userInsert().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `UserInsert`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, userInsertRef } from '@dataconnect/generated';


// Call the `userInsertRef()` function to get a reference to the mutation.
const ref = userInsertRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = userInsertRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## AddComment
You can execute the `AddComment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addComment(): MutationPromise<AddCommentData, undefined>;

interface AddCommentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddCommentData, undefined>;
}
export const addCommentRef: AddCommentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addComment(dc: DataConnect): MutationPromise<AddCommentData, undefined>;

interface AddCommentRef {
  ...
  (dc: DataConnect): MutationRef<AddCommentData, undefined>;
}
export const addCommentRef: AddCommentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addCommentRef:
```typescript
const name = addCommentRef.operationName;
console.log(name);
```

### Variables
The `AddComment` mutation has no variables.
### Return Type
Recall that executing the `AddComment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddCommentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddCommentData {
  comment_insert: Comment_Key;
}
```
### Using `AddComment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addComment } from '@dataconnect/generated';


// Call the `addComment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addComment();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addComment(dataConnect);

console.log(data.comment_insert);

// Or, you can use the `Promise` API.
addComment().then((response) => {
  const data = response.data;
  console.log(data.comment_insert);
});
```

### Using `AddComment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addCommentRef } from '@dataconnect/generated';


// Call the `addCommentRef()` function to get a reference to the mutation.
const ref = addCommentRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addCommentRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.comment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.comment_insert);
});
```

