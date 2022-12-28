import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    // validade client
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          // ignore uppercase and lowercase
          mode: 'insensitive',
          // allow register new user
          equals: username,
        },
      },
    });

    if (clientExist) {
      throw new Error('Client already exists');
    }

    const hashPassword = await hash(password, 10);

    // save client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}
