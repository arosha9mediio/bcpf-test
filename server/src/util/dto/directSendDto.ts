import { Field, InputType, OmitType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class ReceiverDto {
  @Field({ description: '수신자명', nullable: true })
  @IsString()
  name?: string;

  @Field({ description: '핸드폰 번호', nullable: true })
  @IsNumberString()
  mobile?: string;

  @Field({ description: '이메일 주소', nullable: true })
  @IsEmail()
  email?: string;
}

@InputType()
export class DirectSendSMSDto {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  message: string;

  @Field(() => [ReceiverDto])
  @ValidateNested()
  receiver: ReceiverDto[];
}

@InputType()
export class DirectSendEmailDto {
  @Field({ description: '제목' })
  @IsString()
  subject: string;

  @Field({ description: '내용', nullable: true })
  @IsString()
  @IsOptional()
  body: string;

  @Field({ description: '작성자이메일' })
  @IsString()
  sender?: string;

  @Field({ description: '작성자이름' })
  @IsString()
  senderName?: string;

  @Field(() => [ReceiverDto])
  @ValidateNested()
  receiver: ReceiverDto[];
}

@InputType()
export class ContactUsDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class ContactMediioDTO extends OmitType(ContactUsDto, ['name']) {
  @IsOptional()
  subject: string;
}
