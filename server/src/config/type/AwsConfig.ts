import BaseConfig from './BaseConfig';

export class AwsConfig extends BaseConfig {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly region: string;
  readonly s3BaseBucket: string;
  readonly signedUrlExpireSeconds: number;
  constructor(cfg) {
    super(cfg);
  }
}
