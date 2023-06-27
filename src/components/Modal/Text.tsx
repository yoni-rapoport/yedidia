import { ChangeEvent } from "react"

interface TextProps {
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Text = ({ value, onChange }: TextProps) => {
  return (
    <>
      <h2>באיזה שם היית רוצה שהצוות יפנה אליך?</h2>
      <input type="text" value={value} onChange={onChange} />
    </>
  )
}
