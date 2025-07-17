// src/timeline/timeline.module.ts
import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../posts/schemas/post.schema';
import { User, UserSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}
