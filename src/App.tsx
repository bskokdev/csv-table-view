import { DataTable } from './components/DataTable.tsx'

function App() {
  const dataFilePath = './data.csv'
  return (
    <div className='mx-24 my-24'>
      <h1 className='text-4xl font-bold text-gray-800'>CSV Table View</h1>
      <DataTable csvFilePath={dataFilePath} />
    </div>
  )
}

export default App
