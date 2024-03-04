import { Module } from '@nestjs/common';

import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { database, content } from './config';
import { ContentModule } from './modules/content/content.modules';
import { CoreModule } from './modules/core/core.module';
import { AppFilter, AppIntercepter, AppPipe } from './modules/core/providers';
import { DatabaseModule } from './modules/database/database.module';

@Module({
    imports: [
        ContentModule.forRoot(content),
        // ExampleModule,
        CoreModule.forRoot({ config: { name: '3r' } }),
        DatabaseModule.forRoot(database),
    ],
    // controllers: [AppController],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new AppPipe({
                // 全局管道
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: true },
            }),
        },
        {
            provide: APP_INTERCEPTOR, // 全局序列化
            useClass: AppIntercepter,
        },
        {
            provide: APP_FILTER, // 全局过滤器
            useClass: AppFilter,
        },
    ],
})
export class AppModule {}
