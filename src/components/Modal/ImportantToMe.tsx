import { ChangeEvent } from "react"
import { ModalTitle } from "../Common/ModalTitle"
import { TextFieldCounter } from "../Common/TextFiledCounetr"

interface ImportantToMeProps {
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const ImportantToMe = ({ value, onChange }: ImportantToMeProps) => (
  <>
    <ModalTitle title="מה משמעותי בשבילך?" />
    <TextFieldCounter
      name="aboutMe"
      label="חשוב לי"
      minRows={15}
      maxRows={15}
      rows={15}
      fullWidth
      inputProps={{ maxLength: 500 }}
      onChange={onChange}
      value={value}
      multiline
      helperText="אירוע, תרבות, משפחה, אמונה או כל דבר אחר"
    />
  </>
)
