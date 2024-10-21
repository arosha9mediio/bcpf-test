import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContestApply } from 'src/application/application.entity';
import { EmbedFileType } from 'src/util/objectTypes/embedFileType';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ContestStatus {
  STATUS_APPLY_STANDBY = -1,
  STATUS_APPLY_ING = 0,
  STATUS_EST_ING = 10,
  STATUS_EST_1 = 11,
  STATUS_EST_2 = 12,
  STATUS_PUBLISH_1 = 1,
  STATUS_PUBLISH_2 = 2,
  STATUS_PUBLISH_FINAL = 99,
  STATUS_END = 100,
}

@Index('unique_apply_number_prefix', ['applyNumberPrefix'], { unique: true })
@Entity('contest', { schema: 'bcpf-2024-dev' })
@InputType('ContestInputType', { isAbstract: true })
@ObjectType()
export class Contest {
  @Field(() => ID)
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('longtext', { name: 'snippet' })
  snippet: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('longtext', { name: 'content', nullable: true })
  content: string | null;

  @Field(() => [EmbedFileType], { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmbedFileType)
  @Column({ type: 'json', nullable: true, default: '' })
  file: EmbedFileType;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Column('int', { name: 'views', unsigned: true, default: () => "'0'" })
  views: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Column('tinyint', { name: 'applyYn', unsigned: true, default: () => "'0'" })
  applyYn: number;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  @Column('tinyint', { name: 'statusId', default: () => "'0'" })
  statusId: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Column('datetime', { name: 'startDate', nullable: true })
  startDate: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Column('datetime', { name: 'endDate', nullable: true })
  endDate: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @Column('int', { name: 'userId', unsigned: true, default: () => "'0'" })
  userId: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @CreateDateColumn({ type: 'datetime', nullable: true })
  // @Column('int', { name: 'created_at', unsigned: true, default: () => "'0'" })
  createdAt: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @UpdateDateColumn({ type: 'datetime', nullable: true })
  // @Column('int', { name: 'updated_at', unsigned: true, default: () => "'0'" })
  updatedAt: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'contestType', length: 255 })
  contestType: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'applyNumberPrefix', unique: true, length: 255 })
  applyNumberPrefix: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'viewMain', nullable: true, length: 20 })
  viewMain: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'guideUrl', nullable: true, length: 255 })
  guideUrl: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'highlight', nullable: true, length: 255 })
  highlight: string | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Column('int', { name: 'sort', nullable: true })
  sort: number | null;

  @Field(() => [ContestApply], { nullable: true })
  @OneToMany(() => ContestApply, (apply) => apply.Contest)
  Application: ContestApply[];
}
