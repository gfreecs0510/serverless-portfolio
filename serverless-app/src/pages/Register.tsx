import { TextField } from '../components/core/TextField'
import { Button } from '../components/core/Button'

export default function Register() {
  return (
    <div>
      <TextField
        id="username"
        label="Username (Email address)"
        placeholder="Enter email address (i.e js@email.com)"
        minLength={3}
        maxLength={20}
      />
      <TextField
        id="fullname"
        label="Full name"
        placeholder="Enter Full name (i.e. John Smith)"
        minLength={3}
        maxLength={20}
      />
      <TextField
        id="password"
        label="Password"
        placeholder="Enter password"
        minLength={3}
        maxLength={20}
      />
      <TextField
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Re-enter password"
        minLength={3}
        maxLength={20}
      />
      <Button label="Register" />
    </div>
  )
}
