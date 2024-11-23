import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { SyntheticEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../services/store"
import { userData } from "../../../services/auth/reducer"
import { updateUserAction } from "../../../services/auth/actions"

export const ProfilePage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const user = useAppSelector(userData)
  const dispatch = useAppDispatch()

  const isFormChanged = name !== user?.name || email !== user?.email || !!password

  useEffect(() => {
    setName(user!.name)
    setEmail(user!.email)
  }, [user])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateUserAction({ email, name, password }))
  }

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    setName(user!.name)
    setEmail(user!.email)
    setPassword('')
  };
  
  return (
    <div>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Имя'
        icon={'EditIcon'}
      />
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={'email'}
        isIcon={true}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mt-6"
        icon={'EditIcon'}
      />
      {isFormChanged && (
        <div className="mt-6">
          <Button type='primary' size='medium' htmlType='submit' onClick={handleSubmit}>
            Сохранить
          </Button>
          <Button type='secondary' htmlType='button' size='medium' onClick={handleCancel}>
            Отменить
          </Button>
        </div>
      )}
    </div>
  )
}
