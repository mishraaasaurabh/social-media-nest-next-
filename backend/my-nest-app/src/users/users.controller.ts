// src/users/users.controller.ts
import { Controller, Post, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  follow(@Param('id') id: string, @Req() req: Request) {
    const currentUser = req.user as any;
    return this.userService.followUser(currentUser.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unfollow')
  unfollow(@Param('id') id: string, @Req() req: Request) {
    const currentUser = req.user as any;
    return this.userService.unfollowUser(currentUser.userId, id);
  }
}
