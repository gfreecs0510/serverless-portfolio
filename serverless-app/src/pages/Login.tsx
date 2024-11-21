import { Button } from '../components/Button'
import { TextField } from '../components/TextField'
import { Heading } from '../components/Heading'
import { Logo } from '../components/Logo'

export default function Login() {
  function LinkText({ href, children }) {
    return (
      <a
        href={href}
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        {children}
      </a>
    )
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Alify"
          height="10"
          width="auto"
        />
        <Heading text="Sign in to your account" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <TextField
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
          ></TextField>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <LinkText href="#">Forgot password?</LinkText>
              </div>
            </div>
            <TextField
              id="password"
              type="password"
              label='Password'
              placeholder='Password'
              autoComplete="current-password"
              required={true}
            ></TextField>
          </div>

          <Button
            onClick={() => {
              console.log('damn')
            }}
            text="Login"
            type="submit"
          ></Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member? <LinkText href="#">Register</LinkText>
        </p>
      </div>
    </div>
  )
}
