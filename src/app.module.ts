import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow('DB_HOST'),
        database: configService.getOrThrow('DB_NAME'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        port: +configService.getOrThrow<number>('DB_PORT'),
        autoLoadEntities: true,
        synchronize: true,
        
      }),
      inject: [ConfigService],

    }),
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
