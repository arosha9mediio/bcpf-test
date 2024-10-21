import { Injectable, StreamableFile } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

import { Credentials } from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Readable } from 'stream';

@Injectable()
export class AWSService {
  private access: Credentials;

  constructor(private readonly configService: ConfigService) {
    this.access = new Credentials({
      accessKeyId: configService.aws.accessKeyId,
      secretAccessKey: configService.aws.secretAccessKey,
    });
  }

  async deleteObjects(keys: string[]): Promise<string> {
    const s3 = new S3({
      credentials: this.access,
      region: this.configService.aws.region,
      signatureVersion: 'v4',
    });

    const params = {
      Bucket: this.configService.aws.s3BaseBucket,
      Delete: {
        // required
        Objects: keys.map((key) => ({ Key: key })),
      },
    };

    const a: any = s3.deleteObjects(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data); // successful response
    });

    return 'ok';
  }

  async createPresignedPost(
    type: string,
    path: string | null,
    isProtected: boolean
  ): Promise<string> {
    let uploadPath = '';
    const avTypes = ['content', 'files', 'images', 'previews','videos'];
    if (type === 'avatar') {
      uploadPath = type;
    } else if (type === 'BizCertificateUrl') {
      uploadPath = type;
    } else if (type === 'challenge') {
      uploadPath = type;
    } else if (type === 'application') {
      uploadPath = `contest/applier-files/${path}`;
    } else if (avTypes.includes(type)) {
      uploadPath = `cms/${type}`;
    } else {
      uploadPath = 'tmp';
    }
    const s3 = new S3({
      credentials: this.access,
      region: this.configService.aws.region,
      signatureVersion: 'v4',
    });

    const pathPrefix = isProtected ? 'statics/protected/' : 'statics/web/';

    const data = await s3.createPresignedPost({
      Bucket: `${this.configService.aws.s3BaseBucket}`,
      Fields: {
        Key: `${pathPrefix}${uploadPath}/${uuid()}`,
      },
      Expires: this.configService.aws.signedUrlExpireSeconds,
      Conditions: [
        ['content-length-range', 1000, 10000000], // content length restrictions: 0-1MB
        ['starts-with', '$Content-Type', ''], // content type restriction
        // ['eq', '$x-amz-meta-userid', userid], // tag with userid <= the user can see this!
      ],
      // Conditions: [['starts-with', '$Content-Type', '']],
    });

    return JSON.stringify(data);
  }

  async copyObject(from: string, to: string): Promise<string> {
    const s3 = new S3({
      credentials: this.access,
      region: this.configService.aws.region,
      signatureVersion: 'v4',
    });
    const params = {
      Bucket: `${this.configService.aws.s3BaseBucket}`,
      CopySource: `${this.configService.aws.s3BaseBucket}` + '/' + from,
      Key: to,
    };
    s3.copyObject(params, function (copyErr, copyData) {
      if (copyErr) {
        console.log('\n\n\n\nerror ', copyErr);
      }
    });
    return to;
  }

  async generatePresignedPost(
    key: string,
    contentType: string
  ): Promise<PresignedUrlResponse> {
    const s3 = new S3({
      credentials: this.access,
      region: this.configService.aws.region,
      signatureVersion: 'v4',
    });

    const params: S3.PresignedPost.Params = {
      Bucket: this.configService.aws.s3BaseBucket,
      Fields: {
        key,
        'Content-Type': contentType,
      },
      Expires: this.configService.aws.signedUrlExpireSeconds,
    };

    return new Promise<PresignedUrlResponse>((resolve, reject) => {
      s3.createPresignedPost(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        const response: PresignedUrlResponse = {
          url: data.url,
          fields: data.fields,
        };
        return resolve(response);
      });
    });
  }

  // async getFile(bucket: string, key: string): Promise<S3.GetObjectOutput> {
  //   try {
  //     const params = {
  //       Bucket: bucket,
  //       Key: key,
  //     };

  //     const s3 = new S3({
  //       credentials: this.access,
  //       region: this.configService.aws.region,
  //       signatureVersion: 'v4',
  //     });

  //     const data = await s3.getObject(params).promise();
  //     return data;
  //   } catch (error) {
  //     console.error(`Failed to get file from S3: ${error.message}`);
  //     throw error;
  //   }
  // }

  async getFileStream(
    bucket: string,
    link: string,
    filename: string
  ): Promise<FileStreamResponse> {
    try {
      const params = {
        Bucket: bucket,
        Key: link,
      };

      const s3 = new S3({
        credentials: this.access,
        region: this.configService.aws.region,
        signatureVersion: 'v4',
      });

      const headResult = await s3.headObject(params).promise();
      const contentType = headResult.ContentType || 'application/octet-stream';

      const s3Stream = s3.getObject(params).createReadStream();

      return {
        // stream: new StreamableFile(s3Stream),
        stream: s3Stream,
        fileName: `${filename}`,
        contentType,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

@ObjectType()
export class PresignedUrlResponse {
  @Field(() => String)
  url: string;

  @Field(() => GraphQLJSONObject)
  fields: any;
}

type FileStreamResponse = {
  stream: Readable;
  fileName: string;
  contentType: string;
};
