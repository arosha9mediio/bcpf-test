import { Field, Int, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { User } from '../../user/user.entity';
import { PostCategory } from './postCategory.entity';
import { EmbedFileType } from '../../util/objectTypes/embedFileType';

export enum PostType {
  main = 1,
  reply = 2,
  comment = 3,
}

// todo: remove noticeType when updated
export enum NoticeType {
  normal = 0,
  draft = 1,
}

export const ttl = 300 * 1000;

@InputType('PostInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'Post' })
export class Post {
  @Field(() => ID, { description: '번호' })
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '번호' })
  id: string;

  @Field(() => ID, { description: '카테고리' })
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'tinyint', unsigned: true, comment: '카테고리' })
  categoryId: string;

  @Field(() => ID, { description: '주제글번호', nullable: true })
  @IsOptional()
  @IsString()
  @Column({
    type: 'bigint',
    unsigned: true,
    comment: '주제글번호',
    nullable: true,
  })
  topicId: string;

  @Field(() => Int, { description: '글종류', nullable: true })
  @IsEnum(PostType, {
    message: '중복확인 불가 값입니다.\n(Check type value it can be checked)',
  })
  @IsOptional()
  @IsInt()
  @Column({ type: 'tinyint', default: 1, comment: '글종류' })
  type: number;

  @Field(() => Int, { description: '정렬', nullable: true })
  @IsOptional()
  @IsInt()
  @Column({ type: 'tinyint', default: 0, comment: '정렬' })
  sort: number;

  @Field(() => String, { description: '제목' })
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 1000, comment: '제목' })
  title: string;

  @Field(() => String, { description: 'sub title', nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', length: 1000, comment: 'sub title' })
  subTitle: string;

  @Field(() => String, { description: 'description', nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', length: 2000, comment: 'description' })
  description: string;

  @Field(() => String, { description: 'slug', nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', length: 1000, comment: 'slug' })
  slug: string;

  @Field(() => String, { description: 'keywords for page', nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', length: 1000, comment: 'keywords for page' })
  keywords: string;

  @Field(() => String, {
    description: 'meta description for page',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Column({
    type: 'varchar',
    length: 1000,
    comment: 'meta description for page',
  })
  metaDescription: string;

  @Field(() => String, { description: '미리보기', nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'text', nullable: true, comment: '미리보기' })
  preview: string | null;

  @Field(() => String, { description: '내용', nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'text', nullable: true, comment: '내용' })
  body: string | null;

  @Field(() => Int, { description: '상태', nullable: true })
  @IsOptional()
  @IsEnum(NoticeType)
  @Column({
    type: 'enum',
    enum: NoticeType,
    default: NoticeType.normal,
    comment: '',
  })
  noticeType: NoticeType;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  @Column({ type: 'boolean', nullable: true })
  publishStatus: boolean;

  @Field(() => Int, { description: '좋아요', nullable: true })
  @IsOptional()
  @IsInt()
  @Column({ type: 'bigint', unsigned: true, default: 0, comment: '좋아요' })
  likeCount: number;

  @Field(() => Int, { description: '신고횟수', nullable: true })
  @IsOptional()
  @IsInt()
  @Column({ type: 'bigint', unsigned: true, default: 0, comment: '신고횟수' })
  reportCount: number;

  @Field(() => Int, { description: '답글갯수', nullable: true })
  @IsOptional()
  @IsInt()
  @Column({ type: 'bigint', unsigned: true, default: 0, comment: '답글갯수' })
  commentCount: number;

  @Field(() => Int, { description: '조회수', nullable: true })
  @IsOptional()
  @IsInt()
  @Column({ type: 'bigint', unsigned: true, default: 1, comment: '조회수' })
  views: number;

  @Field(() => Int, { description: '상단고정', nullable: true })
  @IsOptional()
  @IsInt()
  @Column({ type: 'tinyint', default: 1, comment: '상단고정' })
  pin: number;

  @Field(() => Date, { description: '게시시작일', nullable: true })
  @IsOptional()
  @IsDate()
  @Column({ type: 'datetime', nullable: true, comment: '개시시작' })
  publishedAt: string | null;

  @Field(() => Date, { description: '게시종료일', nullable: true })
  @IsOptional()
  @IsDate()
  @Column({ type: 'datetime', nullable: true, comment: '개시종료' })
  unpublishedAt: string | null;

  @Field(() => ID, { description: '작성자' })
  @IsOptional()
  @Column({ type: 'bigint', unsigned: true, comment: '작성자' })
  createdBy: string;

  @Field(() => Date, { description: '등록날짜', nullable: true })
  @IsOptional()
  @IsDate()
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '등록날짜',
  })
  createdAt: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '태그' })
  tags: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', length: 20, nullable: true, comment: 'language' })
  language: string | null;

  @Field(() => ID, { description: '별점', nullable: true })
  @IsOptional()
  @IsDecimal()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    default: 0.0,
    comment: '별점',
  })
  rating: string;

  @Field(() => ID, { description: '참조번호', nullable: true })
  @IsOptional()
  @IsString()
  @Column({ type: 'bigint', unsigned: true, comment: '참조번호' })
  refId: string;

  @Field(() => [EmbedFileType], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EmbedFileType)
  @Column({ type: 'json', nullable: true, default: '' })
  file: EmbedFileType[];

  // @Field(() => ID, { description: 'contest Id', nullable: true })
  // @IsOptional()
  // @IsString()
  // @Column({ type: 'int', unsigned: true, comment: 'contest id' })
  // contestId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.Posts)
  @JoinColumn({ name: 'createdBy' })
  User: User;

  @Field(() => PostCategory)
  @ManyToOne(() => PostCategory, (category) => category.Posts)
  @JoinColumn({ name: 'categoryId' })
  Category: PostCategory;

  // @Field(() => Contest, { nullable: true })
  // @ManyToOne(() => Contest)
  // @JoinColumn({ name: 'contestId' })
  // Contest: Contest;

  // @Field(() => [Post], { nullable: true })
  // @OneToMany(() => Post, (post) => post.MainPost)
  // SubPosts: Array<Post>;

  // @Field(() => Post, { nullable: true })
  // @ManyToOne(() => Post, (post) => post.SubPosts)
  // @JoinColumn({
  //   name: 'topicId',
  //   referencedColumnName: 'id',
  // })
  // MainPost: Post;
}
