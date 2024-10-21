export class CodeAndMsg {
  CODE: number;
  MESSAGE: string;
}

export class ErrorCode {
  static readonly SUCCESS: CodeAndMsg = { CODE: 0, MESSAGE: 'success' };
  static readonly ERROR: CodeAndMsg = {
    CODE: 1,
    MESSAGE: '알수없는 오류가 발생하였습니다. 관리자에게 문의해 주세요',
  };
  static readonly ParamsError: CodeAndMsg = {
    CODE: 2,
    MESSAGE: '필요한 입력정보가 없습니다',
  };

  static readonly Forbidden: CodeAndMsg = {
    CODE: 403,
    MESSAGE: '이용할 수 없는 기능입니다',
  };
  static readonly NotFound: CodeAndMsg = {
    CODE: 404,
    MESSAGE: '데이터가 없습니다',
  };

  static readonly LoginError: CodeAndMsg = {
    CODE: 1000,
    MESSAGE: '이메일과 비밀번호를 바르게 입력해 주세요',
  };
  static readonly LoginTimeout: CodeAndMsg = {
    CODE: 1001,
    MESSAGE: '로그아웃되었습니다',
  };
  static readonly InActive: CodeAndMsg = {
    CODE: 1002,
    MESSAGE: '비활성화된 계정입니다',
  };

  static readonly TokenError: CodeAndMsg = {
    CODE: 1003,
    MESSAGE: '로그인정보가 올바르지 않습니다[토큰정보불일치]',
  };
  static readonly Frozen: CodeAndMsg = {
    CODE: 1004,
    MESSAGE: '사용이 중지된 계정입니다.',
  };

  static readonly InvalidUserName: CodeAndMsg = {
    CODE: 1005,
    MESSAGE: '아이디와 비밀번호를 바르게 입력해 주세요',
  };

  static readonly InvalidPhone: CodeAndMsg = {
    CODE: 1006,
    MESSAGE: '전화번호를 바르게 입력해 주세요',
  };
  static readonly InvalidCaptcha: CodeAndMsg = {
    CODE: 1007,
    MESSAGE: '인증코드가 바르지 않습니다. 다시한번 입력해 주세요',
  };

  static readonly InvalidPassword: CodeAndMsg = {
    CODE: 1008,
    MESSAGE: '비밀번호를 바르게 입력해 주세요',
  };

  static readonly InvalidExistPassword: CodeAndMsg = {
    CODE: 1012,
    MESSAGE: '이미 사용한적있는 비밀번호입니다. 새로운 비밀번호를 입력해주세요',
  };

  static readonly EmailExists: CodeAndMsg = {
    CODE: 1009,
    MESSAGE: '이미 사용중인 이메일입니다',
  };
  static readonly PhoneExists: CodeAndMsg = {
    CODE: 1010,
    MESSAGE: '이미 사용중인 전화번호입니다',
  };

  static CodeToMessage(code: number): string {
    for (const key of Object.keys(this)) {
      if (this[key].CODE === code) {
        return this[key].MESSAGE;
      }
    }
    return '';
  }

  static HasCode(code: number): boolean {
    for (const key of Object.keys(this)) {
      if (this[key].CODE === code) {
        return true;
      }
    }
    return false;
  }
}
