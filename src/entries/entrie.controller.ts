import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Logger, UseGuards } from '@nestjs/common';
import { EntrieService } from './entrie.service';
import { CreateEntrieDto } from './dto/create-entrie.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
@Controller('entrie')
export class EntrieController {
  constructor(
    private readonly entrieService: EntrieService,
    private readonly jwtService: JwtService,
  ) { }



  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createEntrieDto: CreateEntrieDto, @Req() req) {
    const logger = new Logger('SplitController');
    const token = req.headers.authorization.split(' ')[1]; // Obtener el token JWT
    const decodedToken = this.jwtService.decode(token); // Decodificar el token JWT
    const userEmail = decodedToken.sub; // Extraer el email del token decodificado
    createEntrieDto.email = userEmail
    try {
      await this.entrieService.create(createEntrieDto);
      return true;
    } catch (error) {
      logger.log(error);
      return false;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:date')
  async getByDate(@Param('date') date: string, @Req() req) {
    const logger = new Logger('SplitController');
    logger.log(req.headers.authorization.split(' ')[1])
    const token = req.headers.authorization.split(' ')[1];  
    const decodedToken = this.jwtService.decode(token); 
    const userEmail = decodedToken.sub;  
    try {
      return this.entrieService.findOneByDate(date , userEmail);
    } catch (error) {
      logger.log(error);
      return false;
    }
  }
}
