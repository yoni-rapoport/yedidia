import { Allow, Entity, Fields } from "remult"
import { patientAllowedForUser } from "./patientAllowedForUser"

@Entity("patientImages", {
  allowApiRead: Allow.authenticated,
  allowApiUpdate: Allow.authenticated,
  allowApiDelete: false,
  allowApiInsert: false,
  backendPrefilter: patientAllowedForUser,
})
export class PatientImage {
  @Fields.cuid()
  id = ""
  @Fields.string({ allowApiUpdate: false })
  patientId = ""
  @Fields.integer({ allowApiUpdate: false })
  index = 0
  @Fields.string()
  image = ""
  @Fields.integer()
  width = 0
  @Fields.integer()
  height = 0
}
