import { ValidateBy, ValidationOptions, buildMessage } from 'class-validator';
import sanitizeHTML from 'sanitize-html';

export function SanitizeHTML(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'sanitizeHTML',
      validator: {
        validate: (value, args): boolean => validate(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '특수문자(- 제외)를 입력할 수 없습니다.',
          validationOptions
        ),
      },
    },
    validationOptions
  );
}

function validate(value: string): boolean {
  return value === sanitizeHTML(value);
}
