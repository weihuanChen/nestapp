import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';

import { PostController } from './controllers';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from './repositories';
import { PostService, SanitizeService } from './services';
import { PostSubscriber } from './subscribers/post.subscriber';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        // 导入实体
        DatabaseModule.forRepository([PostRepository]),
    ],
    controllers: [PostController],
    providers: [PostService, PostSubscriber, SanitizeService],
    exports: [PostService, DatabaseModule.forRepository([PostRepository])],
})
export class ContentModule {}
