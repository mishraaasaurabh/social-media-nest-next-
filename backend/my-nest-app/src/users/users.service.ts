import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(username: string, password: string): Promise<UserDocument> {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashed });
    return newUser.save();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async followUser(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const currentUser = await this.userModel.findById(currentUserId);
    const targetUser = await this.userModel.findById(targetUserId);

    if (!currentUser) throw new NotFoundException('Current user not found');
    if (!targetUser) throw new NotFoundException('Target user not found');

    const targetId = targetUser._id as Types.ObjectId;
    const currentId = currentUser._id as Types.ObjectId;

    const alreadyFollowing = (currentUser.following as Types.ObjectId[]).some(
      (id) => id.equals(targetId),
    );

    if (alreadyFollowing) {
      throw new BadRequestException('Already following this user');
    }

    (currentUser.following as Types.ObjectId[]).push(targetId);
    (targetUser.followers as Types.ObjectId[]).push(currentId);

    await currentUser.save();
    await targetUser.save();

    return { message: 'Followed successfully' };
  }

  async unfollowUser(currentUserId: string, targetUserId: string) {
    const currentUser = await this.userModel.findById(currentUserId);
    const targetUser = await this.userModel.findById(targetUserId);

    if (!currentUser) throw new NotFoundException('Current user not found');
    if (!targetUser) throw new NotFoundException('Target user not found');

    const targetId = targetUser._id as Types.ObjectId;
    const currentId = currentUser._id as Types.ObjectId;

    currentUser.following = (currentUser.following as Types.ObjectId[]).filter(
      (id) => !id.equals(targetId),
    );

    targetUser.followers = (targetUser.followers as Types.ObjectId[]).filter(
      (id) => !id.equals(currentId),
    );

    await currentUser.save();
    await targetUser.save();

    return { message: 'Unfollowed successfully' };
  }
}
