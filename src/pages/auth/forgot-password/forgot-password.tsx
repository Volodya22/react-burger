import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContainer } from '../auth-container/auth-container'
import { resetPassword } from '../../../utils/api'

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const handleForgotPassword = () => {
    resetPassword(email)
      .then(() => {
        localStorage.setItem("reset_password", "1")
        navigate('/reset-password', { replace: true })
      })
  }

  return (
    <AuthContainer title='Восстановление пароля'>
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={'email'}
        isIcon={false}
        extraClass="mt-6"
        placeholder='Укажите e-mail'
      />
      <Button htmlType="button" type="primary" size="medium" extraClass='mt-6 mb-20' onClick={handleForgotPassword}>
        Восстановить
      </Button>
      <p className="text text_type_main-default mb-4">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </AuthContainer>
  )
}
