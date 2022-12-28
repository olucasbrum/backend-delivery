import { Request, Response } from 'express';
import { FindAllDeliveriresDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase';

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;

    const findAllDeliveriresDeliverymanUseCase = new FindAllDeliveriresDeliverymanUseCase();
    const deliveries = await findAllDeliveriresDeliverymanUseCase.execute(id_deliveryman);

    return response.json(deliveries);
  }
}
