import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContainer } from '../auth-container/auth-container'
import { resetPasswordFinish } from '../../../utils/api'

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('reset_password')) {
      navigate('/forgot-password', { replace: true })
    }
  }, [navigate])

  const handleResetPassword = (e: SyntheticEvent) => {
    e.preventDefault()

    resetPasswordFinish({ password, token: code })
      .then(() => {
        localStorage.removeItem('reset_password')
        navigate('/login')
      })
  }

  return (
    <AuthContainer title='Восстановление пароля'>
      <form onSubmit={handleResetPassword}>
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'password'}
          extraClass="mt-6"
          placeholder='Введите новый пароль'
        />
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='Введите код из письма'
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass='mt-6 mb-20' onClick={handleResetPassword}>
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default mb-4">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </AuthContainer>
  )
}
