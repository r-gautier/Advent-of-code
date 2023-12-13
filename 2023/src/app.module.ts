import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule],
})
export class AppModule {}
