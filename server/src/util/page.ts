import { Type } from '@nestjs/common';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import _ from 'lodash';

export type SORT_TYPE = 'ASC' | 'DESC';

@ObjectType()
@InputType()
export class PaginatedRequest {
  static of(graphqlInput: Partial<PaginatedRequest>) {
    return new PaginatedRequest(graphqlInput);
  }

  constructor(graphqlInput?: Partial<PaginatedRequest>) {
    this.page = _.get(graphqlInput, 'page', 1);
    this.pageSize = _.get(graphqlInput, 'pageSize', 12); //3
    this.query = _.get(graphqlInput, 'query', '');
    this.sortBy = _.get(graphqlInput, 'sortBy', '');
    this.sortType =
      _.get(graphqlInput, 'sortType', 'ASC').toUpperCase() == 'ASC'
        ? 'ASC'
        : 'DESC';
    this.filter = graphqlInput?.filter;
    this.type = _.get(graphqlInput, 'type');
    this.status = _.get(graphqlInput, 'status');
    this.year = _.get(graphqlInput, 'year');
    this.categoryId = _.get(graphqlInput, 'categoryId');
    this.contestId = _.get(graphqlInput, 'contestId');
    this.searchBy = _.get(graphqlInput, 'searchBy', '');
    this.viewMain = _.get(graphqlInput, 'viewMain', '');
    this.client = graphqlInput?.client;
    this.from = _.get(graphqlInput, 'from');
    this.to = _.get(graphqlInput, 'to');
  }

  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => Int, { nullable: true })
  @Min(1)
  page: number;

  @Field(() => Boolean, { nullable: true })
  client: boolean;

  @Field(() => Int, { nullable: true })
  @Max(9999999)
  @Min(3)
  pageSize: number;

  @Field(() => String, { nullable: true })
  query: string;

  @Field(() => String, { nullable: true })
  filter: string;

  @Field(() => String, { defaultValue: null, nullable: true })
  type: string;

  @Field(() => Int, { defaultValue: null, nullable: true })
  status: number;

  @Field(() => String, { defaultValue: null, nullable: true })
  year: string;

  @Field(() => Int, { nullable: true })
  categoryId: number;

  @Field(() => Int, { nullable: true })
  contestId: string;

  @Field(() => String, { nullable: true })
  viewMain: string;

  @Field(() => String, { nullable: true })
  searchBy: string;

  // date filter
  @Field(() => Date, { nullable: true })
  from: Date;

  @Field(() => Date, { nullable: true })
  to: Date;

  @Field(() => String, { nullable: true })
  sortBy: string;

  @Field(() => String, { nullable: true })
  sortType: SORT_TYPE;

  // @Field(() => String, { defaultValue: '', nullable: true })
  // filters: string;

  get pagination(): { skip: number; take: number } {
    return {
      skip: (this.page - 1) * this.pageSize,
      take: this.pageSize,
    };
  }

  get filters(): JSON {
    try {
      const json = JSON.parse(this.filter);
      return json;
    } catch (e) {
      return null;
    }
  }
}

@ObjectType()
export class PaginatedResponse<T> extends PaginatedRequest {
  list: T[];

  @Field(() => Int)
  pageCount;

  private _itemCount: number;

  @Field(() => Int)
  get itemCount(): number {
    return this._itemCount;
  }

  set itemCount(value: number) {
    this._itemCount = value;
    this.pageCount = Math.ceil(value / this.pageSize);
  }

  @Field(() => Boolean)
  get hasNextPage(): boolean {
    return this.page < this.pageCount;
  }

  @Field(() => Boolean)
  get hasPreviousPage(): boolean {
    return this.page > 1;
  }

  constructor(
    list: T[],
    itemCount: number,
    paginatedRequest?: PaginatedRequest
  ) {
    super();
    if (paginatedRequest) {
      // this.id = paginatedRequest.page + 'fdsa' + itemCount + format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      this.page = paginatedRequest.page;
      this.pageSize = paginatedRequest.pageSize;
    }
    this.list = list;
    this.itemCount = itemCount;
  }
}

export function GqlPaginatedResponse<TItem>(
  TItemClass: Type<TItem>
): Type<PaginatedResponse<TItem>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass<
    TItem,
  > extends PaginatedResponse<TItem> {
    @Field(() => [TItemClass])
    list: TItem[];
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return PaginatedResponseClass;
}
