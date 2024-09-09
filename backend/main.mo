import Array "mo:base/Array";
import AssocList "mo:base/AssocList";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Float "mo:base/Float";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type Song = {
    id: Nat;
    title: Text;
    artist: Text;
    duration: Float;
    url: Text;
  };

  type User = {
    id: Principal;
    username: Text;
    createdAt: Time.Time;
  };

  stable var nextSongId: Nat = 0;
  let songs = HashMap.HashMap<Nat, Song>(0, Nat.equal, Hash.hash);
  let users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

  public shared(msg) func createUser(username: Text) : async Result.Result<User, Text> {
    let caller = msg.caller;
    switch (users.get(caller)) {
      case (?_) { #err("User already exists") };
      case null {
        let newUser = {
          id = caller;
          username = username;
          createdAt = Time.now();
        };
        users.put(caller, newUser);
        #ok(newUser)
      };
    }
  };

  public query func getUser(userId: Principal) : async ?User {
    users.get(userId)
  };

  public shared(msg) func addSong(title: Text, artist: Text, duration: Float, url: Text) : async Nat {
    let newSong = {
      id = nextSongId;
      title = title;
      artist = artist;
      duration = duration;
      url = url;
    };
    songs.put(nextSongId, newSong);
    nextSongId += 1;
    nextSongId - 1
  };

  public query func getSong(id: Nat) : async ?Song {
    songs.get(id)
  };

  public query func getAllSongs() : async [Song] {
    Iter.toArray(songs.vals())
  };

  public shared(msg) func updateUser(newUsername: Text) : async Result.Result<User, Text> {
    let caller = msg.caller;
    switch (users.get(caller)) {
      case (?user) {
        let updatedUser = {
          id = user.id;
          username = newUsername;
          createdAt = user.createdAt;
        };
        users.put(caller, updatedUser);
        #ok(updatedUser)
      };
      case null { #err("User not found") };
    }
  };

  system func preupgrade() {
    // Implement if needed
  };

  system func postupgrade() {
    // Implement if needed
  };
}
