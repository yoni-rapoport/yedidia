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
import { SayThanks } from "../Modal/SayThanks"
import { AboutMe } from "../Modal/AboutMe"
import { ImportantToMe } from "../Modal/ImportantToMe"
import { modalTitles } from "../../consts"
interface PosterProps {
  patient?: Patient
  images?: PatientImage[]
  save: () => Promise<boolean>
  onInput: (e: ChangeEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  setImages: Dispatch<SetStateAction<PatientImage[] | undefined>>
}
//[ ] V2 - open and close of text or image modal should slide in and out
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
        return (
          <PatientName
            name={patient?.name}
            roomNumber={patient?.roomNumber}
            onChange={onChange}
          />
        )
      case ComponentToRender.SAY_THANKS:
        return <SayThanks value={patient?.sayThanks} onChange={onChange} />
      case ComponentToRender.ABOUT_ME:
        return <AboutMe value={patient?.aboutMe} onChange={onChange} />
      case ComponentToRender.IMPORTANT_TO_ME:
        return (
          <ImportantToMe value={patient?.importantToMe} onChange={onChange} />
        )
      default:
        break
    }
  }
  //[x] always show the 6 pack as 2 - 2 - 2
  //[x] make max width, so that also on pc, it'll look like the six pack
  //[x] You can move sidebar to more inner component
  return (
    <>
      <CustomBox>
        <PosterBlock
          title={modalTitles.name}
          customStyle={{
            width: "100%",
            maxWidth: "328px",
            maxHeight: 56,
            alignItems: `${patient?.name ? "center" : "flex-start"}`,
            justifyContent: `${patient?.name ? "space-between" : "center"}`,
          }}
          blockText={
            patient?.name ? `${patient?.name} (חדר ${patient?.roomNumber})` : ""
          }
          onClick={() =>
            handleOpenModal(ComponentToRender.PATIENT_NAME, modalTitles.name)
          }
          className="grid-item"
        />
        <PosterBlock
          title={modalTitles.myPicture}
          icon={imageIcon}
          blockImage={images?.[0]}
          onClick={() =>
            handleOpenModal(ComponentToRender.PICTURE, modalTitles.myPicture)
          }
          className="grid-item"
        />
        <PosterBlock
          title={modalTitles.aboutMe}
          icon={editIcon}
          blockText={patient?.aboutMe}
          onClick={() =>
            handleOpenModal(ComponentToRender.ABOUT_ME, modalTitles.aboutMe)
          }
          className="grid-item"
        />
        <PosterBlock
          title={modalTitles.importantToMe}
          icon={editIcon}
          blockText={patient?.importantToMe}
          onClick={() =>
            handleOpenModal(
              ComponentToRender.IMPORTANT_TO_ME,
              modalTitles.importantToMe
            )
          }
          className="grid-item"
        />
        <PosterBlock
          title={modalTitles.myPicture}
          icon={imageIcon}
          blockImage={images?.[1]}
          onClick={() =>
            handleOpenModal(ComponentToRender.PICTURE, modalTitles.myPicture)
          }
          className="grid-item"
        />

        <PosterBlock
          title={modalTitles.anotherPicture}
          icon={imageIcon}
          blockImage={images?.[2]}
          onClick={() =>
            handleOpenModal(
              ComponentToRender.PICTURE,
              modalTitles.anotherPicture
            )
          }
          className="grid-item"
        />
        <PosterBlock
          title={modalTitles.sayThanks}
          icon={editIcon}
          blockText={patient?.sayThanks}
          onClick={() =>
            handleOpenModal(ComponentToRender.SAY_THANKS, modalTitles.sayThanks)
          }
          className="grid-item"
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
  display: "grid",
  gap: "1rem",
  justifyContent: "center",
  padding: "0 1rem 0 1rem",
  gridTemplateColumns: "min-content",
  ".grid-item:first-of-type": {
    gridColumn: "1 / span 2",
  },
}))
