import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';
import { ObjectType, Repository, DataSource } from 'typeorm';

type Condition = {
    entity: ObjectType<any>;
    /**
     * 用于查询的比对字段,默认id
     */
    map?: string;
};
@ValidatorConstraint({ name: 'dataExist', async: true })
@Injectable()
export class DataExistConstraint implements ValidatorConstraintInterface {
    constructor(private readonly dataSource: DataSource) {}

    async validate(value: string, args?: ValidationArguments) {
        let repo: Repository<any>;
        if (!value) {
            return false;
        }
        // 默认对比字段是id
        let map = 'id';
        // 通过传入的entity获取对应的Repository
        if ('entity' in args.constraints[0]) {
            map = args.constraints[0].map ?? 'id';
            repo = this.dataSource.getRepository(args.constraints[0].entity);
        } else {
            repo = this.dataSource.getRepository(args.constraints[0]);
        }
        // 通过查询记录是否存在进行验证
        const item = await repo.findOne({ where: { [map]: value } });
        return !!item;
    }

    defaultMessage?(args?: ValidationArguments): string {
        if (!args.constraints[0]) {
            return `Model not been specified!`;
        }
        return `All instance of ${args.constraints[0].name} must be exist!`;
    }
}
// /**
//  * 模型存在性验证
//  * @param entity 模型
//  * @param validationOptions
//  */
// function isDataExist(
//     entity: ObjectType<any>,
//     validationOptions?: ValidationOptions,
// ): (object: Record<string, any>, proertyName: string) => void;

/**
 * 模型存在性验证
 * @param condition
 * @param validationOptions
 */
function IsDataExist(
    condition: ObjectType<any> | Condition,
    validationOptions?: ValidationOptions,
): (object: Record<string, any>, propertyName: string) => void {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [condition],
            validator: DataExistConstraint,
        });
    };
}
export { IsDataExist };
