import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        const isMatch = await bcrypt.compare(pass, user?.password)
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.username, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        }
    }
}