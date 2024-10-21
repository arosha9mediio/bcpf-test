import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

export type RefType = 'POST';

@ObjectType()
@Entity()
export class Like {
  static readonly RefType = {
    Post: 'POST' as RefType,
  };

  @Field(() => ID)
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Field()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 10 })
  refType: RefType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  refId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @Column({ type: 'bigint', unsigned: true })
  createdBy: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.Likes, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({
    name: 'createdBy',
  })
  User: User;

  // @Field(() => [Post])
  // @JoinColumn({ name: 'refId', referencedColumnName: 'id' })
  // Posts: Array<Post>;
}
