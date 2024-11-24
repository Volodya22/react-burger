import styles from './auth-container.module.scss'
import { ReactNode } from 'react'

export const AuthContainer = (props: { children: ReactNode, title: string }) => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className="text text_type_main-large">{props.title}</h1>
        {props.children}
      </div>
    </div>
  )
}
