// src/posts/posts.controller.ts
import { Controller, Post as HttpPost, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async createPost(
    @Body() body: { title: string; description: string },
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.postsService.createPost(body.title, body.description, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('timeline') //posts/timeline
  async getTimeLine(@Req() req: Request){
    const user = req.user as any;
    return this.postsService.getTimeLine(user.userId);
  }
}
