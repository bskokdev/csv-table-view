import { ReactElement } from 'react'

interface TableDataRowProps {
  value: string | number
}

interface TableHeaderRowProps {
  heading: string
}

export function TableDataRow({ value }: TableDataRowProps): ReactElement {
  return (
    <td className='px-6 py-4 text-sm font-medium text-gray-800'>{value}</td>
  )
}

export function TableHeaderRow({ heading }: TableHeaderRowProps): ReactElement {
  return (
    <th className='px-6 py-3 text-sm font-medium text-gray-600'>{heading}</th>
  )
}
