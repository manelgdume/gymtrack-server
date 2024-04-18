import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Logger, UseGuards } from '@nestjs/common';
import { EntrieService } from './entrie.service';
import { CreateEntrieDto } from './dto/create-entrie.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('entrie')
export class EntrieController {
  constructor(private readonly entrieService: EntrieService) { }


  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createEntrieDto: CreateEntrieDto) {
    const logger = new Logger('SplitController');
 
    logger.log(createEntrieDto)
    try {
      await this.entrieService.create(createEntrieDto);
      return true
    } catch (error) {
      logger.log(error);
      return false
    }
  }
}
