import BaseConfig from './BaseConfig';

export class OAuthConfig extends BaseConfig {
  readonly google: {
    clientId: string;
    clientSecret: string;
  };

  readonly facebook: {
    clientId: string;
    clientSecret: string;
  };

  constructor(cfg) {
    super(cfg);
  }
}
