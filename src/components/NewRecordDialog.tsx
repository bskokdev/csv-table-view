import { ReactElement, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import InputField from './InputField'

const recordSchema = z.object({
  uid: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  accessAllowed: z.boolean(),
  hiredSince: z.date().refine(date => date <= new Date(), {
    message: 'Hired date cannot be in the future',
  }),
})

type CsvRecord = z.infer<typeof recordSchema>

interface NewRecordDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (record: CsvRecord) => void
}

function NewRecordDialog({
  isOpen,
  onClose,
  onSubmit,
}: NewRecordDialogProps): ReactElement | null {
  const [newRecord, setNewRecord] = useState<CsvRecord>({
    uid: uuidv4(),
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    accessAllowed: false,
    hiredSince: new Date(),
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setNewRecord(prev => ({
      ...prev,
      [name]: name === 'accessAllowed' ? value === 'true' : value,
    }))
  }

  function clearState() {
    setNewRecord({
      uid: uuidv4(),
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phoneNumber: '',
      accessAllowed: false,
      hiredSince: new Date(),
    })
    setErrors({})
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      recordSchema.parse(newRecord)
      onSubmit(newRecord)
      onClose()
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {}
        err.errors.forEach(error => {
          validationErrors[error.path[0]] = error.message
        })
        setErrors(validationErrors)
      }
    } finally {
      clearState()
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-96'>
        <h2 className='text-xl font-semibold mb-4'>Add New Record</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label='First Name'
            name='firstName'
            type='text'
            value={newRecord.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          <InputField
            label='Last Name'
            name='lastName'
            type='text'
            value={newRecord.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <InputField
            label='Username'
            name='username'
            type='text'
            value={newRecord.username}
            onChange={handleInputChange}
            error={errors.username}
          />
          <InputField
            label='Email'
            name='email'
            type='email'
            value={newRecord.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <InputField
            label='Phone Number'
            name='phoneNumber'
            type='text'
            value={newRecord.phoneNumber}
            onChange={handleInputChange}
            error={errors.phoneNumber}
          />
          <InputField
            label='Access Allowed'
            name='accessAllowed'
            type='select'
            value={newRecord.accessAllowed ? 'true' : 'false'}
            onChange={handleInputChange}
            error={errors.accessAllowed}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
          <InputField
            label='Hired Since'
            name='hiredSince'
            type='date'
            value={newRecord.hiredSince.toISOString().split('T')[0]}
            onChange={handleInputChange}
            error={errors.hiredSince}
          />
          <div className='flex justify-between'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
            >
              Submit
            </button>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-500 text-white px-4 py-2 rounded'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewRecordDialog
