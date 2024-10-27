import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async updateUser(userId: string, data: UpdateUserDTO) {
    const { ...rest } = data;

    const user = await this.db.user.update({
      where: { id: userId },
      data: { ...rest },
    });

    if (!user) {
      throw new ConflictException('Usuário não foi encontrado!');
    }
    return user;
  }

  async createUser(data: CreateUserDTO) {
    console.log('Dados recebidos para criar usuário:', data);
    const existingUser = await this.db.user.findFirst({
      where: { email: data.email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('Este e-mail já está vinculado a um usuário');
    }

    const createdUser = await this.db.user.create({
      data: {
        name: data.name,
        email: data.email,
        authProviderId: data.authProviderId, // Verifique se este valor é correto
      },
      select: { id: true, name: true, email: true },
    });

    return createdUser;
  }
}
