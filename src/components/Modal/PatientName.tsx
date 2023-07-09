import { TextField } from "@mui/material"
import { ChangeEvent } from "react"
import { ModalTitle } from "../Common/ModalTitle"

interface PatientNameProps {
  name?: string
  roomNumber?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PatientName = ({
  onChange,
  name,
  roomNumber,
}: PatientNameProps) => {
  return (
    <>
      <ModalTitle title=" באיזה שם או כינוי היית רוצה שהצוות הרפואי יקרא לך?" />

      <TextField
        label="השם או הכינוי יופיעו בכותרת הפוסטר"
        variant="filled"
        color="primary"
        fullWidth
        margin="normal"
        value={name}
        name="name"
        onChange={onChange}
      />
      <TextField
        label="מספר חדר"
        variant="filled"
        color="primary"
        fullWidth
        margin="normal"
        onChange={onChange}
        name="roomNumber"
        type="text"
        value={roomNumber}
      />
    </>
  )
}
