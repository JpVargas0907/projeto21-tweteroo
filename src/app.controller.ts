import { BadRequestException } from '@nestjs/common';
import { Controller, Get, Post, Body, Param, Query, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getTest() {
    return "I'm okay!";
  }

  @Post('sign-up')
  @HttpCode(200)
  signUp(@Body() body: { username: string, avatar: string }): string {
    this.appService.signUp(body.username, body.avatar);
    return 'OK';
  }
  
  @Post('tweets')
  addTweet(@Body() body: { username: string, tweet: string }): string {
    this.appService.addTweet(body.username, body.tweet);
    return 'OK';
  }

  @Get('tweets')
  getTweets(@Query('page') page?: number): any[] {
    const tweetsPerPage = 15; // Defina a quantidade de tweets por página
    
    if (page && page < 1) {
      throw new BadRequestException('Informe uma página válida!');
    }
  
    if (page) {
      return this.appService.getTweetsPaginated(page, tweetsPerPage);
    } else {
      return this.appService.getTweets();
    }
  }  

  @Get('tweets/:username')
  getTweetsByUsername(@Param('username') username: string): any[] {
    return this.appService.getTweetsByUsername(username);
  }

  @Get('users')
  getUsers(): any[] {
    return this.appService.getUsers();
  }
}
