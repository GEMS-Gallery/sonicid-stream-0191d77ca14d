export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const User = IDL.Record({
    'id' : IDL.Principal,
    'username' : IDL.Text,
    'createdAt' : Time,
  });
  const Result = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const Song = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'title' : IDL.Text,
    'duration' : IDL.Float64,
    'artist' : IDL.Text,
  });
  return IDL.Service({
    'addSong' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Float64, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'createUser' : IDL.Func([IDL.Text], [Result], []),
    'getAllSongs' : IDL.Func([], [IDL.Vec(Song)], ['query']),
    'getSong' : IDL.Func([IDL.Nat], [IDL.Opt(Song)], ['query']),
    'getUser' : IDL.Func([IDL.Principal], [IDL.Opt(User)], ['query']),
    'updateUser' : IDL.Func([IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
