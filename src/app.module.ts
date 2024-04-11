import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from 'src/entities';
import { CommonModule } from './common/common.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './users/user.module';
import { StrategiesModule } from './strategies/strategies.module';
import { UniversitiesModule } from './universities/universities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: Object.values(entities),
      ssl: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SCERET
    }),
    CommonModule,
    AuthenticationModule,
    UserModule,
    StrategiesModule,
    UniversitiesModule
  ]
})
export class AppModule {}
