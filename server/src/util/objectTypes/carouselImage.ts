import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { EmbedFileType } from './embedFileType';

@InputType('CarouselImageType', { isAbstract: true })
@ObjectType()
export class CarouselImage {
  @Field(() => String, { nullable: true })
  @IsOptional()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  subTitle: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  link: string;

  @Field(() => EmbedFileType, { nullable: true })
  @IsOptional()
  images: EmbedFileType[];
}

@InputType('FeaturesType', { isAbstract: true })
@ObjectType()
export class Features extends EmbedFileType {
  @Field(() => String, { nullable: true })
  @IsOptional()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  subTitle: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  rank: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  breadcrumbs: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  linkTitle: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  link: string;
}
