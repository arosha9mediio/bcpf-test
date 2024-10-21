import BaseConfig from './BaseConfig';

export class EmailConfig extends BaseConfig {
  readonly email: string;
  readonly service: string;
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly pass: string;
  readonly options: {
    sender: string;
  };

  constructor(cfg) {
    super(cfg);
  }
}
