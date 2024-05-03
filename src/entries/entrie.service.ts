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
    const createdEntrie = new this.entrieModel(createEntrieDto);
    return createdEntrie.save();
  }

  async findOneByDate(date: string, email: string): Promise<Entrie | null> {
    const logger = new Logger('EntrieService');
    try {
      logger.log(new Date(date))
      logger.log(new Date(new Date(date).setDate(new Date(date).getDate() + 1)))

      const split = await this.entrieModel.findOne({
        email,
        date: { $gte: new Date(date).setHours(0, 0, 0, 0) , $lte: new Date(new Date(date).setDate(new Date(date).getDate() + 1)).setHours(0, 0, 0, 0) },
      }).exec();
      logger.log(split);
      return split;
    } catch (error) {
      logger.error(error);
      return null;
    }
  } 
}
