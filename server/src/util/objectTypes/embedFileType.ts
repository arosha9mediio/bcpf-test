import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { SanitizeHTML } from '../../cores/decorators/sanitize.decorator';

export enum FileType {
  IMAGE,
  DOC,
  THUMBNAIL,
  VIDEO
}

registerEnumType(FileType, {
  name: 'FileType',
});

@InputType('EmbedFileTypeInput', { isAbstract: true })
@ObjectType()
export class EmbedFileType {
  @Field(() => String, { description: 'file URL' })
  @IsNotEmpty()
  @IsString()
  // @SanitizeHTML()
  url: string;

  @Field(() => String, { description: 'file name' })
  @IsNotEmpty()
  @IsString()
  // @SanitizeHTML()
  filename: string;

  @Field(() => FileType, {
    description: 'file type',
  })
  @IsNotEmpty()
  @IsEnum(FileType)
  type: FileType;
}

@InputType('EmbedApplicantFileTypeInput', { isAbstract: true })
@ObjectType()
export class EmbedApplyFileType extends EmbedFileType {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  key: string;
}
