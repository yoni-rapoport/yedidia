import { ChangeEvent } from "react"
import { ModalTitle } from "../Common/ModalTitle"
import { TextFieldCounter } from "../Common/TextFiledCounetr"

interface AboutMeProps {
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AboutMe = ({ value, onChange }: AboutMeProps) => (
  <>
    <ModalTitle title="זה המקום לספר על עצמך ועל תחומי העניין שלך" />
    <TextFieldCounter
      name="aboutMe"
      label="קצת עלי"
      rows={15}
      fullWidth
      inputProps={{ maxLength: 500 }}
      onChange={onChange}
      value={value}
      multiline
      helperText="למשל: מקצוע, שפה, תחביבים, טעם מוזיקלי..."
    />
  </>
)
