import { Box, TextField, Typography } from "@mui/material"
import { ChangeEvent } from "react"

interface PatientNameProps {
  name?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PatientName = ({ onChange, name }: PatientNameProps) => {
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
      {name}
      <Box sx={{ padding: "1rem" }}>
        <TextField
          label="השם או הכינוי יופיעו בכותרת הפוסטר"
          variant="filled"
          color="primary"
          fullWidth
          margin="dense"
        />
        <TextField
          label="מספר חדר"
          variant="filled"
          color="primary"
          fullWidth
          margin="dense"
        />
      </Box>
    </>
  )
}
