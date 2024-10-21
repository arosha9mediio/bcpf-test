import { Scalar } from '@nestjs/graphql';
import { format } from 'date-fns';
import { GraphQLScalarType, Kind } from 'graphql';
import moment from 'moment';

@Scalar('Date', () => Date)
class CustomISOTimeScalar extends GraphQLScalarType {
  constructor() {
    super({
      name: 'CustomDateTime',
      description: 'custom DateTime scalar',
      parseValue(value: string): Date {
        return new Date(value);
      },
      serialize(value: Date): string {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
      },
      parseLiteral(ast): Date {
        if (ast.kind === Kind.STRING) return new Date(ast.value);
        return null;
      },
    });
  }
}

export const CustomDateTime = new CustomISOTimeScalar();
