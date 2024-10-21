import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import $, { Then } from '../util/exception.helper';
import { UserProfile } from './userProfile.entity';
import { UserToken } from './userToken.entity';
import { Post } from '../post/entites/post.entity';
import { Like } from '../like/like.entity';

export type RoleEnum = 'ADMIN' | 'MANAGER' | 'USER' | 'GUEST';
export type Status = 1 | 2 | 3 | 4;

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User {
  static hashUserPw(plainPassword: string): string {
    if (plainPassword) {
      return bcrypt.hashSync(plainPassword, 12);
    }
  }

  static of(dto: Partial<User>): User {
    const user = new User();
    Object.keys(dto).forEach((key) => (user[key] = dto[key]));
    return user;
  }

  static readonly RoleEnum = {
    Admin: 'ADMIN' as RoleEnum,
    Manager: 'MANAGER' as RoleEnum,
    User: 'USER' as RoleEnum,
    Guest: 'GUEST' as RoleEnum,
  };

  static readonly Status = {
    Active: 1 as Status,
    Inactive: 2 as Status,
    Banned: 3 as Status,
    Deleted: 4 as Status,
  };

  @BeforeInsert()
  // @BeforeUpdate()
  private encryptPassword() {
    if (this.passwordHash) {
      this.passwordHash = User.hashUserPw(this.passwordHash);
    }
  }

  @Field(() => ID)
  @IsNotEmpty()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: '회원번호',
  })
  id: string;

  // @Field()
  // @IsNotEmpty()
  // @MaxLength(32)
  @Column({ type: 'varchar', length: 255, nullable: true })
  authKey: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  @Column({ type: 'varchar', length: 255, nullable: true })
  pushToken: string;

  // @Field()
  // @IsNotEmpty()
  // @MaxLength(255)
  @Column({ type: 'varchar', length: 1000, comment: '비밀번호' })
  passwordHash: string;

  // @Field()
  // @IsNotEmpty()
  // @MaxLength(255)
  @Column({
    type: 'enum',
    enum: ['google', 'naver', 'kakao'],
    nullable: true,
    comment: '소셜이름',
  })
  oauthClient: string;

  // @Field(() => ID, )
  // @IsNotEmpty()
  @MaxLength(255)
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '소셜아이디',
  })
  oauthClientUserId: string;

  @Field({ nullable: true })
  @IsEmail()
  @MaxLength(255)
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    comment: '이메일',
    select: false,
  })
  email: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 0,
    comment: '회원상태',
  })
  status: Status;

  @Field({ nullable: true })
  get interpretedRole(): string {
    switch (this.status) {
      // case User.Status.Init:
      //   return this.role + '_INIT';
      default:
        return this.role;
    }
  }

  // @Field()
  // @IsNotEmpty()
  // @MaxLength(128)
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '아이피' })
  ip: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Column({ type: 'datetime', nullable: true })
  updatedAt: string;

  /**
   * user role
   */
  @Field({ nullable: true })
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 8,
    default: 'USER',
    comment: '권한',
  })
  role: RoleEnum;

  @Field(() => [UserToken])
  @IsNotEmpty()
  @OneToMany(() => UserToken, (userToken) => userToken.User)
  // @JoinColumn()
  UserTokens: Array<UserToken>;

  @Field(() => UserProfile, { nullable: true })
  @OneToOne(() => UserProfile, (userProfile) => userProfile.User, {
    cascade: ['insert', 'update'],
  })
  UserProfile: UserProfile;

  @Field(() => [Post], { nullable: true })
  Posts: Array<Post>;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.User)
  Likes: Array<Like>;

  equalsPw(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this.passwordHash);
  }

  // get isInitUser(): boolean {
  //   return this.status === User.Status.Init;
  // }

  get isManager(): boolean {
    return this.role === User.RoleEnum.Manager;
  }

  get isAdmin(): boolean {
    return this.role === User.RoleEnum.Admin;
  }

  get isUser(): boolean {
    return this.role === User.RoleEnum.User;
  }

  // get isApplicable(): boolean {
  //   return this.status === User.Status.Temp;
  // }

  hasRole(roles: RoleEnum[]): boolean {
    return roles.includes(this.role);
  }

  hasRoleThen(roles: RoleEnum[]): Then<boolean> {
    return Then.with(roles.includes(this.role));
  }

  hasRoleThrow(roles: RoleEnum[]): void {
    $.throwIf(roles.includes(this.role), '사용하거나 볼수 없는 기능입니다.');
  }

  hasRoleElseThrow(roles: RoleEnum[]): void {
    $.throwIfNot(roles.includes(this.role), '사용하거나 볼수 없는 기능입니다.');
  }
}
