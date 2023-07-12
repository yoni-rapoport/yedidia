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
export const answersTitle = [
  {
    shortTitle: "קצת עלי",
    title: "זה המקום לספר על עצמך ועל תחומי העניין שלך",
    helperText: "למשל: מקצוע, שפה, תחביבים, טעם מוזיקלי...",
  },
  {
    shortTitle: "חשוב לי",
    title: "מה משמעותי בשבילך?",
    helperText: "אירוע, תרבות, משפחה, אמונה או כל דבר אחר",
  },
  {
    shortTitle: "להגיד תודה",
    title: "על אילו דברים היית רוצה להגיד תודה? למי מגיעה תודה ממך?",
    helperText: "למשל: למשפחה, לחברים, על הטיפול המסור של...",
  },
]
