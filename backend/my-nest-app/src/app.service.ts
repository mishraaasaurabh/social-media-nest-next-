import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  str: string[] = ['one', 'Two', 'Three'];
  getHello(): string[] {
    return this.str;
  }
}
