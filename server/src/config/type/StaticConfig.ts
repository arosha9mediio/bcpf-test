import BaseConfig from './BaseConfig';

export class StaticConfig extends BaseConfig {
  readonly name: string;
  readonly appleStoreUri: string;
  readonly googleStoreUri: string;
  readonly server: string;
  readonly front: string;
  readonly admin: string;
  readonly jsonServer: string;
  readonly adminEmail: string;
  readonly adminName: string;

  constructor(cfg) {
    super(cfg);
  }
}
