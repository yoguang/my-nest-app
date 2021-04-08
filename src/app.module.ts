import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [],
  controllers: [AppController, PostsController], // 新增 RostsController 博客接口
  providers: [AppService],
})
export class AppModule {}
