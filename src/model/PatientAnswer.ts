import { Allow, Entity, Fields } from "remult"
import { patientAllowedForUser } from "./patientAllowedForUser"

@Entity<PatientAnswer>("patientAnswers", {
  allowApiRead: Allow.authenticated,
  allowApiUpdate: Allow.authenticated,
  allowApiDelete: false,
  allowApiInsert: false,
  backendPrefilter: patientAllowedForUser,
})
export class PatientAnswer {
  @Fields.cuid()
  id = ""
  @Fields.string({ allowApiUpdate: false })
  patientId = ""
  @Fields.integer({ allowApiUpdate: false })
  index = 0
  @Fields.string()
  title = ""
  @Fields.string()
  text = ""
}
