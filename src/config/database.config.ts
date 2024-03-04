import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PostEntity } from '@/modules/content/entities/post.entity';

export const database = (): TypeOrmModuleOptions => ({
    // mysql
    charset: 'utf8mb4',
    logging: ['error'],
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'shendongC123',
    database: '3r',
    // 以下为sqlite配置
    // type: 'better-sqlite3',
    // database: resolve(__dirname, '../../database.db'),
    synchronize: true,
    autoLoadEntities: true,
    entities: [PostEntity],
});
