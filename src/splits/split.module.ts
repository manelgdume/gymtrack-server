import { Module } from '@nestjs/common';
import { SplitService } from './split.service';
import { SplitController } from './split.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Split, SplitSchema } from '../schemas/split.schema';
 
 
@Module({
  imports: [MongooseModule.forFeature([{ name: Split.name, schema: SplitSchema }])],
  controllers: [SplitController],
  providers: [SplitService ],
})
export class SplitModule {}
