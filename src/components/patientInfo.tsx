import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Patient } from "../model/patient"
import { PatientImage } from "../model/PatientImage"
import { PatientAnswer } from "../model/PatientAnswer"
import { remult } from "remult"
import { Poster } from "./Poster/Poster"
import { Box, Button, Divider } from "@mui/material"
import { print, save } from "../utils/helpers"
import { DrawerComponent } from "./DrawerComponent"
import { CheckIcon } from "../assets/check"

export default function PatientInfo({ signOut }: { signOut: VoidFunction }) {
  const params = useParams()
  const [patient, setPatient] = useState<Patient>()
  const [answers, setAnswers] = useState<PatientAnswer[]>()
  const [images, setImages] = useState<PatientImage[]>()

  useEffect(() => {
    remult.repo(Patient).findId(params.id!).then(setPatient)
    remult
      .repo(PatientAnswer)
      .find({ where: { patientId: params.id! } })
      .then(setAnswers)
    remult
      .repo(PatientImage)
      .find({ where: { patientId: params.id! } })
      .then(setImages)
  }, [])

  function onFileInput(e: FormEvent<HTMLInputElement>) {
    for (const f of e.currentTarget.files!) {
      const fileReader = new FileReader()

      fileReader.onload = async (e) => {
        const imageData = e.target!.result!.toString()
        const img = new Image()

        {
          img.onload = async () => {
            const canvas = document.createElement("canvas")
            let ctx = canvas.getContext("2d")
            ctx!.drawImage(img, 0, 0)

            const MAX_WIDTH = 1600
            const MAX_HEIGHT = 1200
            let width = img.width
            let height = img.height

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }
            canvas.width = width
            canvas.height = height
            ctx = canvas.getContext("2d")
            ctx!.drawImage(img, 0, 0, width, height)

            const dataUrl = canvas.toDataURL("image/png")

            setImages((images) => {
              let updated = [...images!]
              for (let index = 0; index < updated.length; index++) {
                const element = updated[index]
                if (!element.image) {
                  updated[index] = {
                    ...element,
                    image: dataUrl,
                    width: width,
                    height: height,
                  }
                  return updated
                }
              }
              return updated
            })
          }
          img.src = imageData
        }
      }
      fileReader.readAsDataURL(f)
    }
  }

  if (!patient || !answers) return <>טוען</>

  return (
    <>
      <DrawerComponent
        patient={patient}
        answers={answers}
        images={images}
        signOut={signOut}
      />
    

      <Poster
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPatient({ ...patient, [e.target.name]: e.target.value })
        }
        patient={patient}
        images={images}
        onInput={(e: ChangeEvent<HTMLInputElement>) => onFileInput(e)}
        save={() => save(patient, answers, images)}
        setImages={setImages}
      />
      <Box
        sx={{
          backgroundColor: "rgb(240,240,240)",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            padding: " 16px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => save(patient, answers, images)}
          >
            שמירה
          </Button>

          <Button
            // disabled={answers[]}
            variant="contained"
            onClick={() => print(patient, answers, images)}
            startIcon={<CheckIcon />}
          >
            סיום והדפסה
          </Button>
        </Box>
      </Box>
    </>
  )
}

export interface WasChanged {
  wasChanged?: boolean
}
