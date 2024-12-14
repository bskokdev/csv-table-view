import Papa, { ParseResult } from 'papaparse'
import { useEffect, useState } from 'react'

export type CsvRecord = {
  uid: number | string
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  accessAllowed: boolean
  hiredSince: Date
}

function useReadCsv(csvFilePath: string) {
  const [data, setData] = useState<CsvRecord[] | undefined>(undefined)

  function addValue(record: CsvRecord) {
    if (data) {
      setData(prevData => [...prevData!, record])
    }
  }

  function readCsv() {
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: false,
      delimiter: ';',
      complete: (results: ParseResult<CsvRecord>) => {
        const parsedData: CsvRecord[] = results.data.map((record: any) => ({
          uid: Number(record['uid']),
          firstName: record['first name'],
          lastName: record['last name'],
          username: record['username'],
          email: record['email'],
          phoneNumber: record['phone number'],
          accessAllowed: record['access allowed'] === 'true',
          hiredSince: new Date(record['hired since']),
        }))
        setData(parsedData)
      },
    })
  }

  useEffect(() => {
    readCsv()
  }, [])

  return {
    data,
    addValue,
  }
}

export default useReadCsv
