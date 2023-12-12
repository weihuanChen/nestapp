import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';

import { PostService } from '@/modules/services/post.service';

import { CreatePostDto } from '../dtos/create-post.dto';

// 检查对象是否为null或者undefined

import { UpdatePostDto } from '../dtos/update-post.dto';
// import { PostEntity } from '../types';

// const posts: PostEntity[] = [
//     { title: '第一篇文章标题', body: '第一篇文章内容' },
//     { title: '第一篇文章标题', body: '第一篇文章内容' },
//     { title: '第一篇文章标题', body: '第一篇文章内容' },
//     { title: '第一篇文章标题', body: '第一篇文章内容' },
//     { title: '第一篇文章标题', body: '第一篇文章内容' },
//     { title: '第一篇文章标题', body: '第一篇文章内容' },
// ].map((v, id) => ({ id, ...v }));

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    async index() {
        return this.postService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        // const post = posts.find((it) => it.id === Number(id));
        // if (isNil(post)) {
        //     throw new NotFoundException(`the post with id ${id} not exits!`);
        // }
        // return post;

        return this.postService.findOne(id);
    }

    @Post()
    async store(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['create'],
            }),
        )
        data: CreatePostDto,
    ) {
        // const newPost: PostEntity = {
        //     id: Math.max(...posts.map(({ id }) => id + 1)),
        //     ...data,
        // };
        // posts.push(newPost);
        // return newPost;
        return this.postService.create(data);
    }

    @Patch()
    async update(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['update'],
            }),
        )
        { id, ...data }: UpdatePostDto,
    ) {
        // let toUpdate = posts.find((item) => item.id === Number(id));
        // if (isNil(toUpdate)) {
        //     throw new NotFoundException(`the post with id ${id} not exits!`);
        // }
        // toUpdate = { ...toUpdate, ...data };
        // posts = posts.map((item) => (item.id === Number(id) ? toUpdate : item));
        // return toUpdate;
        return this.postService.update({ id, ...data });
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        // const toDelete = posts.find((item) => item.id === Number(id));
        // if (isNil(toDelete)) throw new NotFoundException(`the post with id ${id} not exits!`);
        // posts = posts.filter((item) => item.id !== Number(id));
        // return toDelete;
        return this.postService.delete(id);
    }
}
