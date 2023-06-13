import { BackendMethod, remult } from "remult"
import { printPdf } from "../pdf/printPdf"
import cuid from "cuid"
import { Patient } from "../model/patient"
import { PatientAnswer } from "../model/PatientAnswer"
import { PatientImage } from "../model/PatientImage"
import { Roles } from "../model/roles"
import { sendSms } from "./send-sms"
import { Department } from "../model/department"

export default class UtilsController {
  @BackendMethod({ allowed: Roles.department })
  static async sendPdfAsEmail(patientId: string, to: string) {
    const [patient, answers, images] = await Promise.all([
      remult.repo(Patient).findId(patientId),
      remult.repo(PatientAnswer).find({ where: { patientId } }),
      remult.repo(PatientImage).find({ where: { patientId } }),
    ])

    const fs = await import("fs")
    const { createTransport } = await import("nodemailer")

    const id = cuid()
    if (!fs.existsSync("./tmp")) {
      fs.mkdirSync("./tmp")
    }
    const path = "./tmp/" + id + ".pdf"
    printPdf(patient, answers, images, path)
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    return new Promise<string>((res) => {
      transport.sendMail(
        {
          to,
          subject: "נעים להכיר הדפסה - " + patient.name,
          attachments: [
            {
              filename: patient.name + ".pdf",
              path,
            },
          ],
        },
        (error, info) => {
          if (error) res(error.message)
          else res(info.response)
          console.log({ error, info })
        }
      )
    })
  }
  @BackendMethod({ allowed: Roles.department })
  static async sendSmsToFamilyMember(patientId: string, phone: string) {
    phone = phone.replace(/\D/g, "")
    if (phone.length < 10 || !phone.startsWith("05")) throw "טלפון לא תקין"
    const p = await remult.repo(Patient).findId(patientId)
    return await sendSms(
      phone,
      `אנא העלו תמונות עבור ${p.name} בקישור הבא:
${Patient.getSignInUrl(p)}`
    )
  }
  @BackendMethod({ allowed: Roles.admin })
  static async sendSmsToDepartment(id: string, phone: string) {
    phone = phone.replace(/\D/g, "")
    if (phone.length < 10 || !phone.startsWith("05")) throw "טלפון לא תקין"
    const p = await remult.repo(Department).findId(id)
    return await sendSms(
      phone,
      `כנסו לרשימת המטופלים של ${p.name} בקישור הבא:
${Department.getSignInUrl(p)}`
    )
  }
}
