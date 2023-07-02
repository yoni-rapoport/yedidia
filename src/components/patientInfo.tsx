import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Patient } from "../model/patient"
import { PatientImage } from "../model/PatientImage"
import { PatientAnswer } from "../model/PatientAnswer"
import { remult } from "remult"
import { printPdf } from "../pdf/printPdf"
import UtilsController from "../server/utilsController"
import { Roles } from "../model/roles"
import { departmentsRoute } from "../utils"
import copy from "copy-to-clipboard"

import { Poster } from "./Poster/Poster"

export default function PatientInfo() {
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
  async function save() {
    try {
      let saving = []
      if (!(patient instanceof Patient))
        saving.push(remult.repo(Patient).save(patient!))
      for (const a of answers!) {
        if (!(a instanceof PatientAnswer))
          saving.push(remult.repo(PatientAnswer).save(a))
      }
      for (const i of images!) {
        if (!(i instanceof PatientImage))
          saving.push(remult.repo(PatientImage).save(i))
      }
      await Promise.all(saving)

      return true
    } catch (error: any) {
      alert(error.message)
      return false
    }
  }
  async function print() {
    if (!(await save())) return
    printPdf(patient!, answers!, images!)
  }
  async function sendAsEmail() {
    if (!(await save())) return
    const to = prompt("למי לשלוח את המייל?", "yedidia.blonder@gmail.com")
    alert(await UtilsController.sendPdfAsEmail(patient!.id, to!))
  }
  async function sendSmsToFamily() {
    if (!(await save())) return
    const to = prompt("לאיזה מספר לשלוח את הSMS?", "0526916674")
    try {
      alert(await UtilsController.sendSmsToFamilyMember(patient!.id, to!))
    } catch (error: any) {
      alert(error.message)
    }
  }
  function copyLink() {
    copy(Patient.getSignInUrl(patient!))
    alert("הקישור הועתק")
  }

  return (
    <>
      {remult.isAllowed(Roles.department) && (
        <Link
          to={
            departmentsRoute + patient?.departmentId ||
            remult.user!.departmentId
          }
        >
          חזרה לרשימת המטופלים
        </Link>
      )}

      <Poster
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPatient({ ...patient, [e.target.name]: e.target.value })
        }
        patient={patient}
        images={images}
        onInput={(e: ChangeEvent<HTMLInputElement>) => onFileInput(e)}
        save={save}
        setImages={setImages}
      />
      <main>
        <div>
          <button onClick={save}>שמור</button>
          {remult.isAllowed(Roles.department) && (
            <button onClick={sendSmsToFamily}>שלח SMS להשלמת פרטים</button>
          )}
          {remult.isAllowed(Roles.department) && (
            <button onClick={copyLink}>העתק קישור להשלמת פרטים</button>
          )}
          <button onClick={print}>הדפס</button>
          {remult.isAllowed(Roles.department) && (
            <button onClick={sendAsEmail}>שלח במייל</button>
          )}
        </div>
      </main>
    </>
  )
}

export interface WasChanged {
  wasChanged?: boolean
}
