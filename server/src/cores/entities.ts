import { ObjectType, InputType, ID, Field } from '@nestjs/graphql';

@InputType('JsonFileTypeInput', { isAbstract: true })
@ObjectType()
export class JsonFileType {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  original?: string;

  @Field({ nullable: true })
  filename?: string;
}
