import { FC } from 'react'
import { CoreComponent } from '../../types/CoreComponent.type'

type PaginatorProps = CoreComponent & {
  currentPage: number
  totalPages: number
}

const Paginator: FC<PaginatorProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="card border rounded-none shadow-md p-4 max-w-[350px] items-center mb-10">
      <nav className="flex items-center gap-x-1">
        <button
          type="button"
          className="btn btn-text btn-square"
          aria-label="Previous Button"
        >
          <span className="icon-[tabler--chevron-left] size-5 rtl:rotate-180"></span>
        </button>
        <div className="flex items-center gap-x-1">
          <button
            type="button"
            className="btn btn-text btn-square pointer-events-none"
            aria-current="page"
          >
            {currentPage}
          </button>
          <span className="text-base-content/80 mx-3">of</span>
          <button
            type="button"
            className="btn btn-text btn-square pointer-events-none"
          >
            {totalPages}
          </button>
        </div>
        <button
          type="button"
          className="btn btn-text btn-square"
          aria-label="Next Button"
        >
          <span className="icon-[tabler--chevron-right] size-5 rtl:rotate-180"></span>
        </button>
      </nav>
    </div>
  )
}

export { Paginator, PaginatorProps }
