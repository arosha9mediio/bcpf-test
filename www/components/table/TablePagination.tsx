"use client";

import * as React from "react";

import { useQueryParams } from "@/hooks/useQueryParams";

import {
  Pagination,
  PaginationContent,
  PaginationDirection,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type TablePaginationProps = {
  totalPages?: number;
  currentPage?: number;
};

type TablePaginationType = (props: TablePaginationProps) => JSX.Element;

const TablePagination: TablePaginationType = ({ totalPages }) => {
  const [_, setQueryParams] = useQueryParams();

  const currentPage = React.useMemo(() => Number(_?.page) || 1, [_]);

  const previousActive = React.useMemo(
    () => currentPage > 1,
    [currentPage, totalPages],
  );
  const nextActive = React.useMemo(
    () => currentPage < totalPages,
    [currentPage, totalPages],
  );

  const ellipsisVisibility = React.useMemo(
    () => currentPage + 3 < totalPages,
    [currentPage, totalPages],
  );

  const getPageNumbers = () => {
    const pageRangeStart = Math.max(1, currentPage - 1);
    const pageRangeEnd = Math.min(totalPages, pageRangeStart + 4);

    const pageNumbers = Array.from(
      { length: pageRangeEnd - pageRangeStart + 1 },
      (_, index) => index + pageRangeStart,
    );

    return pageNumbers;
  };

  const handleOnClick = (pageNumber: number) =>
    setQueryParams({ page: pageNumber });

  const handlePrevious = () => {
    if (previousActive) {
      setQueryParams({ page: currentPage - 1 });
      return;
    }
  };

  const handleNext = () => {
    if (nextActive) {
      setQueryParams({ page: currentPage + 1 });
      return;
    }
  };

  const renderPaginationItems = () => {
    const pageNumbers = getPageNumbers();

    return pageNumbers.map(pageNumber => (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          onClick={() => handleOnClick(pageNumber)}
          isActive={pageNumber === currentPage}
          className={"select-none"}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <div className="w-full justify-end items-end flex-row flex ">
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationDirection
                isActive={previousActive}
                onClick={handlePrevious}
                dir="prev"
                className={""}
                size="icon"
              />
            </PaginationItem>

            {renderPaginationItems()}

            {ellipsisVisibility && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationDirection
                dir="next"
                isActive={nextActive}
                onClick={handleNext}
                className={cn("")}
                size="icon"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export { TablePagination };

{
  /* <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination> */
}
