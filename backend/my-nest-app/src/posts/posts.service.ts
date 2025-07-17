// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async createPost(title: string, description: string, authorId: string) {
    const newPost = new this.postModel({ title, description, author: authorId });
    return newPost.save();
  }
}
