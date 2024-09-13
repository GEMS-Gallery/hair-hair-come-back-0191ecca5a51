import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";

actor {
  type Post = {
    id: Nat;
    title: Text;
    content: Text;
    upvotes: Int;
    downvotes: Int;
    timestamp: Time.Time;
  };

  stable var nextPostId : Nat = 0;
  let posts = HashMap.HashMap<Nat, Post>(0, Nat.equal, Hash.hash);
  stable var stablePosts : [(Nat, Post)] = [];

  stable var tips : [Text] = [];

  public func createPost(title: Text, content: Text) : async Result.Result<Nat, Text> {
    let id = nextPostId;
    let post : Post = {
      id;
      title;
      content;
      upvotes = 0;
      downvotes = 0;
      timestamp = Time.now();
    };
    posts.put(id, post);
    nextPostId += 1;
    #ok(id)
  };

  public query func getPosts() : async [Post] {
    Array.tabulate(posts.size(), func (i: Nat) : Post {
      switch (posts.get(i)) {
        case (?post) post;
        case null {
          {
            id = 0;
            title = "";
            content = "";
            upvotes = 0;
            downvotes = 0;
            timestamp = 0;
          }
        };
      }
    })
  };

  public query func getPost(id: Nat) : async ?Post {
    posts.get(id)
  };

  public func upvotePost(id: Nat) : async Result.Result<(), Text> {
    switch (posts.get(id)) {
      case (?post) {
        let updatedPost = {
          id = post.id;
          title = post.title;
          content = post.content;
          upvotes = post.upvotes + 1;
          downvotes = post.downvotes;
          timestamp = post.timestamp;
        };
        posts.put(id, updatedPost);
        #ok()
      };
      case null #err("Post not found")
    }
  };

  public func downvotePost(id: Nat) : async Result.Result<(), Text> {
    switch (posts.get(id)) {
      case (?post) {
        let updatedPost = {
          id = post.id;
          title = post.title;
          content = post.content;
          upvotes = post.upvotes;
          downvotes = post.downvotes + 1;
          timestamp = post.timestamp;
        };
        posts.put(id, updatedPost);
        #ok()
      };
      case null #err("Post not found")
    }
  };

  public func addTip(tip: Text) : async Result.Result<(), Text> {
    tips := Array.append(tips, [tip]);
    #ok()
  };

  public query func getTips() : async [Text] {
    tips
  };

  system func preupgrade() {
    stablePosts := Iter.toArray(posts.entries());
  };

  system func postupgrade() {
    for ((id, post) in stablePosts.vals()) {
      posts.put(id, post);
    };
  };
}
