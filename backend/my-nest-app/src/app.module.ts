import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost:27017/my-nest-app'),
  AuthModule,
  UsersModule,
  PostsModule,
  TimelineModule, // ready for timeline next
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
