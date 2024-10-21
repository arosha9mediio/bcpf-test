import CryptoJs from 'crypto-js';
import Hashids from 'hashids';

const KEY_SIZE = 256;
const ITERATIONS = 100;

/**
 * @param {string} msg
 * @param {string} pass
 */
export function encrypt(msg: string, pass: string): string {
  const salt = CryptoJs.lib.WordArray.random(128 / 8);

  const key = CryptoJs.PBKDF2(pass, salt, {
    keySize: KEY_SIZE / 32,
    iterations: ITERATIONS,
  });

  const iv = CryptoJs.lib.WordArray.random(128 / 8);

  const encrypted = CryptoJs.AES.encrypt(msg, key, {
    iv,
    padding: CryptoJs.pad.Pkcs7,
    mode: CryptoJs.mode.CBC,
  });

  return Buffer.from(
    salt.toString() + iv.toString() + encrypted.toString(),
    'utf8'
  ).toString('base64');
}

/**
 *
 * @param {string} msg
 * @param {string} pass
 * @returns {string}
 */
export function decrypt(msg: string, pass: string): string {
  const utf8Msg = Buffer.from(msg, 'base64').toString('utf8');

  const salt = CryptoJs.enc.Hex.parse(utf8Msg.substr(0, 32));
  const iv = CryptoJs.enc.Hex.parse(utf8Msg.substr(32, 32));
  const encrypted = utf8Msg.substring(64);

  const key = CryptoJs.PBKDF2(pass, salt, {
    keySize: KEY_SIZE / 32,
    iterations: ITERATIONS,
  });

  return CryptoJs.AES.decrypt(encrypted, key, {
    iv,
    padding: CryptoJs.pad.Pkcs7,
    mode: CryptoJs.mode.CBC,
  }).toString(CryptoJs.enc.Utf8);
}

/**
 *
 * @param {string} msg
 * @param {string} pass
 * @returns {string}
 */
export function hashIds(value: any): string {
  const hashids = new Hashids(
    /* salt: */ '🌸💮🏵️🌹🥀🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿☘️🍀🍁🍂🍃🍄',
    /* minLength: */ 12,
    /* alphabet: */ 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    /* these chars can't be next to one another: */ ''
  );

  let result: string;

  try {
    if (!isNaN(value)) {
      result = hashids.encode([parseInt(value)]);
    } else {
      result = hashids.decode(value).toString();
    }
  } catch (e) {
    return value;
  }
  return result;
}

export function godoPass(value: string): string {
  console.log('godoPass >>>', value, `!Q${hashIds(value)}`.substring(0, 10));
  return `!Q${hashIds(value)}`.substring(0, 10);
}

export function encGodoMemNo(num: number): number {
  // $.throw('고도몰 파트너번호가 없습니다.');
  const mil = new Date().getMilliseconds() + 1000;
  const encNum = Number(`${mil}${num * mil}`);
  return encNum;
}

export function decGodoMemNo(encNum: number): number {
  const strNum = String(encNum);
  const arrNum = strNum.split('');
  const pre = Number(arrNum.slice(0, 4).join(''));
  const multiplied = Number(arrNum.slice(4).join(''));
  return multiplied / pre;
}
