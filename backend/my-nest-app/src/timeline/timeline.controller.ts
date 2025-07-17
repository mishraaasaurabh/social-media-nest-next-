// src/timeline/timeline.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTimeline(@Req() req: Request) {
    const user = req.user as any;
    return this.timelineService.getTimeline(user.userId);
  }
}
