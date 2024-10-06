import { Controller, Get, Param, Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Put()
  updateById(@Param('id') id: string) {
    return this.appService.getData();
  }
}
