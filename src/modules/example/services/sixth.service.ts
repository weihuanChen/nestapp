import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { FifthService } from './fifth.service';

// forwardRef 循环依赖
@Injectable()
export class SixthService {
    constructor(
        @Inject(forwardRef(() => FifthService))
        protected fifth: WrapperType<FifthService>,
    ) {}

    circular() {
        return `循环依赖2`;
    }
}
