import { ReactElement } from 'react'

interface TableHeaderRowProps {
  heading: string
}

export function TableHeaderRow({ heading }: TableHeaderRowProps): ReactElement {
  return (
    <th className='px-6 py-3 text-sm font-medium text-gray-600'>{heading}</th>
  )
}
