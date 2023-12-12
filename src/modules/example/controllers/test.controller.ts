import { Controller, Get, Inject } from '@nestjs/common';

import { ConfigService } from '@/modules/core/services/config.service';
import { PostService } from '@/modules/services/post.service';

import { EighthService } from '../services/eighth.service';
import { FifthService } from '../services/fifth.service';
import { FirstService } from '../services/first.service';
import { FourthService } from '../services/fourth.service';
import { SecondService } from '../services/second.service';
import { SeventhService } from '../services/seventh.service';

@Controller('test')
export class TestController {
    constructor(
        private first: FirstService,
        @Inject('ID-EXAMPLE') private idexp: FirstService,
        @Inject('ALIAS-EXAMPLE') private asexp: FirstService,
        @Inject('ASYNC-EXAMPLE') private acexp: SecondService,
        @Inject('FACTORY-EXAMPLE') private ftexp: FourthService,
        private fifth: FifthService,
        private seventh: SeventhService,
        private eighth: EighthService,
        // 导入别的模块的provider
        private postService: PostService,
        // 全局
        private configService: ConfigService,
    ) {}

    @Get('value')
    async useValue() {
        return {
            useValue: this.first.useValue(),
        };
    }

    @Get('id')
    async useId() {
        return this.idexp.useValue();
    }

    @Get('factory')
    async useFactory() {
        return this.ftexp.getContent();
    }

    @Get('alias')
    async useAlias() {
        return this.asexp.useValue();
    }

    @Get('async')
    async useAsync() {
        return this.acexp.useAsync();
    }

    @Get('circular')
    async useCircular() {
        return this.fifth.circular();
    }

    @Get('scope')
    async echoScope() {
        // 每一次访问都会重置SeventhService的实例
        await this.eighth.echo();
        await this.seventh.add();
        console.log(`in controller: ${await this.seventh.find()}`);
        return 'Scope Test';
    }

    @Get('post')
    async getPost() {
        return this.postService.findAll();
    }

    @Get('name')
    async name() {
        return this.configService.get('name');
    }
}
