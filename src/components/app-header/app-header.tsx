import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './app-header.module.scss'

export const AppHeader = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Button className={styles.btn} htmlType="button" type="secondary" size="large">
          <BurgerIcon className={styles.icon} type="primary" />
          Конструктор
        </Button>
        <Button className={styles.btn} htmlType="button" type="secondary" size="large">
          <ListIcon className={styles.icon} type="primary" />
          Лента заказов
        </Button>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Button className={styles.btn} htmlType="button" type="secondary" size="large">
        <ProfileIcon className={styles.icon} type="primary" />
        Личный кабинет
      </Button>
    </nav>
  )
}