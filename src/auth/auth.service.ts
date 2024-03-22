import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { jwtConstants } from './constants';
  
const logger = new Logger('AuthService');

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<string> {
        logger.log(pass + email);
        const user = await this.userService.findByEmail(email);
        if(user){
            const isMatch = await bcrypt.compare(pass, user.password)
            if (!isMatch) {
                return "invalid credentials"
            }
            const payload = { sub: user.email, username: user.username };
            return await this.jwtService.signAsync(payload, { secret: jwtConstants.secret, })    
        }
        else{
            return "invalid credentials"
        }      
    }
 
}