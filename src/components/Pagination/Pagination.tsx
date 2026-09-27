import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedIndex: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      previousLabel="< previous"
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      renderOnZeroPageCount={null}
    />
  );
}