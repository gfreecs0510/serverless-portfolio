import { FC } from 'react'

type Row = {
  [key: string]: any
}

type TableProps = {
  headers: string[]
  rows: Row[]
}

const renderHeader: FC<string[]> = (headers: string[]) => {
  return (
    <>
      {headers.map((item: string, index: number) => {
        return <th key={index}>{item}</th>
      })}
    </>
  )
}

const renderTableRows: FC<Row[]> = (rows: Row[]) => {
  return (
    <>
      {rows.map((row: Row, index: number) => {
        return (
          <tr key={index}>
            {Object.keys(row).map((item: string, index: number) => {
              return (
                <td key={index} className="text-nowrap">
                  {row[item]}
                </td>
              )
            })}
          </tr>
        )
      })}
    </>
  )
}

const Table: FC<TableProps> = (props: TableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table">
        <thead>
          <tr>{renderHeader(props.headers)}</tr>
        </thead>
        <tbody>{renderTableRows(props.rows)}</tbody>
      </table>
    </div>
  )
}

export { Table, TableProps }
