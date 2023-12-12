import { DynamicModule, Global, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';
// 设置全局
@Global()
@Module({
    providers: [ConfigService],
    exports: [ConfigService],
})
export class CoreModule {
    static forRoot(options: { config: RecordAny }): DynamicModule {
        return {
            module: CoreModule,
            global: true,
            providers: [
                {
                    provide: ConfigService,
                    useFactory() {
                        return new ConfigService(options.config);
                    },
                },
            ],
        };
    }
}
