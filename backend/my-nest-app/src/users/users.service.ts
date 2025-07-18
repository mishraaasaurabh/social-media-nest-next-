import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(username: string, password: string): Promise<UserDocument> {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashed });
    return newUser.save();
  }

  async getRecommendedUsers(currentUserId: string): Promise<User[]> {
    const currentUser = await this.userModel.findById(currentUserId);
    if (!currentUser) {
      throw new Error("Current user not found");
    }

    return this.userModel.find({
      _id: { $ne: currentUserId, $nin: currentUser.following },
    })
      .limit(10)
      .select('_id username')
      .exec();
  }

  // Optional: find by ID
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async follow(currentUserId: string, targetUserId: string) {
    const targetUser = await this.userModel.findById(targetUserId);
    if (!targetUser) throw new NotFoundException('User to follow not found');

    return this.userModel.findByIdAndUpdate(
      currentUserId,
      { $addToSet: { following: new Types.ObjectId(targetUserId) } },
      { new: true },
    );
  }

  async unfollow(currentUserId: string, targetUserId: string) {
    return this.userModel.findByIdAndUpdate(
      currentUserId,
      { $pull: { following: new Types.ObjectId(targetUserId) } },
      { new: true },
    );
  }

  async getFollowings(userId: string) {
    return this.userModel.findById(userId).populate('following', 'username');
  }
}
