import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { EmbedApplyFileType } from '../util/objectTypes/embedFileType';
import { Contest } from 'src/contests/contests.entity';

@Index('applier1_name', ['applier1Name'], {})
@Index('apply_number', ['applyNumber'], {})
@Index('created_at', ['createdAt'], {})
@Index('pass_status', ['passStatus'], {})
@Index('program_title', ['programTitle'], {})
@Index('unique_apply_number', ['applyNumber'], { unique: true })
@Index('user_id', ['userId'], {})
@Entity('contest_apply', { schema: 'bcpf-2024-dev' })
@InputType('ApplicationInputType', { isAbstract: true })
@ObjectType()
export class ContestApply {
  @Field(() => ID)
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Column('int', { name: 'contestId', unsigned: true })
  contestId: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'contestType', length: 255 })
  contestType: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'contestTypeSub', nullable: true, length: 255 })
  contestTypeSub: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'applyNumber', unique: true, length: 255 })
  applyNumber: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'programTitle', nullable: true, length: 255 })
  programTitle: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'programGenre', nullable: true, length: 255 })
  programGenre: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'programRuntime', nullable: true, length: 255 })
  programRuntime: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'programCount', nullable: true, length: 255 })
  programCount: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', {
    name: 'programRuntimeTotal',
    nullable: true,
    length: 255,
  })
  programRuntimeTotal: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', {
    name: 'applyOtherOrgYn',
    nullable: true,
    length: 255,
  })
  applyOtherOrgYn: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'trailerUrl', nullable: true, length: 255 })
  trailerUrl: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'applier1Name', length: 255 })
  applier1Name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'applier1Mobile', length: 255 })
  applier1Mobile: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column('varchar', { name: 'applier1Email', length: 255 })
  applier1Email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier1Role', nullable: true, length: 255 })
  applier1Role: string | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Column('date', { name: 'applier1Birth', nullable: true })
  applier1Birth: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier1Company', nullable: true, length: 255 })
  applier1Company: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('longtext', { name: 'applier1Carrier', nullable: true })
  applier1Carrier: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('longtext', { name: 'applier1Etc', nullable: true })
  applier1Etc: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier2Name', nullable: true, length: 255 })
  applier2Name: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier2Mobile', nullable: true, length: 255 })
  applier2Mobile: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  @Column('varchar', { name: 'applier2Email', nullable: true, length: 255 })
  applier2Email: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier2Role', nullable: true, length: 255 })
  applier2Role: string | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Column('date', { name: 'applier2Birth', nullable: true })
  applier2Birth: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier2Company', nullable: true, length: 255 })
  applier2Company: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('longtext', { name: 'applier2Carrier', nullable: true })
  applier2Carrier: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('longtext', { name: 'applier2Etc', nullable: true })
  applier2Etc: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'companyName', nullable: true, length: 255 })
  companyName: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'companyNameEng', nullable: true, length: 255 })
  companyNameEng: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'companyPin', nullable: true, length: 255 })
  companyPin: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'companyZip', nullable: true, length: 255 })
  companyZip: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'companyAddress', nullable: true, length: 255 })
  companyAddress: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'companyPhone', nullable: true, length: 255 })
  companyPhone: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'companyCeo', nullable: true, length: 255 })
  companyCeo: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', {
    name: 'companyCeoMobile',
    nullable: true,
    length: 255,
  })
  companyCeoMobile: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'passChasu', length: 255 })
  passChasu: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'passStatus', length: 255 })
  passStatus: string;

  @Field(() => [EmbedApplyFileType], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EmbedApplyFileType)
  @Column({
    type: 'json',
    nullable: true,
    default: () => "'[]'",
  })
  file: EmbedApplyFileType[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Column('int', { name: 'userId', unsigned: true })
  userId: number;

  @Field(() => Date)
  @IsOptional()
  @IsDate()
  @CreateDateColumn({ type: 'datetime', name: 'createdAt' })
  createdAt: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  updatedAt: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'applierType', length: 255 })
  applierType: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier1Zip', nullable: true, length: 255 })
  applier1Zip: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'applier1Address', length: 255 })
  applier1Address: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier2Zip', nullable: true, length: 255 })
  applier2Zip: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier2Address', nullable: true, length: 255 })
  applier2Address: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier1School', nullable: true, length: 255 })
  applier1School: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier1Scholar', nullable: true, length: 255 })
  applier1Scholar: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', {
    name: 'applier1SchoolEtc',
    nullable: true,
    length: 255,
  })
  applier1SchoolEtc: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier1Age', nullable: true, length: 255 })
  applier1Age: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier1Gender', nullable: true, length: 255 })
  applier1Gender: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applier2Gender', nullable: true, length: 255 })
  applier2Gender: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'howToCome', nullable: true, length: 255 })
  howToCome: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'applyBCPFYn', nullable: true, length: 255 })
  applyBCPFYn: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'channelLink', nullable: true, length: 1000 })
  channelLink: string | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Column({
    type: 'bit',
    name: 'experienceMediaEduYn',
    nullable: true,
    transformer: { from: (v: Buffer) => !!v?.readInt8(0), to: (v) => v },
  })
  experienceMediaEduYn: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Column({
    type: 'int',
    unsigned: true,
    name: 'programHasContractWithCompany',
    nullable: true,
  })
  programHasContractWithCompany: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'programChannel', nullable: true, length: 255 })
  programChannel: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'programRegion', nullable: true, length: 255 })
  programRegion: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', { name: 'companyIntroduce', nullable: true, length: 255 })
  companyIntroduce: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', {
    name: 'companyParticipants',
    nullable: true,
    length: 100,
  })
  companyParticipants: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', {
    name: 'companyAttWhy',
    nullable: true,
    length: 255,
  })
  companyAttWhy: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', {
    name: 'companyAttDate',
    nullable: true,
    length: 100,
  })
  companyAttDate: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column({
    type: 'text',
    name: 'companyAsk',
    nullable: true,
  })
  companyAsk: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Column('varchar', {
    name: 'companyParticipantsAge',
    nullable: true,
    length: 40,
  })
  companyParticipantsAge: string;

  @Field(() => Contest, { nullable: true })
  @ManyToOne(() => Contest, (contest) => contest.Application)
  @JoinColumn({ name: 'contestId' })
  Contest: Contest;
}
