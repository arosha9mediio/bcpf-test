import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import moment from 'moment';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    console.log('parseValue' + value);
    return new Date(value); // value from the client
  }

  serialize(value: Date): string {
    return moment(value).format('YYYY-MM-DD HH:mm:ss'); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    console.log('parseLiteral' + ast);
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    // UDEV Just incase app sends string
    else if (ast.kind == Kind.STRING) {
      try {
        return new Date(ast.value);
      } catch (e) {
        console.log(e);
        return null;
      }
    }
    return null;
  }
}
