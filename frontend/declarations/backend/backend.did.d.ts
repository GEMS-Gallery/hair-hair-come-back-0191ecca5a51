import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : bigint,
  'upvotes' : bigint,
  'title' : string,
  'content' : string,
  'timestamp' : Time,
  'downvotes' : bigint,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addTip' : ActorMethod<[string], Result>,
  'createPost' : ActorMethod<[string, string], Result_1>,
  'downvotePost' : ActorMethod<[bigint], Result>,
  'getPost' : ActorMethod<[bigint], [] | [Post]>,
  'getPosts' : ActorMethod<[], Array<Post>>,
  'getTips' : ActorMethod<[], Array<string>>,
  'upvotePost' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
