import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DonationType {
  EXPENDITURE = 1,
  INCOME = 2,
}

@Entity('donation', { schema: 'bcpf-2024-dev' })
@InputType('DonationInputType', { isAbstract: true })
@ObjectType()
export class Donation {
  @Field(() => ID)
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Field(() => Number)
  @IsOptional()
  @IsInt()
  @Column('tinyint', {
    name: 'type',
    comment: '기부금 타입(1 - 기부금 내역, 2 - 기부금 사용 내역)',
    unsigned: true,
    default: () => "'1'",
  })
  type: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'year', comment: '기부한 년', length: 4 })
  year: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'month', comment: '기부한 월', length: 100 })
  month: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'names', comment: '기부자', length: 200 })
  names: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'price', nullable: true, length: 255 })
  price: string | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Column('int', { name: 'sort', nullable: true })
  sort: number | null;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  @Column('int', {
    name: 'statusId',
    comment: '상태',
    unsigned: true,
    default: () => "'0'",
  })
  statusId: number; // ! what are the donation statusus?

  @Field(() => Date, { nullable: true })
  @IsOptional()
  // @Column('int', {
  //   name: 'createdAt',
  //   comment: '등록일자',
  //   unsigned: true,
  //   default: () => "'0'",
  // })
  @CreateDateColumn({ type: 'datetime', nullable: true })
  createdAt: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  // @Column('int', {
  //   name: 'updatedAt',
  //   comment: '갱신일자',
  //   unsigned: true,
  //   default: () => "'0'",
  // })
  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt: string;
}
