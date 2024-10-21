import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../entites/post.entity';

@ObjectType()
export class AdjacentResponse {
  @Field(() => Post, { nullable: true })
  previous?: Partial<Post>;

  @Field(() => Post, { nullable: true })
  next?: Partial<Post>;
}
