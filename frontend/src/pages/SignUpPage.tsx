import { FC } from 'react'
import SingUpForm from '../components/auth/SingUpForm'
import { NavLink } from 'react-router-dom'

const SignUpPage: FC = () => {
  return (
    <>
        <SingUpForm />
        <NavLink to="/signin">Войти</NavLink>
    </>
  )
}

export default SignUpPage