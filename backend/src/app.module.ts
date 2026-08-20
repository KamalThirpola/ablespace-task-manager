import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH ?? 'ablespace.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
