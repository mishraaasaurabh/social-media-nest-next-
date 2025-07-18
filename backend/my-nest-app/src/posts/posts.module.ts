// src/posts/posts.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { User, UserSchema } from 'src/users/schemas/users.schema';
// UserSchema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema },
    { name: User.name, schema: UserSchema },]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
