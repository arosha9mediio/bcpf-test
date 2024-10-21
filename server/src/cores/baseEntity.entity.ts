import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => Date, { description: '등록일자', nullable: true })
  @IsOptional()
  @IsDate()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Field(() => Date, { description: '수정일자', nullable: true })
  @IsOptional()
  @IsDate()
  @Column()
  updatedAt?: Date;
}
