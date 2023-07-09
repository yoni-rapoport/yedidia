import {
  Allow,
  Entity,
  Fields,
  Validators,
  getEntityRef,
  isBackend,
  remult,
} from "remult"
import { Roles } from "./roles"
import cuid from "cuid"
import { PatientAnswer } from "./PatientAnswer"
import { PatientImage } from "./PatientImage"

@Entity<Patient>("patients", {
  allowApiCrud: Roles.department,
  allowApiUpdate: Allow.authenticated,
  allowApiRead: Allow.authenticated,
  backendPrefilter: () => {
    if (remult.context.signingIn) return {}
    if (remult.isAllowed(Roles.admin)) return {}
    return {
      departmentId: remult.user!.departmentId,
    }
  },
  saving: async (p) => {
    if (isBackend() && getEntityRef(p).isNew() && !p.url) {
      p.url = cuid()
      let i = 0
      for (const title of [
        "קצת עלי:",
        "דברים משמעותיים לי בחיים",
        "אני רוצה להודות על",
      ]) {
        await remult.repo(PatientAnswer).insert({
          patientId: p.id,
          index: i,
          title: title,
        })
        await remult.repo(PatientImage).insert({
          patientId: p.id,
          index: i,
        })
        i++
      }
    }
  },
})
export class Patient {
  @Fields.cuid()
  id = ""
  @Fields.string({ validate: Validators.required })
  name = ""
  //[ ] - change to string, default ''
  @Fields.number()
  roomNumber = undefined
  @Fields.string()
  sayThanks = ""
  @Fields.string()
  aboutMe = ""
  @Fields.string()
  importantToMe = ""
  @Fields.string()
  departmentId = ""
  @Fields.string()
  url = ""
  static getSignInUrl(p: Patient) {
    return remult.context.origin + "/patientSignIn/" + p.url
  }
}
