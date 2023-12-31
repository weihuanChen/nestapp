import { DynamicModule, Provider, Type } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, getDataSourceToken } from '@nestjs/typeorm';

import { DataSource, ObjectType } from 'typeorm';

import { CUSTOM_REPOSITORY_METADATA } from './constants';

// 动态模块传入数据库配置
export class DatabaseModule {
    static forRoot(configRegister: () => TypeOrmModuleOptions): DynamicModule {
        return {
            global: true,
            module: DatabaseModule,
            imports: [TypeOrmModule.forRoot(configRegister())],
        };
    }
    // 自定义Repository

    static forRepository<T extends Type<any>>(
        repositories: T[],
        dataSourceName?: string,
    ): DynamicModule {
        // 依赖列表
        const providers: Provider[] = [];
        for (const Repo of repositories) {
            const entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, Repo);

            if (!entity) {
                continue;
            }
            providers.push({
                inject: [getDataSourceToken(dataSourceName)],
                provide: Repo,
                useFactory: (dataSource: DataSource): InstanceType<typeof Repo> => {
                    const base = dataSource.getRepository<ObjectType<any>>(entity);
                    return new Repo(base.target, base.manager, base.queryRunner);
                },
            });
        }
        return {
            exports: providers,
            module: DatabaseModule,
            providers,
        };
    }
}
