import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly users = [];
  private readonly tweets = [];

  signUp(username: string, avatar: string): string {
    this.users.push({ username, avatar });
    return 'OK';
  }

  addTweet(username: string, tweet: string): string {
    const avatar = this.users.find(user => user.username === username)?.avatar;
    this.tweets.push({ username, tweet, avatar });
    return 'OK';
  }

  getTweets(): any[] {
    const lastTweets = this.tweets.slice(-10);
    return lastTweets;
  }

  getUsers(): any[] {
    return this.users;
  }
}
