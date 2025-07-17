// src/timeline/timeline.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../posts/schemas/post.schema';
import { User } from '../users/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class TimelineService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getTimeline(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) return [];
    const followingIds = user.following;

    const posts = await this.postModel
      .find({ author: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .populate('author', 'username') // optionally include author username
      .exec();

    return posts;
  }
}
