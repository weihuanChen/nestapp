import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    MaxLength,
    Min,
    ValidateIf,
} from 'class-validator';

import { isNil, toNumber } from 'lodash';

import { toBoolean } from '@/modules/core/helpers';
import { PaginateOptions } from '@/modules/database/types';

import { PostOrderType } from '../constants';

/**
 * 分页查询验证
 */
export class QueryPostDto implements PaginateOptions {
    @Transform(({ value }) => toBoolean(value))
    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;

    @IsEnum(PostOrderType, {
        message: `排序规则必须是${Object.values(PostOrderType).join(',')}其中一项`,
    })
    @IsOptional()
    orderBy?: PostOrderType;

    @Transform(({ value }) => toBoolean(value))
    @Min(1, { message: '当前页必须大于1' })
    @IsNumber()
    @IsOptional()
    page = 1;

    @Transform(({ value }) => toBoolean(value))
    @Min(1, { message: '每页显示数据必须大于1' })
    @IsNumber()
    @IsOptional()
    limit: number = 10;
}

/**
 * 文章创建验证
 */
export class CreatePostDto {
    @MaxLength(255, {
        always: true,
        message: '帖子标题长度最大为$constraint1',
    })
    // 创建时必须
    @IsNotEmpty({ groups: ['create'], message: '帖子标题必须填写' })
    @IsOptional({ groups: ['update'] })
    title: string;

    @IsNotEmpty({ groups: ['create'], message: '帖子内容必须填写' })
    @IsOptional({ groups: ['update'] })
    body: string;

    @MaxLength(500, {
        always: true,
        message: '帖子描述长度最大为$constraint1',
    })
    @IsOptional({ always: true })
    summary?: string;

    @IsDateString({ strict: true }, { always: true })
    @IsOptional({ always: true })
    @ValidateIf((value) => !isNil(value.publishedAt))
    @Transform(({ value }) => (value === 'null' ? null : value))
    publishedAt?: Date;

    @MaxLength(20, {
        each: true,
        always: true,
        message: '每个关键字长度最大为$constraint1',
    })
    @IsOptional({ always: true })
    keywords?: string[];

    @Transform(({ value }) => toNumber(value))
    @Min(0, { always: true, message: '排序值必须大于0' })
    @IsNumber(undefined, { always: true })
    @IsOptional({ always: true })
    customOrder = 0;
}
// PartialType 使包含的内容中可选
export class UpdatePostDto extends PartialType(CreatePostDto) {
    // 更新时必须
    @IsNumber(undefined, { groups: ['update'], message: '帖子ID格式错误' })
    @IsDefined({ groups: ['update'], message: '帖子ID必须指定' })
    id: string;
}
