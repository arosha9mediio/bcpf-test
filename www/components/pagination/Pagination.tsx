"use client";
import {
  Pagination,
  PaginationContent,
  PaginationDirection,
  PaginationEllipsis,
  PaginationGhostLink,
  PaginationItem,
} from "@/components/ui/pagination";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type PaginationsProps = {
  totalPages?: number;
  currentPage?: number;
};

type PaginationsType = (props: PaginationsProps) => JSX.Element;

const Paginations: PaginationsType = ({ totalPages }) => {
  const [_, setQueryParams] = useQueryParams();

  const currentPage = useMemo(() => Number(_?.page) || 1, [_]);

  const previousActive = useMemo(
    () => currentPage > 1,
    [currentPage, totalPages],
  );
  const nextActive = useMemo(
    () => currentPage < totalPages,
    [currentPage, totalPages],
  );

  const ellipsisVisibility = useMemo(
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
        <PaginationGhostLink
          onClick={() => handleOnClick(pageNumber)}
          isActive={pageNumber === currentPage}
          className={"rounded-full select-none"}
          spec="item">
          {pageNumber}
        </PaginationGhostLink>
      </PaginationItem>
    ));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationDirection
            isActive={previousActive}
            onClick={handlePrevious}
            dir="prev"
            className={"rounded-full"}
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
            className={cn("rounded-full")}
            size="icon"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export { Paginations };
