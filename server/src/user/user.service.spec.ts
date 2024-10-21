import { JwtService } from '@nestjs/jwt';
import * as assert from 'assert';
import bcrypt from 'bcryptjs';
import { _app } from '../main';

beforeAll(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
});

describe('test for user service', function () {
  it('should be generated jwt token', function () {
    const jwtService = _app.get(JwtService);
    const jwtToken = jwtService.sign({
      username: 'lvtlvt',
      sub: '1',
    });

    assert.ok(jwtToken);

    console.log(jwtToken);
  });

  it('bcrypt compareSync should return true', function () {
    const plainPw = '12345678';
    const hashPw = bcrypt.hashSync(plainPw, 12);
    assert.ok(bcrypt.compareSync(plainPw, hashPw));
  });
});
