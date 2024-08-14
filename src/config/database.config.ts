import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'vaishnavi24',
  database: 'rtams',
  autoLoadModels: true,
  synchronize: true,
};
