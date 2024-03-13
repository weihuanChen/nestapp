import { isNil } from 'lodash';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

import { OrderType } from '../constants';
import { getOrderByQuery } from '../helpers';
import { OrderQueryType } from '../types';

// 基础存储类
export abstract class BaseRepository<E extends ObjectLiteral> extends Repository<E> {
    /**
     * 构建查询时默认的模型对应查询名称
     */
    protected abstract _qbName: string;

    /** f返回查询器名称 */
    get qbName() {
        return this._qbName;
    }

    /** 构建queryBuilder */
    buildBaseQB(): SelectQueryBuilder<E> {
        return this.createQueryBuilder(this.qbName);
    }

    /**
     * 默认排序规则，可以通过每个方法的orderBy选项进行覆盖
     */
    protected orderBy?: string | { name: string; order: `${OrderType}` };

    /**
     * 生成排序queryBuilder
     * @param qb
     * @param orderBy
     */
    addOrderByQuery(qb: SelectQueryBuilder<E>, orderBy?: OrderQueryType) {
        const orderByQuery = orderBy ?? this.orderBy;
        return !isNil(orderByQuery) ? getOrderByQuery(qb, this.qbName, orderByQuery) : qb;
    }
}
