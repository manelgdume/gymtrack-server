import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entrie } from '../schemas/entrie.schema';
import { CreateEntrieDto } from './dto/create-entrie.dto';

@Injectable()
export class EntrieService {
  constructor(@InjectModel(Entrie.name) private entrieModel: Model<Entrie>) { }

  async create(createEntrieDto: CreateEntrieDto): Promise<Entrie> {
    const logger = new Logger('EntrieService');
    logger.log(createEntrieDto)
    const createdEntrie = new this.entrieModel(createEntrieDto);
    return createdEntrie.save();
  }

  async findOneByName(name: string): Promise<Entrie | null> {
    const logger = new Logger('EntrieService');
    const split = await this.entrieModel.findOne({ name }).select(`days workouts`).exec();
    logger.log(split)
    return split 
  }  
}
