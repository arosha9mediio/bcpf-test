import { ID, Field, Int, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// * we don't need validate decorators since we don't create/update?
@Entity('work_support', { schema: 'bcpf-2024-dev' })
@InputType('BroadcastInputType', { isAbstract: true })
@ObjectType()
export class WorkSupport {
  @Field(() => ID)
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '키값',
    unsigned: true,
  })
  id: number;

  // todo: what are the types? nullable?
  @Field(() => Int)
  @Column('tinyint', {
    name: 'type',
    comment:
      '구분(방송영상제작지원 - 그린 다큐멘터리,, BCPF수시제작지원 - 다큐멘트리, 트레일러)',
    unsigned: true,
    default: () => "'0'",
  })
  type: number;

  @Field(() => String)
  @Column('varchar', { name: 'title', comment: '작품명', length: 200 })
  title: string;

  @Field(() => String)
  @Column('varchar', { name: 'genre', comment: '장르', length: 100 })
  genre: string;

  @Field(() => String)
  @Column('varchar', { name: 'summaryInfo', comment: '요약정보', length: 250 })
  summaryInfo: string;

  @Field(() => String)
  @Column('varchar', {
    name: 'broadcast',
    comment:
      '방송(예 : 2013-5-13 SBS일요특선, 2014-8-3 KBS독립영화관) <- 2개 이상도 있음 => 구분자 사용함 => |^',
    length: 250,
  })
  broadcast: string;

  @Field(() => Date, { nullable: true })
  @Column('date', {
    name: 'theatersDate',
    nullable: true,
    comment: '극장개봉연도',
  })
  theatersDate: string | null;

  @Field(() => Date, { nullable: true })
  @Column('date', {
    name: 'productionSupportDate',
    nullable: true,
    comment: '제작지원연도',
  })
  productionSupportDate: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', {
    name: 'producer',
    nullable: true,
    comment: '제작사',
    length: 150,
  })
  producer: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', {
    name: 'publishers',
    nullable: true,
    comment: '배급사',
    length: 150,
  })
  publishers: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', {
    name: 'vimeoUrl',
    nullable: true,
    comment: '트레일러 주소',
    length: 200,
  })
  vimeoUrl: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { name: 'synopsis', nullable: true, comment: '시놉시스' })
  synopsis: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', {
    name: 'production',
    nullable: true,
    comment: '연출',
    length: 150,
  })
  production: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', {
    name: 'configuration',
    nullable: true,
    comment: '구성',
    length: 150,
  })
  configuration: string | null;

  @Field(() => String)
  @Column('varchar', { name: 'plan', comment: '기획', length: 150 })
  plan: string;

  @Field(() => String)
  @Column('varchar', { name: 'shooting', comment: '촬영', length: 150 })
  shooting: string;

  @Field(() => String)
  @Column('varchar', { name: 'edit', comment: '편집', length: 150 })
  edit: string;

  @Field(() => String)
  @Column('varchar', { name: 'producers', comment: '프로듀서', length: 150 })
  producers: string;

  @Field(() => String)
  @Column('text', { name: 'awards', comment: '영화제출품 및 수상 현황' })
  awards: string;

  @Field(() => String)
  @Column('varchar', {
    name: 'previewUrl',
    comment: '포스터 이미지',
    length: 150,
  })
  previewUrl: string;

  @Field(() => String)
  @Column('varchar', { name: 'img1', comment: '스틸컷1', length: 150 })
  img1: string;

  @Field(() => String)
  @Column('varchar', { name: 'img2', comment: '스틸컷2', length: 150 })
  img2: string;

  @Field(() => String)
  @Column('varchar', { name: 'img3', comment: '스틸컷3', length: 150 })
  img3: string;

  @Field(() => String)
  @Column('varchar', { name: 'img4', comment: '스틸컷4', length: 150 })
  img4: string;

  @Field(() => String)
  @Column('varchar', { name: 'img5', comment: '스틸컷5', length: 150 })
  img5: string;

  @Field(() => Int)
  @Column('tinyint', {
    name: 'statusId',
    comment: '상태',
    unsigned: true,
    default: () => "'1'",
  })
  statusId: number;

  @Field(() => Date)
  @CreateDateColumn({
    type: 'datetime',
    name: 'createdAt',
    comment: '등록일자',
  })
  createdAt: string;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({
    type: 'datetime',
    name: 'updatedAt',
    comment: '갱신일자',
  })
  updatedAt: string;
}
