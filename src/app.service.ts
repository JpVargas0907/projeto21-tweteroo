import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { User, Tweet } from './entities';

@Injectable()
export class AppService {
  private readonly users: User[] = [];
  private readonly tweets: Tweet[] = [];

  signUp(username: string, avatar: string): void {
    if (!username || !avatar) {
      throw new BadRequestException('All fields are required!');
    }
    
    const existingUser = this.users.find(user => user.username === username);
    if (existingUser) {
      throw new ConflictException('Username already exists.');
    }
  
    this.users.push(new User(username, avatar));
  }
  

  addTweet(username: string, tweet: string): void {
    const user = this.users.find(u => u.username === username);
    if (!user) {
      throw new UnauthorizedException('Unauthorized user!');
    }
    this.tweets.push(new Tweet(user, tweet));
  }

  getTweets(): any[] {
    const lastTweets = this.tweets.slice(-15);
    return lastTweets.map(tweet => ({
      username: tweet.user.username,
      avatar: tweet.user.avatar,
      tweet: tweet.tweet,
    }));
  }

  getTweetsPaginated(page: number, tweetsPerPage: number): any[] {
    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
    
    const tweets = this.tweets.slice(startIndex, endIndex);
    
    return tweets.map(tweet => ({
      username: tweet.user.username,
      avatar: tweet.user.avatar,
      tweet: tweet.tweet,
    }));
  }
  
  getTweetsByUsername(username: string): any[] {
    const userTweets = this.tweets.filter(tweet => tweet.user.username === username);
    return userTweets.map(tweet => ({
      username: tweet.user.username,
      avatar: tweet.user.avatar,
      tweet: tweet.tweet,
    }));
  }

  getUsers(): any[] {
    return this.users;
  }
}
