import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AdjacentResponse = {
  __typename?: 'AdjacentResponse';
  next?: Maybe<Post>;
  previous?: Maybe<Post>;
};

export type CarouselImage = {
  __typename?: 'CarouselImage';
  images?: Maybe<EmbedFileType>;
  link?: Maybe<Scalars['String']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ChangeUserPwDto = {
  currentPassword: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
};

export type Contest = {
  __typename?: 'Contest';
  Application?: Maybe<Array<ContestApply>>;
  applyNumberPrefix: Scalars['String']['output'];
  applyYn: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  contestType: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  file?: Maybe<Array<EmbedFileType>>;
  guideUrl?: Maybe<Scalars['String']['output']>;
  highlight?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  snippet: Scalars['String']['output'];
  sort?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['Date']['output']>;
  statusId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
  viewMain?: Maybe<Scalars['String']['output']>;
  views: Scalars['Int']['output'];
};

export type ContestApply = {
  __typename?: 'ContestApply';
  Contest?: Maybe<Contest>;
  applier1Address: Scalars['String']['output'];
  applier1Age?: Maybe<Scalars['String']['output']>;
  applier1Birth?: Maybe<Scalars['Date']['output']>;
  applier1Carrier?: Maybe<Scalars['String']['output']>;
  applier1Company?: Maybe<Scalars['String']['output']>;
  applier1Email: Scalars['String']['output'];
  applier1Etc?: Maybe<Scalars['String']['output']>;
  applier1Gender?: Maybe<Scalars['String']['output']>;
  applier1Mobile: Scalars['String']['output'];
  applier1Name: Scalars['String']['output'];
  applier1Role?: Maybe<Scalars['String']['output']>;
  applier1Scholar?: Maybe<Scalars['String']['output']>;
  applier1School?: Maybe<Scalars['String']['output']>;
  applier1SchoolEtc?: Maybe<Scalars['String']['output']>;
  applier1Zip?: Maybe<Scalars['String']['output']>;
  applier2Address?: Maybe<Scalars['String']['output']>;
  applier2Birth?: Maybe<Scalars['Date']['output']>;
  applier2Carrier?: Maybe<Scalars['String']['output']>;
  applier2Company?: Maybe<Scalars['String']['output']>;
  applier2Email?: Maybe<Scalars['String']['output']>;
  applier2Etc?: Maybe<Scalars['String']['output']>;
  applier2Gender?: Maybe<Scalars['String']['output']>;
  applier2Mobile?: Maybe<Scalars['String']['output']>;
  applier2Name?: Maybe<Scalars['String']['output']>;
  applier2Role?: Maybe<Scalars['String']['output']>;
  applier2Zip?: Maybe<Scalars['String']['output']>;
  applierType: Scalars['String']['output'];
  applyBCPFYn?: Maybe<Scalars['String']['output']>;
  applyNumber: Scalars['String']['output'];
  applyOtherOrgYn?: Maybe<Scalars['String']['output']>;
  channelLink?: Maybe<Scalars['String']['output']>;
  companyAddress?: Maybe<Scalars['String']['output']>;
  companyAsk?: Maybe<Scalars['String']['output']>;
  companyAttDate?: Maybe<Scalars['String']['output']>;
  companyAttWhy?: Maybe<Scalars['String']['output']>;
  companyCeo?: Maybe<Scalars['String']['output']>;
  companyCeoMobile?: Maybe<Scalars['String']['output']>;
  companyIntroduce?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyNameEng?: Maybe<Scalars['String']['output']>;
  companyParticipants?: Maybe<Scalars['String']['output']>;
  companyParticipantsAge?: Maybe<Scalars['String']['output']>;
  companyPhone?: Maybe<Scalars['String']['output']>;
  companyPin?: Maybe<Scalars['String']['output']>;
  companyZip?: Maybe<Scalars['String']['output']>;
  contestId: Scalars['Int']['output'];
  contestType: Scalars['String']['output'];
  contestTypeSub?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  experienceMediaEduYn?: Maybe<Scalars['Int']['output']>;
  file?: Maybe<Array<EmbedApplyFileType>>;
  howToCome?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  passChasu: Scalars['String']['output'];
  passStatus: Scalars['String']['output'];
  programChannel?: Maybe<Scalars['String']['output']>;
  programCount?: Maybe<Scalars['String']['output']>;
  programGenre?: Maybe<Scalars['String']['output']>;
  programHasContractWithCompany?: Maybe<Scalars['Int']['output']>;
  programRegion?: Maybe<Scalars['String']['output']>;
  programRuntime?: Maybe<Scalars['String']['output']>;
  programRuntimeTotal?: Maybe<Scalars['String']['output']>;
  programTitle?: Maybe<Scalars['String']['output']>;
  trailerUrl?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId: Scalars['Int']['output'];
};

export type CreateApplicantDto = {
  applier1Address: Scalars['String']['input'];
  applier1Age?: InputMaybe<Scalars['String']['input']>;
  applier1Birth?: InputMaybe<Scalars['Date']['input']>;
  applier1Carrier?: InputMaybe<Scalars['String']['input']>;
  applier1Company?: InputMaybe<Scalars['String']['input']>;
  applier1Email: Scalars['String']['input'];
  applier1Etc?: InputMaybe<Scalars['String']['input']>;
  applier1Gender?: InputMaybe<Scalars['String']['input']>;
  applier1Mobile: Scalars['String']['input'];
  applier1Name: Scalars['String']['input'];
  applier1Role?: InputMaybe<Scalars['String']['input']>;
  applier1Scholar?: InputMaybe<Scalars['String']['input']>;
  applier1School?: InputMaybe<Scalars['String']['input']>;
  applier1SchoolEtc?: InputMaybe<Scalars['String']['input']>;
  applier1Zip?: InputMaybe<Scalars['String']['input']>;
  applier2Address?: InputMaybe<Scalars['String']['input']>;
  applier2Birth?: InputMaybe<Scalars['Date']['input']>;
  applier2Carrier?: InputMaybe<Scalars['String']['input']>;
  applier2Company?: InputMaybe<Scalars['String']['input']>;
  applier2Email?: InputMaybe<Scalars['String']['input']>;
  applier2Etc?: InputMaybe<Scalars['String']['input']>;
  applier2Gender?: InputMaybe<Scalars['String']['input']>;
  applier2Mobile?: InputMaybe<Scalars['String']['input']>;
  applier2Name?: InputMaybe<Scalars['String']['input']>;
  applier2Role?: InputMaybe<Scalars['String']['input']>;
  applier2Zip?: InputMaybe<Scalars['String']['input']>;
  applierType: Scalars['String']['input'];
  applyBCPFYn?: InputMaybe<Scalars['String']['input']>;
  applyNumber: Scalars['String']['input'];
  applyOtherOrgYn?: InputMaybe<Scalars['String']['input']>;
  channelLink?: InputMaybe<Scalars['String']['input']>;
  companyAddress?: InputMaybe<Scalars['String']['input']>;
  companyAsk?: InputMaybe<Scalars['String']['input']>;
  companyAttDate?: InputMaybe<Scalars['String']['input']>;
  companyAttWhy?: InputMaybe<Scalars['String']['input']>;
  companyCeo?: InputMaybe<Scalars['String']['input']>;
  companyCeoMobile?: InputMaybe<Scalars['String']['input']>;
  companyIntroduce?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyNameEng?: InputMaybe<Scalars['String']['input']>;
  companyParticipants?: InputMaybe<Scalars['String']['input']>;
  companyParticipantsAge?: InputMaybe<Scalars['String']['input']>;
  companyPhone?: InputMaybe<Scalars['String']['input']>;
  companyPin?: InputMaybe<Scalars['String']['input']>;
  companyZip?: InputMaybe<Scalars['String']['input']>;
  contestId: Scalars['Int']['input'];
  contestType: Scalars['String']['input'];
  contestTypeSub?: InputMaybe<Scalars['String']['input']>;
  experienceMediaEduYn?: InputMaybe<Scalars['Int']['input']>;
  file?: InputMaybe<Array<EmbedApplicantFileTypeInput>>;
  howToCome?: InputMaybe<Scalars['String']['input']>;
  passChasu: Scalars['String']['input'];
  passStatus: Scalars['String']['input'];
  prefix: Scalars['String']['input'];
  programChannel?: InputMaybe<Scalars['String']['input']>;
  programCount?: InputMaybe<Scalars['String']['input']>;
  programGenre?: InputMaybe<Scalars['String']['input']>;
  programHasContractWithCompany?: InputMaybe<Scalars['Int']['input']>;
  programRegion?: InputMaybe<Scalars['String']['input']>;
  programRuntime?: InputMaybe<Scalars['String']['input']>;
  programRuntimeTotal?: InputMaybe<Scalars['String']['input']>;
  programTitle?: InputMaybe<Scalars['String']['input']>;
  trailerUrl?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type CreateContestDto = {
  applyNumberPrefix: Scalars['String']['input'];
  applyYn: Scalars['Int']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  contestType: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  file?: InputMaybe<Array<EmbedFileTypeInput>>;
  guideUrl?: InputMaybe<Scalars['String']['input']>;
  highlight?: InputMaybe<Scalars['String']['input']>;
  snippet: Scalars['String']['input'];
  sort?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  statusId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  viewMain?: InputMaybe<Scalars['String']['input']>;
  views: Scalars['Int']['input'];
};

export type CreateDonationDto = {
  month: Scalars['String']['input'];
  names: Scalars['String']['input'];
  price: Scalars['String']['input'];
  sort?: InputMaybe<Scalars['Int']['input']>;
  statusId: Scalars['Int']['input'];
  type: Scalars['Float']['input'];
  year: Scalars['String']['input'];
};

export type CreatePostCategoryDto = {
  /** 제목 */
  title: Scalars['String']['input'];
};

export type CreatePostDto = {
  /** 내용 */
  body?: InputMaybe<Scalars['String']['input']>;
  /** 카테고리 */
  categoryId: Scalars['ID']['input'];
  /** 등록날짜 */
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  /** description */
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Array<EmbedFileTypeInput>>;
  /** keywords for page */
  keywords?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  /** meta description for page */
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  /** 상태 */
  noticeType?: InputMaybe<Scalars['Int']['input']>;
  /** 상단고정 */
  pin?: InputMaybe<Scalars['Int']['input']>;
  /** 미리보기 */
  preview?: InputMaybe<Scalars['String']['input']>;
  publishStatus?: InputMaybe<Scalars['Boolean']['input']>;
  /** 게시시작일 */
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  /** slug */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** sub title */
  subTitle?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  /** 제목 */
  title: Scalars['String']['input'];
  /** 주제글번호 */
  topicId?: InputMaybe<Scalars['ID']['input']>;
  /** 글종류 */
  type?: InputMaybe<Scalars['Int']['input']>;
  /** 게시종료일 */
  unpublishedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateUserDto = {
  birthday?: InputMaybe<Scalars['Date']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

export type Donation = {
  __typename?: 'Donation';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  month: Scalars['String']['output'];
  names: Scalars['String']['output'];
  price: Scalars['String']['output'];
  sort?: Maybe<Scalars['Int']['output']>;
  statusId: Scalars['Int']['output'];
  type: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  year: Scalars['String']['output'];
};

export type EmbedApplicantFileTypeInput = {
  /** file name */
  filename: Scalars['String']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
  /** file type */
  type: FileType;
  /** file URL */
  url: Scalars['String']['input'];
};

export type EmbedApplyFileType = {
  __typename?: 'EmbedApplyFileType';
  /** file name */
  filename: Scalars['String']['output'];
  key?: Maybe<Scalars['String']['output']>;
  /** file type */
  type: FileType;
  /** file URL */
  url: Scalars['String']['output'];
};

export type EmbedFileType = {
  __typename?: 'EmbedFileType';
  /** file name */
  filename: Scalars['String']['output'];
  /** file type */
  type: FileType;
  /** file URL */
  url: Scalars['String']['output'];
};

export type EmbedFileTypeInput = {
  /** file name */
  filename: Scalars['String']['input'];
  /** file type */
  type: FileType;
  /** file URL */
  url: Scalars['String']['input'];
};

export type Features = {
  __typename?: 'Features';
  breadcrumbs?: Maybe<Array<Scalars['String']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  /** file name */
  filename: Scalars['String']['output'];
  link?: Maybe<Scalars['String']['output']>;
  linkTitle?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['String']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  /** file type */
  type: FileType;
  /** file URL */
  url: Scalars['String']['output'];
};

export enum FileType {
  Doc = 'DOC',
  Image = 'IMAGE',
  Thumbnail = 'THUMBNAIL',
  Video = 'VIDEO'
}

export type Like = {
  __typename?: 'Like';
  User: User;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  refId?: Maybe<Scalars['Int']['output']>;
  refType: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserPw: Scalars['String']['output'];
  createApplication: ContestApply;
  createContest: Contest;
  createDonation: Donation;
  createPost: Post;
  createPostCategory: PostCategory;
  createPresignedPost: Scalars['String']['output'];
  createUser: User;
  deleteApplication: Scalars['Boolean']['output'];
  deleteContest: Scalars['Boolean']['output'];
  deleteDonation: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deletePostCategory: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  resetPwWithEncKey: Scalars['Boolean']['output'];
  sendContactEmail: Scalars['Boolean']['output'];
  sendPhoneVerifyToken: Scalars['Boolean']['output'];
  sendPwTokenEmail: Scalars['Boolean']['output'];
  signIn: Array<Scalars['String']['output']>;
  updateApplication: ContestApply;
  updateContest: Contest;
  updateDonation: Donation;
  updatePost: Post;
  updatePostCategory: PostCategory;
  updatePushToken: Scalars['Boolean']['output'];
  updateUser: User;
  updateUserByAdmin: Scalars['Boolean']['output'];
  updateUserPhone: Scalars['Boolean']['output'];
  updateUserProfile: Scalars['Boolean']['output'];
  updateUserStatus: User;
  validateRefreshJwt: Scalars['String']['output'];
};


export type MutationChangeUserPwArgs = {
  changeUserPwDto: ChangeUserPwDto;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicantDto;
};


export type MutationCreateContestArgs = {
  input: CreateContestDto;
};


export type MutationCreateDonationArgs = {
  input: CreateDonationDto;
};


export type MutationCreatePostArgs = {
  input: CreatePostDto;
};


export type MutationCreatePostCategoryArgs = {
  input: CreatePostCategoryDto;
};


export type MutationCreatePresignedPostArgs = {
  isProtected?: InputMaybe<Scalars['Boolean']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  input: CreateUserDto;
};


export type MutationDeleteApplicationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteContestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDonationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPwWithEncKeyArgs = {
  resetUserPwDto: ResetUserPwDto;
};


export type MutationSendContactEmailArgs = {
  sendContactEmailDto: SendContactEmailDto;
};


export type MutationSendPhoneVerifyTokenArgs = {
  sendPhoneVerifyTokenDto: SendPhoneVerifyTokenDto;
};


export type MutationSendPwTokenEmailArgs = {
  sendPwTokenEmailDto: SendPwTokenEmailDto;
};


export type MutationSignInArgs = {
  signInDto: SignInDto;
};


export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationDto;
};


export type MutationUpdateContestArgs = {
  input: UpdateContestDto;
};


export type MutationUpdateDonationArgs = {
  input: UpdateDonationDto;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostDto;
};


export type MutationUpdatePostCategoryArgs = {
  input: UpdatePostCategoryDto;
};


export type MutationUpdatePushTokenArgs = {
  pushToken: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDto;
};


export type MutationUpdateUserByAdminArgs = {
  updateUserProfileDto: UpdateUserProfileDto;
};


export type MutationUpdateUserPhoneArgs = {
  updateUserPhoneDto: UpdateUserPhoneDto;
};


export type MutationUpdateUserProfileArgs = {
  updateUserProfileDto: UpdateUserProfileDto;
};


export type MutationUpdateUserStatusArgs = {
  updateUserStatusDto: UpdateUserStatusDto;
};


export type MutationValidateRefreshJwtArgs = {
  token: Scalars['String']['input'];
};

export type Navigation = {
  __typename?: 'Navigation';
  main: Scalars['String']['output'];
  sub?: Maybe<Array<SubNavigation>>;
};

export type PaginatedBroadcastResponse = {
  __typename?: 'PaginatedBroadcastResponse';
  categoryId?: Maybe<Scalars['Int']['output']>;
  client?: Maybe<Scalars['Boolean']['output']>;
  contestId?: Maybe<Scalars['Int']['output']>;
  filter?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['Date']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  itemCount: Scalars['Int']['output'];
  list: Array<WorkSupport>;
  page?: Maybe<Scalars['Int']['output']>;
  pageCount: Scalars['Int']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  searchBy?: Maybe<Scalars['String']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
  sortType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  viewMain?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type PaginatedContestApplyResponse = {
  __typename?: 'PaginatedContestApplyResponse';
  categoryId?: Maybe<Scalars['Int']['output']>;
  client?: Maybe<Scalars['Boolean']['output']>;
  contestId?: Maybe<Scalars['Int']['output']>;
  filter?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['Date']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  itemCount: Scalars['Int']['output'];
  list: Array<ContestApply>;
  page?: Maybe<Scalars['Int']['output']>;
  pageCount: Scalars['Int']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  searchBy?: Maybe<Scalars['String']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
  sortType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  viewMain?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type PaginatedContestResponse = {
  __typename?: 'PaginatedContestResponse';
  categoryId?: Maybe<Scalars['Int']['output']>;
  client?: Maybe<Scalars['Boolean']['output']>;
  contestId?: Maybe<Scalars['Int']['output']>;
  filter?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['Date']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  itemCount: Scalars['Int']['output'];
  list: Array<Contest>;
  page?: Maybe<Scalars['Int']['output']>;
  pageCount: Scalars['Int']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  searchBy?: Maybe<Scalars['String']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
  sortType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  viewMain?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type PaginatedDonationResponse = {
  __typename?: 'PaginatedDonationResponse';
  categoryId?: Maybe<Scalars['Int']['output']>;
  client?: Maybe<Scalars['Boolean']['output']>;
  contestId?: Maybe<Scalars['Int']['output']>;
  filter?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['Date']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  itemCount: Scalars['Int']['output'];
  list: Array<Donation>;
  page?: Maybe<Scalars['Int']['output']>;
  pageCount: Scalars['Int']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  searchBy?: Maybe<Scalars['String']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
  sortType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  viewMain?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type PaginatedPostCategoryResponse = {
  __typename?: 'PaginatedPostCategoryResponse';
  categoryId?: Maybe<Scalars['Int']['output']>;
  client?: Maybe<Scalars['Boolean']['output']>;
  contestId?: Maybe<Scalars['Int']['output']>;
  filter?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['Date']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  itemCount: Scalars['Int']['output'];
  list: Array<PostCategory>;
  page?: Maybe<Scalars['Int']['output']>;
  pageCount: Scalars['Int']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  searchBy?: Maybe<Scalars['String']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
  sortType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  viewMain?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type PaginatedPostResponse = {
  __typename?: 'PaginatedPostResponse';
  categoryId?: Maybe<Scalars['Int']['output']>;
  client?: Maybe<Scalars['Boolean']['output']>;
  contestId?: Maybe<Scalars['Int']['output']>;
  filter?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['Date']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  itemCount: Scalars['Int']['output'];
  list: Array<Post>;
  page?: Maybe<Scalars['Int']['output']>;
  pageCount: Scalars['Int']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  searchBy?: Maybe<Scalars['String']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
  sortType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  viewMain?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type PaginatedRequest = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  client?: InputMaybe<Scalars['Boolean']['input']>;
  contestId?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  viewMain?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedUserResponse = {
  __typename?: 'PaginatedUserResponse';
  categoryId?: Maybe<Scalars['Int']['output']>;
  client?: Maybe<Scalars['Boolean']['output']>;
  contestId?: Maybe<Scalars['Int']['output']>;
  filter?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['Date']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  itemCount: Scalars['Int']['output'];
  list: Array<User>;
  page?: Maybe<Scalars['Int']['output']>;
  pageCount: Scalars['Int']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  searchBy?: Maybe<Scalars['String']['output']>;
  sortBy?: Maybe<Scalars['String']['output']>;
  sortType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  viewMain?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  Category: PostCategory;
  User: User;
  /** 내용 */
  body?: Maybe<Scalars['String']['output']>;
  /** 카테고리 */
  categoryId: Scalars['ID']['output'];
  /** 답글갯수 */
  commentCount?: Maybe<Scalars['Int']['output']>;
  /** 등록날짜 */
  createdAt?: Maybe<Scalars['Date']['output']>;
  /** 작성자 */
  createdBy: Scalars['ID']['output'];
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  file?: Maybe<Array<EmbedFileType>>;
  /** 번호 */
  id: Scalars['ID']['output'];
  /** keywords for page */
  keywords?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  /** 좋아요 */
  likeCount?: Maybe<Scalars['Int']['output']>;
  /** meta description for page */
  metaDescription?: Maybe<Scalars['String']['output']>;
  /** 상태 */
  noticeType?: Maybe<Scalars['Int']['output']>;
  /** 상단고정 */
  pin?: Maybe<Scalars['Int']['output']>;
  /** 미리보기 */
  preview?: Maybe<Scalars['String']['output']>;
  publishStatus?: Maybe<Scalars['Boolean']['output']>;
  /** 게시시작일 */
  publishedAt?: Maybe<Scalars['Date']['output']>;
  /** 별점 */
  rating?: Maybe<Scalars['ID']['output']>;
  /** 참조번호 */
  refId?: Maybe<Scalars['ID']['output']>;
  /** 신고횟수 */
  reportCount?: Maybe<Scalars['Int']['output']>;
  /** slug */
  slug?: Maybe<Scalars['String']['output']>;
  /** 정렬 */
  sort?: Maybe<Scalars['Int']['output']>;
  /** sub title */
  subTitle?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  /** 제목 */
  title: Scalars['String']['output'];
  /** 주제글번호 */
  topicId?: Maybe<Scalars['ID']['output']>;
  /** 글종류 */
  type?: Maybe<Scalars['Int']['output']>;
  /** 게시종료일 */
  unpublishedAt?: Maybe<Scalars['Date']['output']>;
  /** 조회수 */
  views?: Maybe<Scalars['Int']['output']>;
};

export type PostCategory = {
  __typename?: 'PostCategory';
  Posts: Array<Post>;
  /** 번호 */
  id: Scalars['ID']['output'];
  /** 제목 */
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  applicationFeed: PaginatedContestApplyResponse;
  broadcastFeed: PaginatedBroadcastResponse;
  contestsFeed: PaginatedContestResponse;
  donationFeed: PaginatedDonationResponse;
  findApplication: ContestApply;
  findBroadcast: WorkSupport;
  findContest: Contest;
  findDonation: Donation;
  findPost: Post;
  findPostCategory: PostCategory;
  findUser: User;
  getAdjacentPosts: AdjacentResponse;
  getApplicationByContest?: Maybe<ContestApply>;
  getMainContest: Array<Contest>;
  getMe: User;
  isSlugExist: Scalars['Boolean']['output'];
  postCategoryFeed: PaginatedPostCategoryResponse;
  postFeed: PaginatedPostResponse;
  userFeed: PaginatedUserResponse;
};


export type QueryApplicationFeedArgs = {
  pageRequest?: InputMaybe<PaginatedRequest>;
};


export type QueryBroadcastFeedArgs = {
  paginatedRequest?: InputMaybe<PaginatedRequest>;
};


export type QueryContestsFeedArgs = {
  pageRequest?: InputMaybe<PaginatedRequest>;
};


export type QueryDonationFeedArgs = {
  pageRequest?: InputMaybe<PaginatedRequest>;
};


export type QueryFindApplicationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindBroadcastArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindContestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindDonationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindPostArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindPostCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAdjacentPostsArgs = {
  id: Scalars['String']['input'];
  pageRequest?: InputMaybe<PaginatedRequest>;
};


export type QueryGetApplicationByContestArgs = {
  contestId: Scalars['ID']['input'];
};


export type QueryGetMainContestArgs = {
  pageRequest?: InputMaybe<PaginatedRequest>;
};


export type QueryIsSlugExistArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPostCategoryFeedArgs = {
  pageRequest?: InputMaybe<PaginatedRequest>;
};


export type QueryPostFeedArgs = {
  pageRequest?: InputMaybe<PaginatedRequest>;
};


export type QueryUserFeedArgs = {
  pageRequest?: InputMaybe<PaginatedRequest>;
};

export type ResetUserPwDto = {
  encKey: Scalars['String']['input'];
  plainPassword: Scalars['String']['input'];
};

export type SendContactEmailDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type SendPhoneVerifyTokenDto = {
  phone: Scalars['String']['input'];
};

export type SendPwTokenEmailDto = {
  email: Scalars['String']['input'];
};

export type SignInDto = {
  /** 애플용Nonce */
  appleNonce?: InputMaybe<Scalars['String']['input']>;
  /** 애플용유저정보 */
  appleUser?: InputMaybe<Scalars['String']['input']>;
  /** 소셜코드 */
  code?: InputMaybe<Scalars['String']['input']>;
  /** 디바이스아이디 */
  deviceId?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 입력비밀번호 */
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  /** 로그인타입 */
  type: Scalars['String']['input'];
};

export type SubNavigation = {
  __typename?: 'SubNavigation';
  href?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type UpdateApplicationDto = {
  applier1Address?: InputMaybe<Scalars['String']['input']>;
  applier1Age?: InputMaybe<Scalars['String']['input']>;
  applier1Birth?: InputMaybe<Scalars['Date']['input']>;
  applier1Carrier?: InputMaybe<Scalars['String']['input']>;
  applier1Company?: InputMaybe<Scalars['String']['input']>;
  applier1Email?: InputMaybe<Scalars['String']['input']>;
  applier1Etc?: InputMaybe<Scalars['String']['input']>;
  applier1Gender?: InputMaybe<Scalars['String']['input']>;
  applier1Mobile?: InputMaybe<Scalars['String']['input']>;
  applier1Name?: InputMaybe<Scalars['String']['input']>;
  applier1Role?: InputMaybe<Scalars['String']['input']>;
  applier1Scholar?: InputMaybe<Scalars['String']['input']>;
  applier1School?: InputMaybe<Scalars['String']['input']>;
  applier1SchoolEtc?: InputMaybe<Scalars['String']['input']>;
  applier1Zip?: InputMaybe<Scalars['String']['input']>;
  applier2Address?: InputMaybe<Scalars['String']['input']>;
  applier2Birth?: InputMaybe<Scalars['Date']['input']>;
  applier2Carrier?: InputMaybe<Scalars['String']['input']>;
  applier2Company?: InputMaybe<Scalars['String']['input']>;
  applier2Email?: InputMaybe<Scalars['String']['input']>;
  applier2Etc?: InputMaybe<Scalars['String']['input']>;
  applier2Gender?: InputMaybe<Scalars['String']['input']>;
  applier2Mobile?: InputMaybe<Scalars['String']['input']>;
  applier2Name?: InputMaybe<Scalars['String']['input']>;
  applier2Role?: InputMaybe<Scalars['String']['input']>;
  applier2Zip?: InputMaybe<Scalars['String']['input']>;
  applierType?: InputMaybe<Scalars['String']['input']>;
  applyBCPFYn?: InputMaybe<Scalars['String']['input']>;
  applyNumber?: InputMaybe<Scalars['String']['input']>;
  applyOtherOrgYn?: InputMaybe<Scalars['String']['input']>;
  channelLink?: InputMaybe<Scalars['String']['input']>;
  companyAddress?: InputMaybe<Scalars['String']['input']>;
  companyAsk?: InputMaybe<Scalars['String']['input']>;
  companyAttDate?: InputMaybe<Scalars['String']['input']>;
  companyAttWhy?: InputMaybe<Scalars['String']['input']>;
  companyCeo?: InputMaybe<Scalars['String']['input']>;
  companyCeoMobile?: InputMaybe<Scalars['String']['input']>;
  companyIntroduce?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyNameEng?: InputMaybe<Scalars['String']['input']>;
  companyParticipants?: InputMaybe<Scalars['String']['input']>;
  companyParticipantsAge?: InputMaybe<Scalars['String']['input']>;
  companyPhone?: InputMaybe<Scalars['String']['input']>;
  companyPin?: InputMaybe<Scalars['String']['input']>;
  companyZip?: InputMaybe<Scalars['String']['input']>;
  contestId?: InputMaybe<Scalars['Int']['input']>;
  contestType?: InputMaybe<Scalars['String']['input']>;
  contestTypeSub?: InputMaybe<Scalars['String']['input']>;
  experienceMediaEduYn?: InputMaybe<Scalars['Int']['input']>;
  file?: InputMaybe<Array<EmbedApplicantFileTypeInput>>;
  howToCome?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  passChasu?: InputMaybe<Scalars['String']['input']>;
  passStatus?: InputMaybe<Scalars['String']['input']>;
  programChannel?: InputMaybe<Scalars['String']['input']>;
  programCount?: InputMaybe<Scalars['String']['input']>;
  programGenre?: InputMaybe<Scalars['String']['input']>;
  programHasContractWithCompany?: InputMaybe<Scalars['Int']['input']>;
  programRegion?: InputMaybe<Scalars['String']['input']>;
  programRuntime?: InputMaybe<Scalars['String']['input']>;
  programRuntimeTotal?: InputMaybe<Scalars['String']['input']>;
  programTitle?: InputMaybe<Scalars['String']['input']>;
  trailerUrl?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateContestDto = {
  applyNumberPrefix?: InputMaybe<Scalars['String']['input']>;
  applyYn?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  contestType?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  file?: InputMaybe<Array<EmbedFileTypeInput>>;
  guideUrl?: InputMaybe<Scalars['String']['input']>;
  highlight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  snippet?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  statusId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  viewMain?: InputMaybe<Scalars['String']['input']>;
  views?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateDonationDto = {
  id: Scalars['ID']['input'];
  month?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  statusId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['Float']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostCategoryDto = {
  id: Scalars['ID']['input'];
  /** 제목 */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostDto = {
  /** 내용 */
  body?: InputMaybe<Scalars['String']['input']>;
  /** 카테고리 */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  /** 등록날짜 */
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  /** description */
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Array<EmbedFileTypeInput>>;
  id: Scalars['ID']['input'];
  /** keywords for page */
  keywords?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  /** meta description for page */
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  /** 상태 */
  noticeType?: InputMaybe<Scalars['Int']['input']>;
  /** 상단고정 */
  pin?: InputMaybe<Scalars['Int']['input']>;
  /** 미리보기 */
  preview?: InputMaybe<Scalars['String']['input']>;
  publishStatus?: InputMaybe<Scalars['Boolean']['input']>;
  /** 게시시작일 */
  publishedAt?: InputMaybe<Scalars['Date']['input']>;
  /** slug */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** sub title */
  subTitle?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']['input']>;
  /** 주제글번호 */
  topicId?: InputMaybe<Scalars['ID']['input']>;
  /** 글종류 */
  type?: InputMaybe<Scalars['Int']['input']>;
  /** 게시종료일 */
  unpublishedAt?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateUserDto = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserPhoneDto = {
  encKey: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UpdateUserProfileDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatarPath?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['Date']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  other?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['ID']['input'];
};

export type UpdateUserStatusDto = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  Likes?: Maybe<Array<Like>>;
  Posts?: Maybe<Array<Post>>;
  UserProfile?: Maybe<UserProfile>;
  UserTokens: Array<UserToken>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interpretedRole?: Maybe<Scalars['String']['output']>;
  pushToken?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  address?: Maybe<Scalars['String']['output']>;
  avatarPath?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['Date']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  other?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type UserToken = {
  __typename?: 'UserToken';
  User: User;
  createdAt: Scalars['String']['output'];
  expiredAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type WorkSupport = {
  __typename?: 'WorkSupport';
  awards: Scalars['String']['output'];
  broadcast: Scalars['String']['output'];
  configuration?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  edit: Scalars['String']['output'];
  genre: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  img1: Scalars['String']['output'];
  img2: Scalars['String']['output'];
  img3: Scalars['String']['output'];
  img4: Scalars['String']['output'];
  img5: Scalars['String']['output'];
  plan: Scalars['String']['output'];
  previewUrl: Scalars['String']['output'];
  producer?: Maybe<Scalars['String']['output']>;
  producers: Scalars['String']['output'];
  production?: Maybe<Scalars['String']['output']>;
  productionSupportDate?: Maybe<Scalars['Date']['output']>;
  publishers?: Maybe<Scalars['String']['output']>;
  shooting: Scalars['String']['output'];
  statusId: Scalars['Int']['output'];
  summaryInfo: Scalars['String']['output'];
  synopsis?: Maybe<Scalars['String']['output']>;
  theatersDate?: Maybe<Scalars['Date']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  vimeoUrl?: Maybe<Scalars['String']['output']>;
};

export type ApplicantCommonPartsFragment = { __typename?: 'ContestApply', id: string, contestId: number, contestType: string, contestTypeSub?: string | null, channelLink?: string | null, applyNumber: string, programTitle?: string | null, programGenre?: string | null, programRuntime?: string | null, programChannel?: string | null, programCount?: string | null, programRuntimeTotal?: string | null, programHasContractWithCompany?: number | null, experienceMediaEduYn?: number | null, applyOtherOrgYn?: string | null, trailerUrl?: string | null, applier1Name: string, applier1Mobile: string, applier1Email: string, applier1Role?: string | null, applier1Birth?: any | null, applier1Company?: string | null, applier1Carrier?: string | null, applier1Etc?: string | null, applier2Name?: string | null, applier2Mobile?: string | null, applier2Email?: string | null, applier2Role?: string | null, applier2Birth?: any | null, applier2Company?: string | null, applier2Carrier?: string | null, applier2Etc?: string | null, companyName?: string | null, companyNameEng?: string | null, companyPin?: string | null, companyZip?: string | null, companyAddress?: string | null, companyAsk?: string | null, companyParticipantsAge?: string | null, companyIntroduce?: string | null, companyParticipants?: string | null, companyAttWhy?: string | null, companyAttDate?: string | null, companyPhone?: string | null, companyCeo?: string | null, companyCeoMobile?: string | null, passChasu: string, passStatus: string, userId: number, createdAt: any, updatedAt?: any | null, applierType: string, applier1Zip?: string | null, applier1Address: string, applier2Zip?: string | null, applier2Address?: string | null, applier1School?: string | null, applier1Scholar?: string | null, applier1SchoolEtc?: string | null, applier1Age?: string | null, applier1Gender?: string | null, applier2Gender?: string | null, applyBCPFYn?: string | null, howToCome?: string | null, file?: Array<{ __typename?: 'EmbedApplyFileType', url: string, filename: string, type: FileType, key?: string | null }> | null, Contest?: (
    { __typename?: 'Contest' }
    & ContestCommonPartsFragment
  ) | null };

export type CreateApplicantMutationVariables = Exact<{
  input: CreateApplicantDto;
}>;


export type CreateApplicantMutation = { __typename?: 'Mutation', createApplication: { __typename?: 'ContestApply', id: string } };

export type ApplicationFeedQueryVariables = Exact<{
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type ApplicationFeedQuery = { __typename?: 'Query', applicationFeed: { __typename?: 'PaginatedContestApplyResponse', page?: number | null, pageSize?: number | null, pageCount: number, itemCount: number, hasNextPage: boolean, hasPreviousPage: boolean, list: Array<(
      { __typename?: 'ContestApply' }
      & ApplicantCommonPartsFragment
    )> } };

export type UpdateApplicationMutationVariables = Exact<{
  input: UpdateApplicationDto;
}>;


export type UpdateApplicationMutation = { __typename?: 'Mutation', updateApplication: { __typename?: 'ContestApply', id: string } };

export type FindApplicationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindApplicationQuery = { __typename?: 'Query', findApplication: (
    { __typename?: 'ContestApply' }
    & ApplicantCommonPartsFragment
  ) };

export type GetApplicationByContestQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetApplicationByContestQuery = { __typename?: 'Query', getApplicationByContest?: (
    { __typename?: 'ContestApply' }
    & ApplicantCommonPartsFragment
  ) | null };

export type DeleteApplicationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteApplicationMutation = { __typename?: 'Mutation', deleteApplication: boolean };

export type SignInMutationVariables = Exact<{
  input: SignInDto;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: Array<string> };

export type ValidateRefreshJwtMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ValidateRefreshJwtMutation = { __typename?: 'Mutation', validateRefreshJwt: string };

export type UpdateUserMutationVariables = Exact<{
  updateUserDto: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type UpdateUserProfileMutationVariables = Exact<{
  updateUserProfileDto: UpdateUserProfileDto;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: boolean };

export type SendPhoneVerifyTokenMutationVariables = Exact<{
  sendPhoneVerifyTokenDto: SendPhoneVerifyTokenDto;
}>;


export type SendPhoneVerifyTokenMutation = { __typename?: 'Mutation', sendPhoneVerifyToken: boolean };

export type UpdateUserPhoneMutationVariables = Exact<{
  updateUserPhoneDto: UpdateUserPhoneDto;
}>;


export type UpdateUserPhoneMutation = { __typename?: 'Mutation', updateUserPhone: boolean };

export type UserCommonPartsFragment = { __typename?: 'User', id: string, pushToken?: string | null, email?: string | null, status?: number | null, role?: string | null, createdAt?: any | null, updatedAt?: any | null, UserProfile?: { __typename?: 'UserProfile', birthday?: any | null, gender?: number | null, phone?: string | null, name?: string | null, address?: string | null } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: (
    { __typename?: 'User' }
    & UserCommonPartsFragment
  ) };

export type UserFeedQueryVariables = Exact<{
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type UserFeedQuery = { __typename?: 'Query', userFeed: { __typename?: 'PaginatedUserResponse', page?: number | null, pageSize?: number | null, pageCount: number, itemCount: number, hasNextPage: boolean, hasPreviousPage: boolean, list: Array<(
      { __typename?: 'User' }
      & UserCommonPartsFragment
    )> } };

export type FindUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: (
    { __typename?: 'User' }
    & UserCommonPartsFragment
  ) };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: (
    { __typename?: 'User' }
    & UserCommonPartsFragment
  ) };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type DoctorFullPartsFragment = { __typename?: 'User', id: string, status?: number | null, UserProfile?: { __typename?: 'UserProfile', userId: string, name?: string | null, avatarPath?: string | null, description?: string | null, timezone?: string | null, phone?: string | null } | null };

export type PostCommonPartsFragment = { __typename?: 'Post', id: string, categoryId: string, topicId?: string | null, type?: number | null, sort?: number | null, title: string, subTitle?: string | null, description?: string | null, views?: number | null, body?: string | null, publishedAt?: any | null, publishStatus?: boolean | null, slug?: string | null, language?: string | null, unpublishedAt?: any | null, noticeType?: number | null, likeCount?: number | null, commentCount?: number | null, pin?: number | null, keywords?: string | null, metaDescription?: string | null, tags?: string | null, createdAt?: any | null, createdBy: string, Category: { __typename?: 'PostCategory', title: string }, User: (
    { __typename?: 'User' }
    & DoctorFullPartsFragment
  ), file?: Array<{ __typename?: 'EmbedFileType', url: string, filename: string, type: FileType }> | null };

export type PostFeedQueryVariables = Exact<{
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type PostFeedQuery = { __typename?: 'Query', postFeed: { __typename?: 'PaginatedPostResponse', page?: number | null, pageSize?: number | null, pageCount: number, itemCount: number, hasNextPage: boolean, hasPreviousPage: boolean, list: Array<(
      { __typename?: 'Post' }
      & PostCommonPartsFragment
    )> } };

export type FindPostQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindPostQuery = { __typename?: 'Query', findPost: (
    { __typename?: 'Post' }
    & PostCommonPartsFragment
  ) };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostDto;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostDto;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type IsSlugExistQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type IsSlugExistQuery = { __typename?: 'Query', isSlugExist: boolean };

export type PostFeedCountQueryVariables = Exact<{
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type PostFeedCountQuery = { __typename?: 'Query', postFeed: { __typename?: 'PaginatedPostResponse', itemCount: number } };

export type GetAdjacentPostsQueryVariables = Exact<{
  id: Scalars['String']['input'];
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type GetAdjacentPostsQuery = { __typename?: 'Query', getAdjacentPosts: { __typename?: 'AdjacentResponse', previous?: { __typename?: 'Post', id: string, title: string, slug?: string | null, pin?: number | null, tags?: string | null } | null, next?: { __typename?: 'Post', id: string, title: string, slug?: string | null, pin?: number | null, tags?: string | null } | null } };

export type BroadcastCommonPartsFragment = { __typename?: 'WorkSupport', id: string, type: number, title: string, genre: string, summaryInfo: string, broadcast: string, theatersDate?: any | null, productionSupportDate?: any | null, producer?: string | null, publishers?: string | null, vimeoUrl?: string | null, synopsis?: string | null, production?: string | null, configuration?: string | null, plan: string, shooting: string, edit: string, producers: string, awards: string, previewUrl: string, img1: string, img2: string, img3: string, img4: string, img5: string, statusId: number, createdAt: any, updatedAt?: any | null };

export type FindBroadcastQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindBroadcastQuery = { __typename?: 'Query', findBroadcast: (
    { __typename?: 'WorkSupport' }
    & BroadcastCommonPartsFragment
  ) };

export type BroadcastFeedQueryVariables = Exact<{
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type BroadcastFeedQuery = { __typename?: 'Query', broadcastFeed: { __typename?: 'PaginatedBroadcastResponse', page?: number | null, pageSize?: number | null, pageCount: number, itemCount: number, hasNextPage: boolean, hasPreviousPage: boolean, list: Array<(
      { __typename?: 'WorkSupport' }
      & BroadcastCommonPartsFragment
    )> } };

export type ContestCommonPartsFragment = { __typename?: 'Contest', id: string, snippet: string, content?: string | null, views: number, applyYn: number, statusId: number, startDate?: any | null, endDate?: any | null, userId?: string | null, contestType: string, createdAt?: any | null, updatedAt?: any | null, title: string, applyNumberPrefix: string, viewMain?: string | null, guideUrl?: string | null, highlight?: string | null, sort?: number | null, file?: Array<{ __typename?: 'EmbedFileType', url: string, filename: string, type: FileType }> | null, Application?: Array<{ __typename?: 'ContestApply', id: string, programTitle?: string | null, applier1Name: string, applier1Email: string, createdAt: any }> | null };

export type CreateContestMutationVariables = Exact<{
  input: CreateContestDto;
}>;


export type CreateContestMutation = { __typename?: 'Mutation', createContest: { __typename?: 'Contest', id: string } };

export type FindContestQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindContestQuery = { __typename?: 'Query', findContest: (
    { __typename?: 'Contest' }
    & ContestCommonPartsFragment
  ) };

export type ContestsFeedQueryVariables = Exact<{
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type ContestsFeedQuery = { __typename?: 'Query', contestsFeed: { __typename?: 'PaginatedContestResponse', page?: number | null, pageSize?: number | null, pageCount: number, itemCount: number, hasNextPage: boolean, hasPreviousPage: boolean, list: Array<(
      { __typename?: 'Contest' }
      & ContestCommonPartsFragment
    )> } };

export type UpdateContestMutationVariables = Exact<{
  input: UpdateContestDto;
}>;


export type UpdateContestMutation = { __typename?: 'Mutation', updateContest: { __typename?: 'Contest', id: string } };

export type DeleteContestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteContestMutation = { __typename?: 'Mutation', deleteContest: boolean };

export type GetMainContestQueryVariables = Exact<{
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type GetMainContestQuery = { __typename?: 'Query', getMainContest: Array<(
    { __typename?: 'Contest' }
    & ContestCommonPartsFragment
  )> };

export type DonationCommonPartsFragment = { __typename?: 'Donation', id: string, names: string, type: number, year: string, month: string, price: string, createdAt?: any | null, updatedAt?: any | null };

export type CreateDonationMutationVariables = Exact<{
  input: CreateDonationDto;
}>;


export type CreateDonationMutation = { __typename?: 'Mutation', createDonation: { __typename?: 'Donation', id: string } };

export type FindDonationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindDonationQuery = { __typename?: 'Query', findDonation: (
    { __typename?: 'Donation' }
    & DonationCommonPartsFragment
  ) };

export type DonationFeedQueryVariables = Exact<{
  pageRequest?: InputMaybe<PaginatedRequest>;
}>;


export type DonationFeedQuery = { __typename?: 'Query', donationFeed: { __typename?: 'PaginatedDonationResponse', page?: number | null, pageSize?: number | null, pageCount: number, itemCount: number, hasNextPage: boolean, hasPreviousPage: boolean, list: Array<(
      { __typename?: 'Donation' }
      & DonationCommonPartsFragment
    )> } };

export type UpdateDonationMutationVariables = Exact<{
  input: UpdateDonationDto;
}>;


export type UpdateDonationMutation = { __typename?: 'Mutation', updateDonation: { __typename?: 'Donation', id: string } };

export type DeleteDonationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDonationMutation = { __typename?: 'Mutation', deleteDonation: boolean };

export type CreatePresignedPostMutationVariables = Exact<{
  type: Scalars['String']['input'];
  path: Scalars['String']['input'];
}>;


export type CreatePresignedPostMutation = { __typename?: 'Mutation', createPresignedPost: string };

export const ContestCommonPartsFragmentDoc = gql`
    fragment ContestCommonParts on Contest {
  id
  snippet
  content
  file {
    url
    filename
    type
  }
  views
  applyYn
  statusId
  startDate
  endDate
  userId
  contestType
  createdAt
  updatedAt
  title
  applyNumberPrefix
  viewMain
  guideUrl
  highlight
  sort
  Application {
    id
    programTitle
    applier1Name
    applier1Email
    createdAt
  }
}
    `;
export const ApplicantCommonPartsFragmentDoc = gql`
    fragment ApplicantCommonParts on ContestApply {
  id
  contestId
  contestType
  contestTypeSub
  channelLink
  applyNumber
  programTitle
  programGenre
  programRuntime
  programChannel
  programCount
  programRuntimeTotal
  programHasContractWithCompany
  experienceMediaEduYn
  applyOtherOrgYn
  trailerUrl
  applier1Name
  applier1Mobile
  applier1Email
  applier1Role
  applier1Birth
  applier1Company
  applier1Carrier
  applier1Etc
  applier2Name
  applier2Mobile
  applier2Email
  applier2Role
  applier2Birth
  applier2Company
  applier2Carrier
  applier2Etc
  companyName
  companyNameEng
  companyPin
  companyZip
  companyAddress
  companyAsk
  companyParticipantsAge
  companyIntroduce
  companyParticipants
  companyAttWhy
  companyAttDate
  companyPhone
  companyCeo
  companyCeoMobile
  passChasu
  passStatus
  file {
    url
    filename
    type
    key
  }
  userId
  createdAt
  updatedAt
  applierType
  applier1Zip
  applier1Address
  applier2Zip
  applier2Address
  applier1School
  applier1Scholar
  applier1SchoolEtc
  applier1Age
  applier1Gender
  applier2Gender
  applyBCPFYn
  howToCome
  Contest {
    ...ContestCommonParts
  }
}
    `;
export const UserCommonPartsFragmentDoc = gql`
    fragment UserCommonParts on User {
  id
  pushToken
  email
  status
  role
  UserProfile {
    birthday
    gender
    phone
    name
    address
  }
  createdAt
  updatedAt
}
    `;
export const DoctorFullPartsFragmentDoc = gql`
    fragment DoctorFullParts on User {
  id
  status
  UserProfile {
    userId
    name
    avatarPath
    description
    timezone
    phone
  }
}
    `;
export const PostCommonPartsFragmentDoc = gql`
    fragment PostCommonParts on Post {
  id
  categoryId
  Category {
    title
  }
  topicId
  type
  sort
  title
  subTitle
  description
  views
  body
  description
  publishedAt
  publishStatus
  slug
  language
  unpublishedAt
  noticeType
  likeCount
  commentCount
  pin
  keywords
  metaDescription
  tags
  User {
    ...DoctorFullParts
  }
  file {
    url
    filename
    type
  }
  createdAt
  createdBy
}
    `;
export const BroadcastCommonPartsFragmentDoc = gql`
    fragment BroadcastCommonParts on WorkSupport {
  id
  type
  title
  genre
  summaryInfo
  broadcast
  theatersDate
  productionSupportDate
  producer
  publishers
  vimeoUrl
  synopsis
  production
  configuration
  plan
  shooting
  edit
  producers
  awards
  previewUrl
  img1
  img2
  img3
  img4
  img5
  statusId
  createdAt
  updatedAt
}
    `;
export const DonationCommonPartsFragmentDoc = gql`
    fragment DonationCommonParts on Donation {
  id
  names
  type
  year
  month
  price
  createdAt
  updatedAt
}
    `;
export const CreateApplicantDocument = gql`
    mutation createApplicant($input: CreateApplicantDTO!) {
  createApplication(input: $input) {
    id
  }
}
    `;
export const ApplicationFeedDocument = gql`
    query ApplicationFeed($pageRequest: PaginatedRequest) {
  applicationFeed(pageRequest: $pageRequest) {
    list {
      ...ApplicantCommonParts
    }
    page
    pageSize
    pageCount
    itemCount
    hasNextPage
    hasPreviousPage
  }
}
    ${ApplicantCommonPartsFragmentDoc}
${ContestCommonPartsFragmentDoc}`;
export const UpdateApplicationDocument = gql`
    mutation updateApplication($input: UpdateApplicationDTO!) {
  updateApplication(input: $input) {
    id
  }
}
    `;
export const FindApplicationDocument = gql`
    query findApplication($id: ID!) {
  findApplication(id: $id) {
    ...ApplicantCommonParts
  }
}
    ${ApplicantCommonPartsFragmentDoc}
${ContestCommonPartsFragmentDoc}`;
export const GetApplicationByContestDocument = gql`
    query getApplicationByContest($id: ID!) {
  getApplicationByContest(contestId: $id) {
    ...ApplicantCommonParts
  }
}
    ${ApplicantCommonPartsFragmentDoc}
${ContestCommonPartsFragmentDoc}`;
export const DeleteApplicationDocument = gql`
    mutation deleteApplication($id: ID!) {
  deleteApplication(id: $id)
}
    `;
export const SignInDocument = gql`
    mutation signIn($input: SignInDto!) {
  signIn(signInDto: $input)
}
    `;
export const ValidateRefreshJwtDocument = gql`
    mutation validateRefreshJwt($token: String!) {
  validateRefreshJwt(token: $token)
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($updateUserDto: UpdateUserDto!) {
  updateUser(updateUserDto: $updateUserDto) {
    id
  }
}
    `;
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($updateUserProfileDto: UpdateUserProfileDto!) {
  updateUserProfile(updateUserProfileDto: $updateUserProfileDto)
}
    `;
export const SendPhoneVerifyTokenDocument = gql`
    mutation sendPhoneVerifyToken($sendPhoneVerifyTokenDto: SendPhoneVerifyTokenDto!) {
  sendPhoneVerifyToken(sendPhoneVerifyTokenDto: $sendPhoneVerifyTokenDto)
}
    `;
export const UpdateUserPhoneDocument = gql`
    mutation updateUserPhone($updateUserPhoneDto: UpdateUserPhoneDto!) {
  updateUserPhone(updateUserPhoneDto: $updateUserPhoneDto)
}
    `;
export const GetMeDocument = gql`
    query getMe {
  getMe {
    ...UserCommonParts
  }
}
    ${UserCommonPartsFragmentDoc}`;
export const UserFeedDocument = gql`
    query userFeed($pageRequest: PaginatedRequest) {
  userFeed(pageRequest: $pageRequest) {
    list {
      ...UserCommonParts
    }
    page
    pageSize
    pageCount
    itemCount
    hasNextPage
    hasPreviousPage
  }
}
    ${UserCommonPartsFragmentDoc}`;
export const FindUserDocument = gql`
    query findUser($id: ID!) {
  findUser(id: $id) {
    ...UserCommonParts
  }
}
    ${UserCommonPartsFragmentDoc}`;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserDto!) {
  createUser(input: $input) {
    ...UserCommonParts
  }
}
    ${UserCommonPartsFragmentDoc}`;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export const PostFeedDocument = gql`
    query postFeed($pageRequest: PaginatedRequest) {
  postFeed(pageRequest: $pageRequest) {
    list {
      ...PostCommonParts
    }
    page
    pageSize
    pageCount
    itemCount
    hasNextPage
    hasPreviousPage
  }
}
    ${PostCommonPartsFragmentDoc}
${DoctorFullPartsFragmentDoc}`;
export const FindPostDocument = gql`
    query findPost($id: String!) {
  findPost(id: $id) {
    ...PostCommonParts
  }
}
    ${PostCommonPartsFragmentDoc}
${DoctorFullPartsFragmentDoc}`;
export const CreatePostDocument = gql`
    mutation createPost($input: CreatePostDTO!) {
  createPost(input: $input) {
    id
  }
}
    `;
export const UpdatePostDocument = gql`
    mutation updatePost($input: UpdatePostDTO!) {
  updatePost(input: $input) {
    id
  }
}
    `;
export const DeletePostDocument = gql`
    mutation deletePost($id: ID!) {
  deletePost(id: $id)
}
    `;
export const IsSlugExistDocument = gql`
    query isSlugExist($slug: String!) {
  isSlugExist(slug: $slug)
}
    `;
export const PostFeedCountDocument = gql`
    query postFeedCount($pageRequest: PaginatedRequest) {
  postFeed(pageRequest: $pageRequest) {
    itemCount
  }
}
    `;
export const GetAdjacentPostsDocument = gql`
    query getAdjacentPosts($id: String!, $pageRequest: PaginatedRequest) {
  getAdjacentPosts(id: $id, pageRequest: $pageRequest) {
    previous {
      id
      title
      slug
      pin
      tags
    }
    next {
      id
      title
      slug
      pin
      tags
    }
  }
}
    `;
export const FindBroadcastDocument = gql`
    query findBroadcast($id: ID!) {
  findBroadcast(id: $id) {
    ...BroadcastCommonParts
  }
}
    ${BroadcastCommonPartsFragmentDoc}`;
export const BroadcastFeedDocument = gql`
    query broadcastFeed($pageRequest: PaginatedRequest) {
  broadcastFeed(paginatedRequest: $pageRequest) {
    list {
      ...BroadcastCommonParts
    }
    page
    pageSize
    pageCount
    itemCount
    hasNextPage
    hasPreviousPage
  }
}
    ${BroadcastCommonPartsFragmentDoc}`;
export const CreateContestDocument = gql`
    mutation createContest($input: CreateContestDTO!) {
  createContest(input: $input) {
    id
  }
}
    `;
export const FindContestDocument = gql`
    query findContest($id: ID!) {
  findContest(id: $id) {
    ...ContestCommonParts
  }
}
    ${ContestCommonPartsFragmentDoc}`;
export const ContestsFeedDocument = gql`
    query ContestsFeed($pageRequest: PaginatedRequest) {
  contestsFeed(pageRequest: $pageRequest) {
    list {
      ...ContestCommonParts
    }
    page
    pageSize
    pageCount
    itemCount
    hasNextPage
    hasPreviousPage
  }
}
    ${ContestCommonPartsFragmentDoc}`;
export const UpdateContestDocument = gql`
    mutation updateContest($input: UpdateContestDTO!) {
  updateContest(input: $input) {
    id
  }
}
    `;
export const DeleteContestDocument = gql`
    mutation deleteContest($id: ID!) {
  deleteContest(id: $id)
}
    `;
export const GetMainContestDocument = gql`
    query getMainContest($pageRequest: PaginatedRequest) {
  getMainContest(pageRequest: $pageRequest) {
    ...ContestCommonParts
  }
}
    ${ContestCommonPartsFragmentDoc}`;
export const CreateDonationDocument = gql`
    mutation createDonation($input: CreateDonationDTO!) {
  createDonation(input: $input) {
    id
  }
}
    `;
export const FindDonationDocument = gql`
    query findDonation($id: ID!) {
  findDonation(id: $id) {
    ...DonationCommonParts
  }
}
    ${DonationCommonPartsFragmentDoc}`;
export const DonationFeedDocument = gql`
    query donationFeed($pageRequest: PaginatedRequest) {
  donationFeed(pageRequest: $pageRequest) {
    list {
      ...DonationCommonParts
    }
    page
    pageSize
    pageCount
    itemCount
    hasNextPage
    hasPreviousPage
  }
}
    ${DonationCommonPartsFragmentDoc}`;
export const UpdateDonationDocument = gql`
    mutation updateDonation($input: UpdateDonationDTO!) {
  updateDonation(input: $input) {
    id
  }
}
    `;
export const DeleteDonationDocument = gql`
    mutation deleteDonation($id: ID!) {
  deleteDonation(id: $id)
}
    `;
export const CreatePresignedPostDocument = gql`
    mutation createPresignedPost($type: String!, $path: String!) {
  createPresignedPost(type: $type, path: $path)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createApplicant(variables: CreateApplicantMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateApplicantMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateApplicantMutation>(CreateApplicantDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createApplicant', 'mutation', variables);
    },
    ApplicationFeed(variables?: ApplicationFeedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ApplicationFeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ApplicationFeedQuery>(ApplicationFeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ApplicationFeed', 'query', variables);
    },
    updateApplication(variables: UpdateApplicationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateApplicationMutation>(UpdateApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateApplication', 'mutation', variables);
    },
    findApplication(variables: FindApplicationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindApplicationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindApplicationQuery>(FindApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findApplication', 'query', variables);
    },
    getApplicationByContest(variables: GetApplicationByContestQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetApplicationByContestQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetApplicationByContestQuery>(GetApplicationByContestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getApplicationByContest', 'query', variables);
    },
    deleteApplication(variables: DeleteApplicationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteApplicationMutation>(DeleteApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteApplication', 'mutation', variables);
    },
    signIn(variables: SignInMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SignInMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignInMutation>(SignInDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signIn', 'mutation', variables);
    },
    validateRefreshJwt(variables: ValidateRefreshJwtMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ValidateRefreshJwtMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ValidateRefreshJwtMutation>(ValidateRefreshJwtDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'validateRefreshJwt', 'mutation', variables);
    },
    updateUser(variables: UpdateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUser', 'mutation', variables);
    },
    updateUserProfile(variables: UpdateUserProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateUserProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserProfileMutation>(UpdateUserProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUserProfile', 'mutation', variables);
    },
    sendPhoneVerifyToken(variables: SendPhoneVerifyTokenMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SendPhoneVerifyTokenMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendPhoneVerifyTokenMutation>(SendPhoneVerifyTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sendPhoneVerifyToken', 'mutation', variables);
    },
    updateUserPhone(variables: UpdateUserPhoneMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateUserPhoneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserPhoneMutation>(UpdateUserPhoneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUserPhone', 'mutation', variables);
    },
    getMe(variables?: GetMeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMeQuery>(GetMeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMe', 'query', variables);
    },
    userFeed(variables?: UserFeedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserFeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserFeedQuery>(UserFeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userFeed', 'query', variables);
    },
    findUser(variables: FindUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindUserQuery>(FindUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findUser', 'query', variables);
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation', variables);
    },
    deleteUser(variables: DeleteUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteUser', 'mutation', variables);
    },
    postFeed(variables?: PostFeedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PostFeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostFeedQuery>(PostFeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'postFeed', 'query', variables);
    },
    findPost(variables: FindPostQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindPostQuery>(FindPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findPost', 'query', variables);
    },
    createPost(variables: CreatePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPost', 'mutation', variables);
    },
    updatePost(variables: UpdatePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePostMutation>(UpdatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updatePost', 'mutation', variables);
    },
    deletePost(variables: DeletePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeletePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePostMutation>(DeletePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deletePost', 'mutation', variables);
    },
    isSlugExist(variables: IsSlugExistQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<IsSlugExistQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IsSlugExistQuery>(IsSlugExistDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'isSlugExist', 'query', variables);
    },
    postFeedCount(variables?: PostFeedCountQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PostFeedCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostFeedCountQuery>(PostFeedCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'postFeedCount', 'query', variables);
    },
    getAdjacentPosts(variables: GetAdjacentPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAdjacentPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAdjacentPostsQuery>(GetAdjacentPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAdjacentPosts', 'query', variables);
    },
    findBroadcast(variables: FindBroadcastQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindBroadcastQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindBroadcastQuery>(FindBroadcastDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findBroadcast', 'query', variables);
    },
    broadcastFeed(variables?: BroadcastFeedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BroadcastFeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BroadcastFeedQuery>(BroadcastFeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'broadcastFeed', 'query', variables);
    },
    createContest(variables: CreateContestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateContestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateContestMutation>(CreateContestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createContest', 'mutation', variables);
    },
    findContest(variables: FindContestQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindContestQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindContestQuery>(FindContestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findContest', 'query', variables);
    },
    ContestsFeed(variables?: ContestsFeedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ContestsFeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ContestsFeedQuery>(ContestsFeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ContestsFeed', 'query', variables);
    },
    updateContest(variables: UpdateContestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateContestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateContestMutation>(UpdateContestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateContest', 'mutation', variables);
    },
    deleteContest(variables: DeleteContestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteContestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteContestMutation>(DeleteContestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteContest', 'mutation', variables);
    },
    getMainContest(variables?: GetMainContestQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMainContestQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMainContestQuery>(GetMainContestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMainContest', 'query', variables);
    },
    createDonation(variables: CreateDonationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateDonationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDonationMutation>(CreateDonationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createDonation', 'mutation', variables);
    },
    findDonation(variables: FindDonationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindDonationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindDonationQuery>(FindDonationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findDonation', 'query', variables);
    },
    donationFeed(variables?: DonationFeedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DonationFeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DonationFeedQuery>(DonationFeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'donationFeed', 'query', variables);
    },
    updateDonation(variables: UpdateDonationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateDonationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDonationMutation>(UpdateDonationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateDonation', 'mutation', variables);
    },
    deleteDonation(variables: DeleteDonationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteDonationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteDonationMutation>(DeleteDonationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteDonation', 'mutation', variables);
    },
    createPresignedPost(variables: CreatePresignedPostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePresignedPostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePresignedPostMutation>(CreatePresignedPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPresignedPost', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;