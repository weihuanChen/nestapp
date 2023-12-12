import { Injectable, Scope } from '@nestjs/common';
//  注入范围
@Injectable({ scope: Scope.REQUEST })
export class SeventhService {
    protected demo = 0;

    async add() {
        this.demo++;
    }

    async find() {
        return this.demo;
    }
}
