import { Box, TextField, Typography } from "@mui/material"
import { ChangeEvent } from "react"

interface PatientNameProps {
  name?: string
  roomNumber?: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PatientName = ({
  onChange,
  name,
  roomNumber,
}: PatientNameProps) => {
  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: 500,
          fontFamily: "Roboto",
          lineHeight: "30px",
          letterSpacing: " 0.15px",
        }}
      >
        באיזה שם או כינוי היית רוצה שהצוות הרפואי יקרא לך?
      </Typography>

      <Box sx={{ padding: "1rem" }}>
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
          type="number"
          value={roomNumber}
        />
      </Box>
    </>
  )
}
