import { IsDefined, IsUUID } from 'class-validator';

export class DeleteDto {
    @IsUUID(undefined, { each: true, message: 'ID格式错误' })
    @IsDefined({ each: true, message: 'ID不能为空' })
    ids: string[];
}
