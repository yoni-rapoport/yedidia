import { answersTitle, PatientAnswer } from "../../model/PatientAnswer";
import { ModalTitle } from "../Common/ModalTitle";
import { TextFieldCounter } from "../Common/TextFiledCounetr";
import { PosterBlock } from "./PosterBlock";
import editIcon from "../../assets/editIcon.svg";
import useCustomModal from "../../hooks/useCustomModal";

export default function TextBlock({
  answer,
  save,
  setAnswer,
}: {
  answer: PatientAnswer;
  setAnswer: (index: number, text: string) => void;
  save: () => Promise<boolean>;
}) {
  const titles = answersTitle[answer.index];

  const [modal, openModal] = useCustomModal(
    titles.shortTitle,
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
    save,
  );

  return (
    <>
      <PosterBlock
        title={titles.shortTitle}
        icon={editIcon}
        blockText={answer.text}
        onClick={() => openModal()}
        className="grid-item"
      />
      {modal}
    </>
  );
}
