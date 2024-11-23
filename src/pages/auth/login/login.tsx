import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContainer } from '../auth-container/auth-container'
import { useAppDispatch } from '../../../services/store'
import { loginAction } from '../../../services/auth/actions'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(loginAction({
      email, password
    }))
  }

  return (
    <AuthContainer title='Вход'>
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
      <Button htmlType="button" type="primary" size="medium" extraClass='mt-6 mb-20' onClick={handleLogin}>
        Войти
      </Button>
      <p className="text text_type_main-default mb-4">
        Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default">
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </AuthContainer>
  )
}
