import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Post } from './post.entity';

@InputType('PostCategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PostCategory {
  @Field(() => ID, { description: '번호' })
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ type: 'tinyint', unsigned: true, comment: '번호' })
  id: string;

  @Field(() => String, { description: '제목' })
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 1000, comment: '제목' })
  title: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.Category)
  Posts: Array<Post>;
}
