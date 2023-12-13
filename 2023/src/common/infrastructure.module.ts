import { Global, Module } from '@nestjs/common';
import { LocalFileReader } from './fileReader/local.fileReader';
import { FILE_READER_TOKEN } from './fileReader/fileReader.interface';
import { SingleColumnParser } from './parsers/singleColumn.parser';

@Global()
@Module({
  providers: [
    { provide: FILE_READER_TOKEN, useClass: LocalFileReader },
    SingleColumnParser,
  ],
  exports: [FILE_READER_TOKEN, SingleColumnParser],
})
export class InfrastructureModule {}
