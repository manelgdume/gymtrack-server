import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Logger, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createDecipheriv } from 'crypto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let user = await this.userService.findByEmail(createUserDto.email);
    console.log(user)
    if (await this.userService.findByEmail(createUserDto.email) == null) {
      try {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(createUserDto.password, salt)
        createUserDto.password = password;
        createUserDto.firstDay = "m"
        createUserDto.workout = "ppl"
        console.log(createUserDto)
        await this.userService.create(createUserDto);
        return "User created";
      } catch (error) {
        console.log("Error creating user" + error)
        return "Error creating user";
      }
    }
    else {
      return "This email already exist";
    }
  }
  /*
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(+id);
    }
  */
  @UseGuards(AuthGuard)
  @Get()
  findOneByEmail(@Req() request: Request) {
    const logger = new Logger('UserController');
    const user = request['user'];
    logger.log(user);
    return this.userService.findByEmail(user.sub);
  }
  @UseGuards(AuthGuard)
  @Post('/changeSplit')
  async changeSplit(@Body() data: any, @Req() req) {
    const logger = new Logger('UserController');
    const token = req.headers.authorization.split(' ')[1];  
    const decodedToken = this.jwtService.decode(token); 
    const userEmail = decodedToken.sub;  
    try {
      await this.userService.updateSplit(userEmail,data.split)
      return true;
    } catch (error) {
      logger.log(error);
      return false;
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
