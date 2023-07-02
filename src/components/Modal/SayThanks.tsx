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
    <Box>
      <ModalTitle title="על אילו דברים היית רוצה להגיד תודה? למי מגיעה תודה ממך?" />

      <Box sx={{ padding: "1rem" }}>
        <TextFieldCounter onChange={onChange} value={value} />
      </Box>
    </Box>
  )
}
