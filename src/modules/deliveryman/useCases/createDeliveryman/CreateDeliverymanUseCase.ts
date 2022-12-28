import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          // ignore uppercase and lowercase
          mode: 'insensitive',
          // allow register new user
          equals: username,
        },
      },
    });

    if (deliverymanExist) {
      throw new Error('Deliveryman already exists');
    }

    const hashPassword = await hash(password, 10);

    // save deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliveryman;
  }
}
