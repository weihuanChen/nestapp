/**
 * 软删除的批量删除验证
 */

import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsUUID } from 'class-validator';
import { toBoolean } from 'validator';

import { DeleteDto } from './delete.dto';

export class DeleteWithTrashDto extends DeleteDto {
    /**
     * 是否软删除
     */
    @Transform(({ value }) => toBoolean(value))
    @IsBoolean()
    @IsOptional()
    trash?: boolean;
}
/** 批量恢复验证 */
export class RestoreDto {
    /**
     * 待恢复数据的ID列表
     */
    @IsUUID(undefined, {
        each: true,
        message: 'ID格式错误',
    })
    @IsDefined({
        each: true,
        message: 'ID必须指定',
    })
    ids: string[];
}
