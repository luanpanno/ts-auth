import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { env } from '../config/env';
import User from '../models/User';

class AuthController {
  public async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;
    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email,
      },
    });
  }
}

export default new AuthController();
