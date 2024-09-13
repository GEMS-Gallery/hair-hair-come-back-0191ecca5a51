export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Time = IDL.Int;
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'upvotes' : IDL.Int,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'timestamp' : Time,
    'downvotes' : IDL.Int,
  });
  return IDL.Service({
    'addTip' : IDL.Func([IDL.Text], [Result], []),
    'createPost' : IDL.Func([IDL.Text, IDL.Text], [Result_1], []),
    'downvotePost' : IDL.Func([IDL.Nat], [Result], []),
    'getPost' : IDL.Func([IDL.Nat], [IDL.Opt(Post)], ['query']),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'getTips' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'upvotePost' : IDL.Func([IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
