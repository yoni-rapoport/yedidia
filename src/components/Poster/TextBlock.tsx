import { PatientAnswer, answersTitle } from "../../model/PatientAnswer"
import { ModalTitle } from "../Common/ModalTitle"
import { TextFieldCounter } from "../Common/TextFiledCounetr"
import { PosterBlock } from "./PosterBlock"
import editIcon from "../../assets/editIcon.svg"

export default function TextBlock({
  answer,
  handleOpenModal,
  setAnswer,
}: {
  answer: PatientAnswer
  handleOpenModal: (type: JSX.Element, title: string) => void
  setAnswer: (index: number, text: string) => void
}) {
  const titles = answersTitle[answer.index]
  return (
    <PosterBlock
      title={titles.shortTitle}
      icon={editIcon}
      blockText={answer.text}
      onClick={() =>
        handleOpenModal(
          <>
            <ModalTitle title={titles.title} />
            <TextFieldCounter
              name="aboutMe"
              label={titles.shortTitle}
              rows={15}
              fullWidth
              inputProps={{ maxLength: 500 }}
              onChange={(e) => setAnswer(answer.index, e.target.value)}
              value={answer.text}
              multiline
              helperText={titles.helperText}
            />
          </>,
          titles.shortTitle
        )
      }
      className="grid-item"
    />
  )
}
