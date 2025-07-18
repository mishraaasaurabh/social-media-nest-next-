// src/users/users.controller.ts
import { Controller, Post, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('follow/:id')
  followUser(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.userService.follow(user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unfollow/:id')
  unfollowUser(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.userService.unfollow(user.userId, id);
  }
}
