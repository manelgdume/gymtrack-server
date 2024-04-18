import { Module } from '@nestjs/common';
import { EntrieService } from './entrie.service';
import { EntrieController } from './entrie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Entrie, EntrieSchema } from '../schemas/entrie.schema';
 
 
@Module({
  imports: [MongooseModule.forFeature([{ name: Entrie.name, schema: EntrieSchema }])],
  controllers: [EntrieController],
  providers: [EntrieService ],
})
export class EntrieModule {}
