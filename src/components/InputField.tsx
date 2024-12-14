import React, { ReactElement } from 'react'

interface InputFieldProps {
  label: string
  name: string
  type: string
  value: string | number | readonly string[] | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  error?: string
  options?: { value: string; label: string }[] // for select input
}

function InputField({
  label,
  name,
  type,
  value,
  onChange,
  error,
  options,
}: InputFieldProps): ReactElement {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium'>{label}</label>
      {type === 'select' ? (
        <select
          name={name}
          value={value as string}
          onChange={onChange}
          className={`w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
        >
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'date' ? (
        <input
          type='date'
          name={name}
          value={value as string}
          onChange={onChange}
          className={`w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
        />
      )}
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  )
}

export default InputField
