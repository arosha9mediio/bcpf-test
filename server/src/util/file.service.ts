import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import archiver from 'archiver';

import { AWSService } from './aws.service';
import { ConfigService } from '../config/config.service';
import { ContestApply } from '../application/application.entity';

@Injectable()
export class FileService {
  constructor(
    private readonly awsS3Service: AWSService,
    private readonly configService: ConfigService
  ) {}

  async createApplicationZip(links: ContestApply[]): Promise<Readable> {
    const bucket = this.configService.aws.s3BaseBucket;

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.on('error', (error) => {
      throw error;
    });

    // todo: download by contest folders or way to download multiple files
    // for (const link of links) {
    //   const fileStream = await this.awsS3Service.getFileStream(
    //     bucket,
    //     link.file[0].url,
    //     link.file[0].filename
    //   );
    //   archive.append(fileStream.stream, {
    //     name: `${link.applyNumber}-${link.applier1Name}`,
    //   });
    // }

    // parallel streams ?
    const res = await Promise.allSettled(
      links.map(async (link) => {
        const fileName = link.file[0].filename;
        const fileStream = await this.awsS3Service.getFileStream(
          bucket,
          link.file[0].url,
          fileName
        );

        // const contentType =
        //   fileStream.contentType || 'application/octet-stream';
        // const fileExtension = contentType.split('/')[1] || 'bin'; // is this okay for fallback?

        return {
          stream: fileStream.stream,
          name: fileName,
        };
      })
    );

    // Filter out rejected promises and null results
    const fileStreams = res
      .filter(
        (result) => result.status === 'fulfilled' && result.value !== null
      )
      .map(
        (result: PromiseFulfilledResult<{ stream: Readable; name: string }>) =>
          result.value
      );

    for (const { stream, name } of fileStreams) {
      archive.append(stream, { name });
    }

    await archive.finalize();

    return archive;
  }
}
