import css from "./Pagination.module.css"
import ReactPaginateModule from "react-paginate"

const ReactPaginate = (ReactPaginateModule as { default?: typeof ReactPaginateModule } & typeof ReactPaginateModule).default ?? ReactPaginateModule

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(selectedItem: { selected: number }) => onPageChange(selectedItem.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      renderOnZeroPageCount={null}
    />
  )
}