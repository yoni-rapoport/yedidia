import { remult } from "remult"
import { Department } from "../model/department"
import { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { departmentsRoute } from "../utils"
import copy from "copy-to-clipboard"
import UtilsController from "../server/utilsController"

const repo = remult.repo(Department)
export default function Departments() {
  const [newItem, setNewItem] = useState("")
  const [items, setItems] = useState<Department[]>([])
  useEffect(() => {
    repo.find().then(setItems)
  }, [])
  async function add(e: FormEvent) {
    e.preventDefault()
    try {
      setItems([...items, await repo.insert({ name: newItem })])
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>
      <main>
        <form onSubmit={add}>
          <input
            value={newItem}
            placeholder="שם מחלקה חדשה"
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button>הוסף</button>
        </form>
        {items.map((item) => {
          function copyLink() {
            copy(Department.getSignInUrl(item))
            alert("הקישור הועתק")
          }
          async function sendSmsToDepartment() {
            const to = prompt("לאיזה מספר לשלוח את הSMS?", "0526916674")
            try {
              alert(await UtilsController.sendSmsToDepartment(item!.id, to!))
            } catch (error: any) {
              alert(error.message)
            }
          }
          return (
            <div key={item.id}>
              <div>{item.name}</div>
              <Link to={departmentsRoute + item.id}>מטופלים</Link>
              <button onClick={copyLink}>העתק קישור לכניסה</button>
              <button onClick={sendSmsToDepartment}>
                שלח קישור לכניסה בSMS
              </button>
            </div>
          )
        })}
      </main>
    </>
  )
}
