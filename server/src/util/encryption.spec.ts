import assert from 'assert';
import crypto from 'crypto';
import { decrypt, encrypt } from './encryption';

describe('test for encryption', function () {
  it('mediio should be awesome', () => {
    const MEDIIO_IS_AWESOME = 'mediio is awesome';
    const MEDIIO_IS_NOT_AWESOME = 'mediio is not awesome';

    const encrypted = encrypt(MEDIIO_IS_AWESOME, 'reset password');
    const decrypted = decrypt(encrypted, 'reset password');

    assert.strictEqual(decrypted, MEDIIO_IS_AWESOME);
    assert.notStrictEqual(decrypted, MEDIIO_IS_NOT_AWESOME);
  });

  it('token should be same both sender and receiver', () => {
    const token = crypto.pseudoRandomBytes(20).toString('hex');

    const user = {
      id: 123,
      token,
    };

    const encrypted = encrypt(JSON.stringify(user), 'resetPassword');
    const decrypted = decrypt(encrypted, 'resetPassword');
    const decryptedUser = JSON.parse(decrypted);

    assert.deepStrictEqual(user.id, decryptedUser.id);
    assert.deepStrictEqual(user.token, decryptedUser.token);
  });
});
