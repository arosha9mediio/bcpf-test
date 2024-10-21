import { DefaultNamingStrategy } from 'typeorm';
import { Logger } from 'typeorm/logger/Logger';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import BaseConfig from './BaseConfig';

export default class DBConfig extends BaseConfig {
  readonly type: 'mysql' | 'mariadb';
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly entities: string[];
  readonly synchronize: boolean;
  readonly logging: LoggerOptions;
  readonly logger:
    | 'advanced-console'
    | 'simple-console'
    | 'file'
    | 'debug'
    | Logger;
  // If query execution time exceed this given max execution time (in milliseconds) then logger will log this query.
  readonly maxQueryExecutionTime: number;
  readonly autoLoadEntities: boolean;
  namingStrategy: DefaultNamingStrategy;
  readonly entityPrefix: string;

  constructor(cfg) {
    super(cfg);
  }
}
