import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SplitModule } from './splits/split.module';
import { EntrieModule } from './entries/entrie.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:ylCOxBPFALjEnAmB@cluster0.nheezy3.mongodb.net/?retryWrites=true&w=majority'), UserModule, SplitModule ,AuthModule,EntrieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
