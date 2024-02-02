import { FC } from 'react'
import AuthForm from '../components/auth/AuthForm'
import { NavLink } from 'react-router-dom'

const AuthPage: FC = () => {
  return (
    <>
        <AuthForm />
        <NavLink to='/signup'>Зарегестрироваться</NavLink>
    </>
  )
}

export default AuthPage