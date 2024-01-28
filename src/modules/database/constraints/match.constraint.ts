import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';

/** 判断两个值是否相等的验证规则 */
/** name 选项可以随意定义 */
@ValidatorConstraint({ name: 'isMatch' })
export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args?: ValidationArguments): boolean | Promise<boolean> {
        // args.constraints 是一个数组，里面存放的是装饰器的参数
        // 获取传入的对比属性赋给 relatedProperty
        const [relatedProperty] = args.constraints;
        // 获取其值，与待验证属性进行比较
        const relatedValue = (args.object as any)[relatedProperty];
        // 返回结果
        return value === relatedValue;
    }

    defaultMessage?(args?: ValidationArguments): string {
        const [relatedProperty] = args.constraints;
        // 不匹配，返回报文信息
        return `${args.property} and ${relatedProperty} dont match`;
    }
}
/**
 * 判断DTO中两个属性的值是否相等的验证规则
 * @param relatedProperty 用于对比的属性名称
 * @param validationOptions class-validator库的选项
 * @description 通过MatchConstraint 做的装饰器工厂
 */
export function isMatch(relatedProperty: string, validationOptions: ValidationOptions) {
    // object为DTO验证对象,propertyName为验证的属性名称
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            target: object.constructor, // 为待验证的DTO类的构造器
            propertyName, // 为待验证的属性名称
            options: validationOptions, // 为class-validator库的选项
            constraints: [relatedProperty], // 自定义参数数组
            validator: MatchConstraint, // 绑定的定义约束执行逻辑的类
        });
    };
}
