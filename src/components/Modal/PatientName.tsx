import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"
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
  const [nameState, setNameState] = useState(name)
  const [roomState, setRoomState] = useState(roomNumber)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameState(e.target.value)
    onChange(e)
  }

  const handleRoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomState(e.target.value)
    onChange(e)
  }

  return (
    <>
      <ModalTitle title=" באיזה שם או כינוי היית רוצה שהצוות הרפואי יקרא לך?" />

      <TextField
        label="השם או הכינוי יופיעו בכותרת הפוסטר"
        variant="filled"
        color="primary"
        fullWidth
        margin="normal"
        value={nameState}
        name="name"
        onChange={handleNameChange}
      />
      <TextField
        label="מספר חדר"
        variant="filled"
        color="primary"
        fullWidth
        margin="normal"
        onChange={handleRoomChange}
        name="roomNumber"
        type="text"
        value={roomState}
      />
    </>
  )
}
