import { Brackets, SelectQueryBuilder } from 'typeorm';

import $ from './exception.helper';
import { fDateTime } from './datetime';
import { PaginatedRequest } from './page';

type DateField =
  | 'createdAt'
  | 'updatedAt'
  | 'publishedAt'
  | 'unpublishedAt'
  | 'theatersDate';

type EntityAlias =
  | 'user'
  | 'post'
  | 'postCategory'
  | 'page'
  | 'donations'
  | 'contests'
  | 'broadcast'
  | 'apply';

export type EntityKeys<T> = {
  [K in keyof T]: K;
}[keyof T];

/**
 * can be used to filter data by date range for the feeds
 * @param qb the query builder
 * @param requestedRange the date range to be filtered (comes in filters json)
 * @param field the name of the date field in the entity
 * @param entityAlias entity alias used for the query builder passed in
 * 
 * @example
 * const requestedRange = filters?.createdAt;
    if (requestedRange) {
      dateRangeFilter(qb, requestedRange, 'createdAt', 'post'); // filters posts on post.createdAt field
    }
 */
export const dateRangeFilter = <T>(
  qb: SelectQueryBuilder<T>,
  requestedRange: string,
  field: DateField,
  entityAlias: EntityAlias
) => {
  try {
    const [from, to] = requestedRange
      .split('~')
      .map((date) => fDateTime(date.trim()));

    if (from && to) {
      qb.andWhere(`${entityAlias}.${field} BETWEEN :from AND :to`, {
        from,
        to,
      });
    } else {
      $.throw('Invalid date range format');
    }
  } catch (e) {
    // console.error(e);
    $.throw(`Error parsing date range: ${e.message}`);
  }
};

/**
 * can be used to apply search queries in the feeds
 * @param qb the query builder
 * @param alias  entity alias used for the query builder passed in
 * @param fields the fields that need to be searched on
 * @param query the query string
 * @returns 
 * 
 * @example
 *  if (pageRequest.query)
      applySearchQueries(qb, 'post', ['title', 'body'], pageRequest.query); // applies search on title, body fields of post entity
 */
export const applySearchQueries = <T>(
  qb: SelectQueryBuilder<T>,
  alias: EntityAlias,
  fields: EntityKeys<T>[],
  query: string
): SelectQueryBuilder<T> => {
  return qb.andWhere(
    new Brackets((qb) => {
      fields.forEach((field, index) => {
        const parameterName = `search${index}`;
        if (index === 0) {
          qb.where(`${alias}.${String(field)} LIKE :${parameterName}`, {
            [parameterName]: `%${query}%`,
          });
        } else {
          qb.orWhere(`${alias}.${String(field)} LIKE :${parameterName}`, {
            [parameterName]: `%${query}%`,
          });
        }
      });
    })
  );
};

/**
 * use to add sorting for paginated feeds
 * @param qb query builder
 * @param alias entity alias
 * @param paginatedRequest pagination request
 * @example
 * applySorting(qb, 'contests', pageRequest); // apply sorting to contests feed
 */
export const applySorting = <T>(
  qb: SelectQueryBuilder<T>,
  alias: EntityAlias,
  paginatedRequest: PaginatedRequest
) => {
  const { sortBy, sortType } = paginatedRequest;

  if (sortBy && sortType) {
    const direction = sortType === 'ASC' ? 'ASC' : 'DESC';
    qb.orderBy(`${alias}.${sortBy}`, direction);
  }
};

/**
 * Applies date filters to a query builder.
 * @param qb - query builder
 * @param alias - entity alias
 * @param dateFields - The fields to apply the date filters on.
 * @param pageRequest - pagination request
 * @returns The modified query builder with date filters applied.
 *
 * @example
 * applyDateFilters(qb, 'post', { publishedAt: 'publishedAt', unpublishedAt: 'unpublishedAt' }, pageRequest);
 */
export const applyDateFilters = <T>(
  qb: SelectQueryBuilder<T>,
  alias: string,
  dateFields: { start: EntityKeys<T>; end: EntityKeys<T> },
  pageRequest: PaginatedRequest
): SelectQueryBuilder<T> => {
  const from = fDateTime(pageRequest.from.toISOString());
  const to = fDateTime(pageRequest.to.toISOString());

  return qb.andWhere(
    new Brackets((qb) => {
      qb.where(`${alias}.${String(dateFields.start)} BETWEEN :from AND :to`, {
        from,
        to,
      })
        .orWhere(`${alias}.${String(dateFields.end)} BETWEEN :from AND :to`, {
          from,
          to,
        })
        .orWhere(
          `${alias}.${String(dateFields.start)} >= :from AND ${alias}.${String(dateFields.end)} <= :to`,
          {
            from,
            to,
          }
        );
    })
  );
};
