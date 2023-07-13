import { PosterBlock } from "./PosterBlock";
import imageIcon from "../../assets/imageIcon.svg";
import { Box, BoxProps, styled } from "@mui/material";
import { Patient } from "../../model/patient";
import { PatientImage } from "../../model/PatientImage";
import CustomModal from "../Modal/CustomModal";
import useToggle from "../../hooks/useToggle";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Picture } from "../Modal/Picture";
import { PatientName } from "../Modal/PatientName";
import { modalTitles } from "../../consts";
import { PatientAnswer } from "../../model/PatientAnswer";
import TextBlock from "./TextBlock";
import useCustomModal from "../../hooks/useCustomModal";

interface PosterProps {
  patient?: Patient;
  images?: PatientImage[];
  answers: PatientAnswer[];
  setAnswer: (index: number, text: string) => void;
  save: () => Promise<boolean>;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setImages: Dispatch<SetStateAction<PatientImage[] | undefined>>;
}
//[ ] V2 - open and close of text or image modal should slide in and out
export const Poster = ({
  patient,
  images,
  save,
  onInput,
  onChange,
  setImages,
  answers,
  setAnswer,
}: PosterProps) => {
  const [patientNameModal, openPatientNameModal] = useCustomModal(
    modalTitles.name,
    <PatientName
      name={patient?.name}
      roomNumber={patient?.roomNumber}
      onChange={onChange}
    />,
    save,
  );

  const [pictureModal, openPictureModal] = useCustomModal(
    modalTitles.myPicture,
    <Picture
      images={images}
      onInput={onInput}
      setImages={setImages}
    />,
    save,
  );

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
          blockText={patient?.name
            ? `${patient?.name} (חדר ${patient?.roomNumber})`
            : ""}
          onClick={() => openPatientNameModal()}
          className="grid-item"
        />
        {patientNameModal}
        <PosterBlock
          title={modalTitles.myPicture}
          icon={imageIcon}
          blockImage={images?.[0]}
          onClick={() => openPictureModal()}
          className="grid-item"
        />
        {pictureModal}
        <TextBlock
          answer={answers[0]}
          save={save}
          setAnswer={setAnswer}
        />
        <TextBlock
          answer={answers[1]}
          save={save}
          setAnswer={setAnswer}
        />
        <PosterBlock
          title={modalTitles.myPicture}
          icon={imageIcon}
          blockImage={images?.[1]}
          onClick={() => openPictureModal()}
          className="grid-item"
        />
        <PosterBlock
          title={modalTitles.anotherPicture}
          icon={imageIcon}
          blockImage={images?.[2]}
          onClick={() => openPictureModal()}
          className="grid-item"
        />
        {pictureModal}
        <TextBlock
          answer={answers[2]}
          save={save}
          setAnswer={setAnswer}
        />
      </CustomBox>
    </>
  );
};
const CustomBox = styled(Box)<BoxProps>(() => ({
  display: "grid",
  gap: "1rem",
  justifyContent: "center",
  padding: "0 1rem 0 1rem",
  gridTemplateColumns: "min-content",
  ".grid-item:first-of-type": {
    gridColumn: "1 / span 2",
  },
}));
