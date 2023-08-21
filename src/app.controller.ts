import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sign-up')
  signUp(@Body() body: { username: string, avatar: string }): string {
    return this.appService.signUp(body.username, body.avatar);
  }

  @Post('tweets')
  addTweet(@Body() body: { username: string, tweet: string }): string {
    return this.appService.addTweet(body.username, body.tweet);
  }

  @Get('tweets')
  getTweets(): any[] {
    return this.appService.getTweets();
  }

  @Get('users')
  getUsers(): any[] {
    return this.appService.getUsers();
  }
}
