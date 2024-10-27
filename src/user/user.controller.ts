import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Render,
} from '@nestjs/common';

import { UserService } from './user.service';
import {
  createUser,
  UpdateUserRequest,
  updateUserRequest,
} from './validation/schema';
import { ZodPipe } from 'src/shared/pipes/zod.pipes';
import { CreateUserDTO } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/403')
  @Render('403') // Supondo que você esteja usando um sistema de template
  get403() {
    return { message: 'Acesso Negado! Você não está registrado no sistema.' };
  }

  @Post()
  async createUser(
    @Body(new ZodPipe(createUser))
    body: CreateUserDTO,
  ) {
    const user = await this.userService.createUser(body);
    return user;
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body(new ZodPipe(updateUserRequest))
    body: UpdateUserRequest,
  ) {
    const updateUser = await this.userService.updateUser(userId, body);
    if (!updateUser) {
      throw new InternalServerErrorException('Usuario não encontrado');
    }
    return updateUser;
  }
}
