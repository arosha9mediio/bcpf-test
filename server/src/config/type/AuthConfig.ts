import BaseConfig from './BaseConfig';

export default class AuthConfig extends BaseConfig {
  readonly jwtSecret: string;
  readonly jwtExpiresIn: string;
  readonly aesSecretForResetPw: string;
  readonly tPass: string;
  readonly tVeriCode: string;
  readonly jwtExpiresInRefresh: string;

  constructor(cfg) {
    super(cfg);
  }
}
