import assert from 'assert';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

describe('test for yml', function () {
  it('test', () => {
    const env = 'prod';
    let map: {} = {};
    const configs: any = yaml.loadAll(
      fs.readFileSync(__dirname + '/../../.application.yml', 'utf8')
    );

    for (const config of configs) {
      console.log('env >>>', config.env);
      if (!config.env || config.env === env) {
        map = _.merge(map, config);
      }
    }

    // @ts-ignore
    assert.strictEqual(map.env, env);
  });
});
