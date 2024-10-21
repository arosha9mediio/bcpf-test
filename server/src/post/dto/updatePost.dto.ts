import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreatePostDTO } from './createPost.dto';

@InputType()
export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @Field(() => ID)
  id: string;
}
