import useReadCsv, { CsvRecord } from '../hooks/useReadCsv.ts'
import { ReactElement, useState } from 'react'
import { TableDataRow, TableHeaderRow } from './TableRows.tsx'
import NewRecordDialog from './NewRecordDialog.tsx'

export interface DataTableProps {
  csvFilePath: string
}

export function DataTable({ csvFilePath }: DataTableProps): ReactElement {
  const { data, addValue } = useReadCsv(csvFilePath) || { data: [] }
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false)

  function handleOpenDialog() {
    setDialogOpen(true)
  }

  function handleCloseDialog() {
    setDialogOpen(false)
  }

  function handleAddRecord(newRecord: CsvRecord) {
    addValue(newRecord)
  }

  if (!data || !data.length) {
    return <div>Loading...</div>
  }

  return (
    <>
      <button
        className='bg-green-600 text-white px-4 py-2 my-4 rounded-lg'
        onClick={handleOpenDialog}
      >
        Add Value
      </button>
      <NewRecordDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleAddRecord}
      />
      <div className='overflow-x-auto shadow-lg rounded-lg'>
        <table className='min-w-full table-auto text-left bg-white'>
          <thead className='bg-gray-100 border-b'>
            <tr>
              <TableHeaderRow heading={'UID'} />
              <TableHeaderRow heading={'First Name'} />
              <TableHeaderRow heading={'Last Name'} />
              <TableHeaderRow heading={'Username'} />
              <TableHeaderRow heading={'Email'} />
              <TableHeaderRow heading={'Phone Number'} />
              <TableHeaderRow heading={'Access Allowed'} />
              <TableHeaderRow heading={'Hired Since'} />
            </tr>
          </thead>
          <tbody>
            {data.map((record: CsvRecord) => (
              <tr key={record.uid} className='border-b hover:bg-gray-50'>
                <TableDataRow value={record.uid} />
                <TableDataRow value={record.firstName} />
                <TableDataRow value={record.lastName} />
                <TableDataRow value={record.username} />
                <TableDataRow value={record.email} />
                <TableDataRow value={record.phoneNumber} />
                <TableDataRow value={record.accessAllowed ? 'Yes' : 'No'} />
                <TableDataRow
                  value={new Date(record.hiredSince).toLocaleDateString()}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
