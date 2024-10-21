import {
  Controller,
  Get,
  Res,
  UseGuards,
  Query as RestQuery,
  Param,
  StreamableFile,
  HttpStatus,
} from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import * as fs from 'fs';
import { Response } from 'express';

import $ from '../util/exception.helper';
import { ApplicationService } from './application.service';
import { ContestApply } from './application.entity';
import { GqlAuthGuard } from '../cores/guards/jwtAuth.guard';
import { CreateApplicantDTO } from './dto/createApplicantDto';
import { CurrentUser } from '../cores/decorators/user.decorators';
import { User } from '../user/user.entity';
import { Roles } from '../cores/decorators/roles.decorators';
import { GqlPaginatedResponse, PaginatedRequest } from '../util/page';
import { ExcelService } from '../util/excel.service';
import { AWSService } from '../util/aws.service';
import { ConfigService } from '../config/config.service';
import { UpdateApplicationDTO } from './dto/updateApplicationDto';
import { FileService } from '../util/file.service';
import { setHeaders } from '../util/generalUtils';

const { RoleEnum } = User;

@ObjectType()
export class PaginatedContestApplyResponse extends GqlPaginatedResponse(
  ContestApply
) {}

@Controller('application')
@Resolver(() => ContestApply)
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly excelService: ExcelService,
    private readonly configService: ConfigService,
    private readonly awsService: AWSService,
    private readonly fileService: FileService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ContestApply)
  createApplication(
    @Args('input', { type: () => CreateApplicantDTO })
    createApplicationDTO: CreateApplicantDTO,
    @CurrentUser() user: User
  ) {
    return this.applicationService.createContestApplication(
      user,
      createApplicationDTO
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedContestApplyResponse)
  applicationFeed(
    @Args('pageRequest', { type: () => PaginatedRequest, nullable: true })
    pageRequest: PaginatedRequest,
    @CurrentUser() user: User
  ) {
    return this.applicationService.applicationsFeed(
      user,
      PaginatedRequest.of(pageRequest)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Manager, RoleEnum.User)
  @Query(() => ContestApply)
  findApplication(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User | null
  ) {
    return this.applicationService.findApplication(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Mutation(() => ContestApply)
  updateApplication(
    @Args('input', { type: () => UpdateApplicationDTO })
    updateApplicationDTO: UpdateApplicationDTO,
    @CurrentUser() user: User
  ) {
    return this.applicationService.updateApplication(
      user,
      updateApplicationDTO
    );
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Mutation(() => Boolean)
  deleteApplication(
    @Args('id', { type: () => ID, description: 'application id' }) id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    return this.applicationService.removeApplication(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @Query(() => ContestApply, { nullable: true })
  getApplicationByContest(
    @Args('contestId', { type: () => ID }) contestId: string,
    @CurrentUser() user: User
  ) {
    return this.applicationService.getApplicationByContest(user, contestId);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(User.RoleEnum.Admin, User.RoleEnum.Manager)
  @Get('excel')
  async downloadExcel(
    @Res() res: Response,
    @RestQuery() pageRequest: PaginatedRequest,
    @CurrentUser() user: User
  ) {
    $.requiredEntity(pageRequest.contestId, 'contestId is required');
    const data = await this.applicationService.prepareDataForExcel(
      user,
      pageRequest
    );

    const filePath = await this.excelService.downloadExcel<ContestApply>(
      data,
      'applicants'
    );

    const fileName = pageRequest.contestId
      ? `${data[0].Contest.title}.xlsx`
      : 'applicants.xlsx';

    setHeaders(
      res,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      encodeURIComponent(fileName),
      ['Content-Disposition']
    );

    // Send the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // const fileStream = fs.createReadStream(filePath);
    // const streamableFile = new StreamableFile(fileStream, {
    //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   disposition: 'attachment; filename=applicants.xlsx',
    // });

    fileStream.on('end', () => this.excelService.deleteFile(filePath));

    // return streamableFile;
  }

  @UseGuards(GqlAuthGuard)
  @Get('file/:id')
  async downloadApplicantFile(
    @Param('id') id: string,
    @Res() res: Response,
    @CurrentUser() user: User | null
  ) {
    const file = await this.applicationService.getApplicantFiles(user, id);

    if (!file) return res.status(HttpStatus.NOT_FOUND).send('Not found');

    const bucket = this.configService.aws.s3BaseBucket;
    const fileUrl = file.url;
    const fileKey = fileUrl.includes('@') ? fileUrl.split('@')[1] : fileUrl;
    const streamRes = await this.awsService.getFileStream(
      bucket,
      fileKey,
      file.filename
    );

    const { stream, contentType, fileName } = streamRes;

    setHeaders(res, contentType, fileName, ['Content-Disposition']);

    stream.pipe(res);
  }

  @UseGuards(GqlAuthGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @Get('zip')
  async getZipped(
    @Res() res: Response,
    @RestQuery() pageRequest: PaginatedRequest,
    @CurrentUser() user: User | null
  ) {
    $.requiredEntity(pageRequest.contestId, 'contestId is required');

    const data = await this.applicationService.getFileLinks(user, pageRequest);

    const fileName = `${data[0].Contest.title}.zip`;
    const encodedFileName = encodeURIComponent(fileName);

    const zipStream = await this.fileService.createApplicationZip(data);

    setHeaders(res, 'application/zip', encodedFileName, [
      'Content-Disposition',
    ]);

    return zipStream.pipe(res);
  }
}
