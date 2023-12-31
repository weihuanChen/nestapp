import { Repository } from 'typeorm';

import { CustomRepository } from '@/modules/database/decorators';

import { PostEntity } from '../entities/post.entity';

// 储存postEntity
@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    buildBaseQB() {
        /// 通过继承获得this
        return this.createQueryBuilder('post');
    }
}
