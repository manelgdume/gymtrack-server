import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Split } from '../schemas/split.schema';
import { CreateSplitDto } from './dto/create-split.dto';

@Injectable()
export class SplitService {
  constructor(@InjectModel(Split.name) private splitModel: Model<Split>) { }

  async create(createSplitDto: CreateSplitDto): Promise<Split> {
    const createdSplit = new this.splitModel(createSplitDto);
    return createdSplit.save();
  }

  async findOneByName(name: string): Promise<Split | null> {
    const logger = new Logger('SplitService');
    const split = await this.splitModel.findOne({ name }).select(`days workouts`).exec();
    logger.log(split)
    return split 
  }  
}
