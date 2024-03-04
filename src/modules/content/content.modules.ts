import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';

import * as controllers from './controllers';
import * as entities from './entities';
import * as repositories from './repositories';
import * as services from './services';

import { PostService } from './services/post.service';
import { SanitizeService } from './services/sanitize.service';
import { PostSubscriber } from './subscribers/post.subscriber';
import { ContentConfig } from './types';

// @Module({
//     imports: [
//         TypeOrmModule.forFeature(Object.values(entities)),
//         // 导入实体
//         DatabaseModule.forRepository(Object.values(repositories)),
//     ],
//     controllers: Object.values(controllers),
//     providers: [...Object.values(services), SanitizeService, PostSubscriber],
//     exports: [
//         ...Object.values(services),
//         DatabaseModule.forRepository(Object.values(repositories)),
//     ],
// })
// export class ContentModule {}

@Module({})
export class ContentModule {
    static forRoot(configRegister?: () => ContentConfig): DynamicModule {
        const config: Required<ContentConfig> = {
            searchType: 'mysql',
            ...(configRegister ? configRegister() : {}),
        };
        const providers: ModuleMetadata['providers'] = [
            ...Object.values(services),
            SanitizeService,
            PostSubscriber,
            {
                provide: PostService,
                inject: [
                    repositories.PostRepository,
                    repositories.CategoryRepository,
                    services.CategoryService,
                    repositories.TagRepository,
                ],
                useFactory(
                    postRepository: repositories.PostRepository,
                    categoryRepository: repositories.CategoryRepository,
                    categoryService: services.CategoryService,
                    tagRepository: repositories.TagRepository,
                ) {
                    return new PostService(
                        postRepository,
                        categoryRepository,
                        categoryService,
                        tagRepository,
                        config.searchType,
                    );
                },
            },
        ];
        return {
            module: ContentModule,
            imports: [
                TypeOrmModule.forFeature(Object.values(entities)),
                DatabaseModule.forRepository(Object.values(repositories)),
            ],
            controllers: Object.values(controllers),
            providers,
            exports: [
                ...Object.values(services),
                PostService,
                DatabaseModule.forRepository(Object.values(repositories)),
            ],
        };
    }
}
