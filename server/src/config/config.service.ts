import { Injectable } from '@nestjs/common';
import fs from 'fs';
import yaml from 'js-yaml';
import * as _ from 'lodash';
import { DefaultNamingStrategy } from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';
import AuthConfig from './type/AuthConfig';
import { AwsConfig } from './type/AwsConfig';
import DBConfig from './type/DBConfig';
import { EmailConfig } from './type/EmailConfig';
import { OAuthConfig } from './type/OAuthConfig';
import { StaticConfig } from './type/StaticConfig';

class TypeOrmNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName ? userSpecifiedName : camelCase(targetName, true);
  }
}

@Injectable()
export class ConfigService {
  readonly env: string;
  readonly port: number;
  readonly db: DBConfig;
  readonly auth: AuthConfig;
  readonly static: StaticConfig;
  readonly email: EmailConfig;
  readonly oauth: OAuthConfig;
  readonly aws: AwsConfig;

  constructor() {
    const configs: Array<any> =
      yaml.loadAll(
        fs.readFileSync(__dirname + '/../../.application.yml', 'utf8')
      ) || [];
    let configMap: { [key: string]: any } = {};

    for (const config of configs) {
      const nodeEnv = process.env.NODE_ENV;

      if (!config.env || config.env === nodeEnv) {
        configMap = _.merge(configMap, config);
      }
    }

    this.port = configMap.port || 8080;
    this.db = new DBConfig(configMap.db);
    this.db.namingStrategy = new TypeOrmNamingStrategy();
    this.auth = new AuthConfig(configMap.auth);
    this.static = new StaticConfig(configMap.static);
    this.email = new EmailConfig(configMap.email);
    this.oauth = new OAuthConfig(configMap.oauth);
    this.aws = new AwsConfig(configMap.aws);
  }
}
