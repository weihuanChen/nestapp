import { isNil } from 'lodash';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { PaginateOptions, PaginateReturn } from './types';

/**
 * 分页函数
 * @param db queryBuilder 实例
 * @param options 分页参数
 */
export const paginate = async <E extends ObjectLiteral>(
    qb: SelectQueryBuilder<E>,
    options: PaginateOptions,
): Promise<PaginateReturn<E>> => {
    // 当前页数
    const limit = isNil(options.limit) || options.limit < 1 ? 1 : options.limit;
    // 每页显示数量
    const page = isNil(options.page) || options.page < 1 ? 1 : options.page;
    // 开始位置
    const start = page >= 1 ? page - 1 : 0;
    // 当前页项目数量
    const totalItems = await qb.getCount();
    qb.take(limit).skip(start * limit);
    const items = await qb.getMany();
    // 总页数
    const totalPages =
        totalItems % limit === 0
            ? Math.floor(totalItems / limit)
            : Math.floor(totalItems / limit) + 1;
    // 当前页项目数量
    const remainder = totalItems % limit !== 0 ? totalItems % limit : limit;
    const itemCount = page < totalPages ? limit : remainder;
    return {
        items,
        meta: {
            totalItems,
            itemCount,
            perPage: limit,
            totalPages,
            currentPage: page,
        },
    };
};
