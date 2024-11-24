import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContainer } from '../auth-container/auth-container'
import { useAppDispatch } from '../../../services/store'
import { getUserAction, registerAction } from '../../../services/auth/actions'

export const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const dispatch = useAppDispatch()

  const handleRegister = (e: SyntheticEvent) => {
    e.preventDefault()

    dispatch(registerAction({ email, password, name }))
  }

  return (
    <AuthContainer title='Регистрация'>
      <form onSubmit={handleRegister}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Имя'
          extraClass="mt-6"
        />
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'password'}
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass='mt-6 mb-20' onClick={handleRegister}>
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default mb-4">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </AuthContainer>
  )
}
