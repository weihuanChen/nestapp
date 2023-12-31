import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config';
import { ContentModule } from './modules/content/content.modules';
import { CoreModule } from './modules/core/core.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
    imports: [
        ContentModule,
        // ExampleModule,
        CoreModule.forRoot({ config: { name: '3r' } }),
        DatabaseModule.forRoot(database),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
