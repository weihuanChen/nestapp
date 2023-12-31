import { DataSource } from 'typeorm';

import { PostBodyType } from '../constants';
import { PostEntity } from '../entities/post.entity';
import { PostRepository } from '../repositories';
import { SanitizeService } from '../services/sanitize.service';

// 订阅者,在crud的时候提供一个钩子来进行额外的操作
export class PostSubscriber {
    constructor(
        protected dataSource: DataSource,
        protected sanitizeService: SanitizeService,
        protected postRepository: PostRepository,
    ) {}

    listenTo() {
        return PostEntity;
    }

    /**
     * 加载文章数据的处理
     * @param entity
     */
    async afterLoad(entity: PostEntity) {
        if (entity.type === PostBodyType.HTML) {
            entity.body = this.sanitizeService.sanitize(entity.body);
        }
    }
}
