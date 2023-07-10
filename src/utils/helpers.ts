import copy from "copy-to-clipboard"
import { Patient } from "../model/patient"
import { printPdf } from "../pdf/printPdf"
import { remult } from "remult"
import { PatientAnswer } from "../model/PatientAnswer"
import { PatientImage } from "../model/PatientImage"
import UtilsController from "../server/utilsController"

export function copyLink(patient?: Patient) {
  copy(Patient.getSignInUrl(patient!))
  alert("הקישור הועתק")
}

export async function save(
  patient: Patient,
  answers: PatientAnswer[],
  images?: PatientImage[]
) {
  //[ ] - loader
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

export async function print(
  patient: Patient,
  answers: PatientAnswer[],
  images?: PatientImage[]
) {
  if (!(await save(patient, answers, images))) return
  printPdf(patient!, answers!, images!)
}
export async function sendAsEmail(
  patient: Patient,
  answers: PatientAnswer[],
  images?: PatientImage[]
) {
  if (!(await save(patient, answers, images))) return
  const to = prompt("למי לשלוח את המייל?", "yedidia.blonder@gmail.com")
  alert(await UtilsController.sendPdfAsEmail(patient!.id, to!))
}
export async function sendSmsToFamily(
  patient: Patient,
  answers: PatientAnswer[],
  images?: PatientImage[]
) {
  if (!(await save(patient, answers, images))) return
  const to = prompt("לאיזה מספר לשלוח את הSMS?", "0526916674")
  try {
    alert(await UtilsController.sendSmsToFamilyMember(patient!.id, to!))
  } catch (error: any) {
    alert(error.message)
  }
}
