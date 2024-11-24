import { Button } from '../components/Button'
import { TextField } from '../components/TextField'

export default function Login() {
  return (
    <div>
      <TextField
        id="username"
        label="Username"
        placeholder="Input username (email)"
        minLength={1}
        maxLength={10}
      />
      <TextField
        id="password"
        label="Password"
        placeholder="Input password"
        minLength={1}
        maxLength={10}
      />
      <Button label="Login" />
    </div>
  )
}