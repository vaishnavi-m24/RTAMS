// custom.d.ts
import * as express from 'express';
import {User} from './users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
