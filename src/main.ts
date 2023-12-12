import { NestFactory } from '@nestjs/core';

import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);

    // await app.listen(3000);
    const app = await NestFactory.create(AppModule, new FastifyAdapter(), {
        // 启用跨域
        cors: true,
        // 只使用error和warn级别的日志
        logger: ['error', 'warn'],
    });
    app.setGlobalPrefix('api');
    // 启动输出
    await app.listen(3100, () => {
        console.log('api:http:localhost:3100');
    });
}
bootstrap();
