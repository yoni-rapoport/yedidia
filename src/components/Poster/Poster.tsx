import { PosterBlock } from "./PosterBlock"
import imageIcon from "../../assets/imageIcon.svg"
import editIcon from "../../assets/editIcon.svg"
import { Box, BoxProps, styled } from "@mui/material"
import { Patient } from "../../model/patient"
import { PatientImage } from "../../model/PatientImage"
import { ComponentToRender } from "../../types"
import CustomModal from "../Modal/CustomModal"
import useToggle from "../../hooks/useToggle"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { Text } from "../Modal/Text"
import { Picture } from "../Modal/Picture"
import { PatientName } from "../Modal/PatientName"
interface PosterProps {
  patient?: Patient
  images?: PatientImage[]
  save: () => Promise<boolean>
  onInput: (e: ChangeEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  setImages: Dispatch<SetStateAction<PatientImage[] | undefined>>
}
export const Poster = ({
  patient,
  images,
  save,
  onInput,
  onChange,
  setImages,
}: PosterProps) => {
  const { isOpen, setClose, setOpen } = useToggle()
  const [componentType, setComponentType] = useState<ComponentToRender>()
  const [modalTitle, setModalTitle] = useState<string>("")
  const handleOpenModal = (type: ComponentToRender, title: string) => {
    setComponentType(type)
    setModalTitle(title)
    setOpen()
  }

  const getPageToDisplay = (key?: ComponentToRender) => {
    switch (key) {
      case ComponentToRender.TEXT:
        return <Text value={patient?.name} onChange={onChange} />
      case ComponentToRender.PICTURE:
        return (
          <Picture images={images} onInput={onInput} setImages={setImages} />
        )
      case ComponentToRender.PATIENT_NAME:
        return <PatientName name={patient?.name} onChange={onChange} />
      default:
        break
    }
  }
  return (
    <>
      <CustomBox>
        <PosterBlock
          title="שם (או כינוי)"
          customStyle={{
            width: "100%",
            maxWidth: "100%",
            maxHeight: 56,
            alignItems: `${patient?.name ? "center" : "flex-start"}`,
            padding: `${patient?.name ? "0 16px 0 16px" : "0 16px 0 0"}`,
            justifyContent: `${patient?.name ? "space-between" : ""}`,
          }}
          blockText={patient?.name}
          onClick={() => handleOpenModal(ComponentToRender.PATIENT_NAME, "שם")}
        />
        <PosterBlock
          title="התמונה שלי"
          icon={imageIcon}
          blockImage={images?.[0]}
          onClick={() =>
            handleOpenModal(ComponentToRender.PICTURE, "התמונה שלי")
          }
        />
        <PosterBlock
          title="קצת עלי"
          icon={editIcon}
          onClick={() => handleOpenModal(ComponentToRender.TEXT, "קצת עלי")}
        />
        <PosterBlock
          title="חשוב לי"
          icon={editIcon}
          onClick={() => handleOpenModal(ComponentToRender.TEXT, "חשוב לי")}
        />
        <PosterBlock
          title="תמונה משמחת"
          icon={imageIcon}
          blockImage={images?.[1]}
          onClick={() =>
            handleOpenModal(ComponentToRender.PICTURE, "התמונה שלי")
          }
        />

        <PosterBlock
          title="עוד תמונה"
          icon={imageIcon}
          blockImage={images?.[2]}
          onClick={() =>
            handleOpenModal(ComponentToRender.PICTURE, "התמונה שלי")
          }
        />
        <PosterBlock
          title="להגיד תודה"
          icon={editIcon}
          onClick={() => handleOpenModal(ComponentToRender.TEXT, "להגיד תודה")}
        />
      </CustomBox>
      <CustomModal
        open={isOpen}
        handleClose={setClose}
        save={() => {
          save()
          setClose()
        }}
        modalTitle={modalTitle}
      >
        {getPageToDisplay(componentType)}
      </CustomModal>
    </>
  )
}
const CustomBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0 1rem 0 1rem",
}))
