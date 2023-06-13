import { FormEvent, useState } from "react"

import { SignInController } from "../controllers/sign-in-controller"
import { remult } from "remult"

export default function SignIn({ signedIn }: { signedIn: VoidFunction }) {
  const [user, setUser] = useState("")
  async function signIn(e: FormEvent) {
    e.preventDefault()
    try {
      const result = await SignInController.adminSignIn(user)
      remult.user = result
      signedIn()
    } catch (err: any) {
      alert(err.message)
    }
  }
  return (
    <>
      <form onSubmit={signIn}>
        <input
          value={user}
          placeholder="שם משתמש"
          onChange={(e) => setUser(e.target.value)}
        />
        <button>כניסה</button>
      </form>
    </>
  )
}
