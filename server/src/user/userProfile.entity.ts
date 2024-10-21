import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Max, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from './user.entity';

@ObjectType()
@Entity()
export class UserProfile {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Column({ type: 'datetime', nullable: true })
  birthday: Date;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'bit', nullable: true })
  gender: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  @MaxLength(255)
  @Column({ type: 'varchar', length: 255, nullable: true })
  other: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @MaxLength(20)
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    select: false,
    comment: '전화번호',
  })
  phone: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(50)
  @Column({ type: 'varchar', length: 50, nullable: true })
  nationality: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(50)
  @Column({ type: 'varchar', length: 50, nullable: true })
  language: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '프로파일 사진',
  })
  avatarPath: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string;

  @Field({ nullable: true })
  @MaxLength(50)
  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Field(() => ID)
  @IsNotEmpty()
  @Column({ type: 'bigint', unsigned: true, primary: true })
  userId: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 20, nullable: true })
  timezone: string;

  @OneToOne(() => User, (user) => user.UserProfile, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  User: User;
}
