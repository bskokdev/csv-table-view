import { ReactElement } from 'react'

interface TableDataRowProps {
  value: string | number
}

export function TableDataRow({ value }: TableDataRowProps): ReactElement {
  return (
    <td className='px-6 py-4 text-sm font-medium text-gray-800'>{value}</td>
  )
}
