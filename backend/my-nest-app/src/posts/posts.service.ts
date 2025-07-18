import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>, // ✅ Inject User model
  ) { }

  async createPost(title: string, description: string, authorId: string) {
    const newPost = new this.postModel({ title, description, author: authorId });
    return newPost.save();
  }

  async getTimeLine(userId: string) {
    const user = await this.userModel.findById(userId).populate('following');

    if (!user) throw new Error('User not found');

    const followingIds = user.following.map((u) => u._id.toString());
    followingIds.push(userId); // include self posts

    return this.postModel
      .find({ author: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .populate('author', 'username');
  }
}
