import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// for main navs
@InputType('NavigationType', { isAbstract: true })
@ObjectType()
export class Navigation {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  main: string;

  @Field(() => [SubNavigation], { nullable: true })
  @IsOptional()
  @IsString()
  sub: SubNavigation[];
}

// for sub navs
// @InputType()
@ObjectType()
export class SubNavigation {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  href: string;
}
