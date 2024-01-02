import { SetMetadata } from '@nestjs/common';
import { ObjectType } from 'typeorm';

export const CustomRepository = <T>(entity: ObjectType<T>): ClassDecorator =>
    SetMetadata('CUSTOM_REPOSITORY_METADATA', entity);
