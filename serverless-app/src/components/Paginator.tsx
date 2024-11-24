import { FC } from 'react'

type PaginatorProps = {
  pages: number[]
}

const Paginator: FC<PaginatorProps> = (props: PaginatorProps) => {
  return (
    <nav className="flex items-center gap-x-1">
      <button type="button" className="btn btn-text">
        Previous
      </button>
      <div className="flex items-center gap-x-1">
        {props.pages.map((page: number, index: number) => {
          return (
            <button
              key={index}
              type="button"
              className="btn btn-text btn-square aria-[current='page']:text-bg-primary"
            >
              {page}
            </button>
          )
        })}
      </div>
      <button type="button" className="btn btn-text">
        Next
      </button>
    </nav>
  )
}

export { Paginator, PaginatorProps }
