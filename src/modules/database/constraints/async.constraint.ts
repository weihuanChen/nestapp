import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
/**
 * @description 测试约束,异步
 */
@ValidatorConstraint({ name: 'Test', async: true })
export class TestConstraint implements ValidatorConstraintInterface {
    async validate(value: string, args: ValidationArguments) {
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Test';
    }
}
