// src/users/users.controller.ts
import { Controller, Post, Param, UseGuards, Req, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  followUser(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.userService.follow(user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unfollow')
  unfollowUser(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.userService.unfollow(user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recommendations')
  async getRecommendations(@Req() req) {
    const userId = req.user.userId;
    return this.userService.getRecommendedUsers(userId);
  }
}
