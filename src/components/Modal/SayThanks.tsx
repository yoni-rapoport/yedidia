import { Box } from "@mui/material"
import { ModalTitle } from "../Common/ModalTitle"
import { ChangeEvent } from "react"
import { TextFieldCounter } from "../Common/TextFiledCounetr"

interface SayThanksProps {
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const SayThanks = ({ value, onChange }: SayThanksProps) => {
  return (
    <>
      <ModalTitle title="על אילו דברים היית רוצה להגיד תודה? למי מגיעה תודה ממך?" />

      <TextFieldCounter
        name="sayThanks"
        label="להגיד תודה"
        rows={15}
        fullWidth
        inputProps={{ maxLength: 500 }}
        onChange={onChange}
        value={value}
        multiline
        helperText="למשל: למשפחה, לחברים, על הטיפול המסור של..."
      />
    </>
  )
}
