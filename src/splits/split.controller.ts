import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Logger, UseGuards } from '@nestjs/common';
import { SplitService } from './split.service';
import { CreateSplitDto } from './dto/create-split.dto';
import { createDecipheriv } from 'crypto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('split')
export class SplitController {
  constructor(private readonly splitService: SplitService) { }

  @UseGuards(AuthGuard)
  @Get('/:name')
  findOneByName(@Param('name') name: string) {
    const logger = new Logger('SplitController');
    logger.log(name);
    return this.splitService.findOneByName(name)
  }
}
