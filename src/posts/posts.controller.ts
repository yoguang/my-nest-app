import { Body, Controller, Get, Param, Post, Query, Logger } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

const PostsListMock = [
  { id: '1', title: '我是帖子1', author: 'stephen_w' },
  { id: '2', title: '我是帖子2', author: 'stephen_y' },
  { id: '3', title: '我是帖子3', author: 'stepehn_g' },
];

interface IResponse {
  success: boolean;
  result: any;
}

class CreateBodyDto {
  @ApiProperty({ description: '帖子标题' })
  title: string;
  @ApiProperty({ description: '作者' })
  author: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {

  @Get('list') 
  @ApiOperation({ summary: '帖子列表' })
  getList(@Query() query): IResponse { // 使用 Query 装饰器获取接口？之后的参数
    Logger.log(JSON.stringify(query), 'posts getList query');
    return {
      success: true,
      result: PostsListMock,
    };
  }

  @Post('create')
  @ApiOperation({ summary: '创建帖子' })
  create(@Body() body: CreateBodyDto): IResponse { // 使用 Body 装饰器获取 body 中的数据
    const { title, author } = body;
    Logger.log(JSON.stringify(body), 'posts create body');
    const createId = Date.now().toString();
    return {
      success: true,
      result: createId,
    };
  }

  @Get(':id')
  @ApiOperation({  summary: '帖子详情' })
  detail(@Param('id') id: string): IResponse { // 使用 @Parma 装饰器获取接口参数帖子 ID
    Logger.log(id, 'posts detai id');
    const post = PostsListMock.find(item => item.id === id);
    if (post) {
      return {
        success: true,
        result: post,
      };
    } else {
      return {
        success: false,
        result: null,
      }
    }
  }
}
