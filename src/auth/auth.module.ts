import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'; // Agrega esta importación
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtService], // Agrega JwtService aquí
  exports: [AuthService],
})
export class AuthModule {}
 