// src/entities.ts

export class User {
  private _username: string;
  private _avatar: string;

  constructor(username: string, avatar: string) {
    this._username = username;
    this._avatar = avatar;
  }

  get username(): string {
    return this._username;
  }

  get avatar(): string {
    return this._avatar;
  }
}

export class Tweet {
  private _user: User;
  private _tweet: string;

  constructor(user: User, tweet: string) {
    this._user = user;
    this._tweet = tweet;
  }

  get user(): User {
    return this._user;
  }

  get tweet(): string {
    return this._tweet;
  }
}
