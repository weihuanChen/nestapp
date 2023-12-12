import { Injectable } from '@nestjs/common';

import { SeventhService } from './seventh.service';

@Injectable()
export class EighthService {
    constructor(protected seventh: SeventhService) {
        console.log('EighthService constructor');
    }

    async echo() {
        await this.seventh.find();
        console.log(`in use service: ${await this.seventh.find()}`);
    }
}
