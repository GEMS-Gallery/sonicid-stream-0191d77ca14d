import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : User } |
  { 'err' : string };
export interface Song {
  'id' : bigint,
  'url' : string,
  'title' : string,
  'duration' : number,
  'artist' : string,
}
export type Time = bigint;
export interface User {
  'id' : Principal,
  'username' : string,
  'createdAt' : Time,
}
export interface _SERVICE {
  'addSong' : ActorMethod<[string, string, number, string], bigint>,
  'createUser' : ActorMethod<[string], Result>,
  'getAllSongs' : ActorMethod<[], Array<Song>>,
  'getSong' : ActorMethod<[bigint], [] | [Song]>,
  'getUser' : ActorMethod<[Principal], [] | [User]>,
  'updateUser' : ActorMethod<[string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
