import { z } from "zod";

// Define custom error messages
export const customMessages = {
  invalid_type_error: "형식이 바르지 않습니다.",
  required_error: "알맞은 내용을 입력해 주세요",
};

export const zodLocale = {
  invalid_type_error: "형식이 바르지 않습니다.",
  required_error: "알맞은 내용을 입력해 주세요",
  oneOf: "다음 값들 중 하나를 선택해주세요. ${values}",
  notOneOf: "다음 중 하나여야 합니다. : ${values}",
  notType: (type, value) => {
    if (type === "number") {
      return "숫자를 입력해 주세요.";
    } else if (type === "string") {
      return "알맞은 내용을 입력해 주세요.";
    } else if (type === "array") {
      return "표시된 항목에서 원하는 항목을 선택해 주세요.";
    } else if (type === "date") {
      return "원하는 날짜를 선택해 주세요.";
    }
    return "형식이 바르지 않습니다.";
  },
  defined: "정의되지 않았습니다.",
  string: {
    length: "정확히 ${length} 글자를 입력해 주세요.",
    min: "${min} 글자 이상 입력해 주세요.",
    max: "최대 ${path} 글자까지만 입력할 수 있습니다.",
    matches: '다음과 같은 형식으로 입력해주세요 : "010-XXXX-XXXX"',
    email: "이메일 주소를 확인해 주세요.",
    url: "인터넷 주소 형식으로 입력해주세요.",
    uuid: "${path} must be a valid UUID",
    trim: "앞뒤 공백을 제거해 주세요.",
    lowercase: "소문자로 입력해 주세요.",
    uppercase: "대문자로 입력해 주세요.",
  },
  number: {
    required: "알맞은 값을 입력해 주세요",
    min: "${min} 보다 크거나 같은값을 입력해 주세요.",
    max: "${max} 보다 작거나 같은값을 입력해 주세요.",
    lessThan: "${less} 보다 작은값을 입력해 주세요.",
    moreThan: "${more} 보다 큰값을 입력해 주세요.",
    notEqual: "${notEqual}와 같은 값을 입력해 주세요.",
    positive: "0 보다 큰수를 입력해 주세요.",
    negative: "0 보다 작은수를 입력해 주세요.",
    integer: "숫자를 입력해 주세요.",
  },
  array: {
    min: "${min}개 이상 선택해 주세요.",
    max: "최대 ${max}개 까지 입력이 가능합니다.",
  },
};

// Custom methods
export const rePhone = /^(01[016789])-?[0-9]{3,4}-?[0-9]{4}$/;
export const regPassword =
  /^(?=(.*[A-Za-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,12}$/;

export const phone = (message = zodLocale.string.matches) =>
  z.string().regex(rePhone, message);

export const password = (message = zodLocale.string.matches) =>
  z.string().regex(regPassword, message);

export const booleanTrue = (message = customMessages.required_error) =>
  z.boolean().refine(val => val, { message });

export const either = (ref, message = customMessages.required_error) =>
  z.union([z.any(), ref]).refine(val => val !== undefined, { message });

export const decimal = (message = customMessages.invalid_type_error) =>
  z.string().refine(val => /^\d*\.{1}\d*$/.test(val), { message });

export const allowNull = schema =>
  schema.nullable().transform((value, ctx) => {
    if (typeof value === "number") return value;
    if (
      typeof value === "string" &&
      (value.trim() === "" || value.trim() === "*")
    ) {
      return null;
    }
    return value;
  });
