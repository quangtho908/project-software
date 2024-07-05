import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './users/user.module';
import { StrategiesModule } from './strategies/strategies.module';
import { UniversitiesModule } from './universities/universities.module';
import { ApplicantsModule } from './applicants/applicants.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SCERET
    }),
    CommonModule,
    AuthenticationModule,
    UserModule,
    StrategiesModule,
    UniversitiesModule,
    ApplicantsModule
  ]
})
export class AppModule {}
