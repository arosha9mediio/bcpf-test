import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';

import { Post } from './entites/post.entity';
import { PostService } from './post.service';
import { CurrentUser } from '../cores/decorators/user.decorators';
import { User } from '../user/user.entity';
import { GqlAuthGuard } from '../cores/guards/jwtAuth.guard';
import {
  GqlPaginatedResponse,
  PaginatedRequest,
  PaginatedResponse,
} from '../util/page';
import { Roles } from '../cores/decorators/roles.decorators';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { OptionalUserGuard } from '../cores/guards/optionalUser.guard';
import { AdjacentResponse } from './objects/adjacent.object';
import { ConfigService } from '../config/config.service';
import { AWSService } from '../util/aws.service';
import { Response } from 'express';

const { RoleEnum } = User;

@ObjectType()
export class PaginatedPostResponse extends GqlPaginatedResponse(Post) {}

@Resolver(() => Post)
@Controller('post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly configService: ConfigService,
    private readonly awsService: AWSService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Post)
  createPost(
    @Args('input', { type: () => CreatePostDTO }) createPostDto: CreatePostDTO,
    @CurrentUser() user: User
  ): Promise<Post> {
    return this.postService.createPost(user, createPostDto);
  }

  // ! do we need to guard these?
  @UseGuards(OptionalUserGuard)
  @Query(() => PaginatedPostResponse)
  postFeed(
    @Args('pageRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest,
    @CurrentUser() user: User
  ): Promise<PaginatedResponse<Post>> {
    return this.postService.postFeed(user, PaginatedRequest.of(pageRequest));
  }

  @UseGuards(OptionalUserGuard)
  @Query(() => AdjacentResponse)
  getAdjacentPosts(
    @Args('id', { type: () => String, description: 'post id or slug' })
    id: string,
    @Args('pageRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest,
    @CurrentUser() user: User
  ): Promise<AdjacentResponse> {
    return this.postService.getAdjacentPosts(
      id,
      PaginatedRequest.of(pageRequest),
      user
    );
  }

  @UseGuards(OptionalUserGuard)
  @Query(() => Post)
  findPost(
    @Args('id', { type: () => String, description: 'post id or slug' })
    id: string,
    @CurrentUser() user: User
  ): Promise<Post> {
    return this.postService.findPost(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Post)
  updatePost(
    @Args('input', { type: () => UpdatePostDTO, description: 'update Post' })
    updatePostDto: UpdatePostDTO,
    @CurrentUser() user: User
  ): Promise<Post> {
    return this.postService.updatePost(user, updatePostDto);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin)
  @Mutation(() => Boolean)
  deletePost(
    @Args('id', { type: () => ID, description: 'post id' }) id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    return this.postService.deletePost(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @Query(() => Boolean)
  isSlugExist(
    @Args('slug', { type: () => String, description: 'post slug' }) slug: string
  ) {
    return this.postService.isSlugExist(slug);
  }

  // TODO: #198 @JongKwanPark @strider-z security issue anyone can try to download file by id
  // we need to use url for  perity check like /1233/_eSeeildj92fesnaXeiswl this.
  @UseGuards(OptionalUserGuard)
  @Get('press/:id')
  async downloadArticleDoc(
    @Param('id') id: string,
    @CurrentUser() user: User | null,
    @Res() res: Response
  ) {
    const doc = await this.postService.getArticleLink(user, id);

    if (!doc) return res.status(HttpStatus.NOT_FOUND).send('Not found');

    const bucket = this.configService.aws.s3BaseBucket;

    const { stream, fileName, contentType } =
      await this.awsService.getFileStream(bucket, doc.url, doc.filename);

    res.set({
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      'Content-Type': contentType,
    });

    stream.pipe(res);
  }
}
