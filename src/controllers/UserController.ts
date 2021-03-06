import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
  public async index(req: Request, res: Response) {
    const repository = getRepository(User);
    const users = await repository.find();

    return res.json(
      users.map((x) => ({ id: x.id, name: x.name, email: x.email }))
    );
  }

  public async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const repository = getRepository(User);
    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ name, email, password });

    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
