import { Global, Module } from '@nestjs/common';
import { LocalFileReader } from './fileReader/local.fileReader';
import { FILE_READER_TOKEN } from './fileReader/fileReader.interface';

@Global()
@Module({
  providers: [{ provide: FILE_READER_TOKEN, useClass: LocalFileReader }],
  exports: [FILE_READER_TOKEN],
})
export class InfrastructureModule {}
