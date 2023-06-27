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

  const handleOpenModal = (type: ComponentToRender) => {
    setComponentType(type)
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
            height: 56,
            paddingRight: 16,
            alignItems: "start",
          }}
          blockText={patient?.name}
          onClick={() => handleOpenModal(ComponentToRender.TEXT)}
        />
        <PosterBlock
          title="תמונה 1"
          icon={imageIcon}
          blockImage={images![0]}
          onClick={() => handleOpenModal(ComponentToRender.PICTURE)}
        />
        <PosterBlock
          title="קצת עלי"
          icon={editIcon}
          onClick={() => handleOpenModal(ComponentToRender.TEXT)}
        />
        <PosterBlock
          title="דברים משמעותיים בשבילי"
          icon={editIcon}
          onClick={() => handleOpenModal(ComponentToRender.TEXT)}
        />
        <PosterBlock
          title="תמונה 2"
          icon={imageIcon}
          blockImage={images![1]}
          onClick={() => handleOpenModal(ComponentToRender.PICTURE)}
        />
        <PosterBlock
          title="דברים שאני מודה עליהם"
          icon={editIcon}
          onClick={() => handleOpenModal(ComponentToRender.TEXT)}
        />
        <PosterBlock
          title="תמונה 3"
          icon={imageIcon}
          blockImage={images![2]}
          onClick={() => handleOpenModal(ComponentToRender.PICTURE)}
        />
      </CustomBox>
      <CustomModal
        open={isOpen}
        handleClose={setClose}
        save={() => {
          save()
          setClose()
        }}
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
  gap: "20px",
  padding: "0 16px 0 16px",
}))
