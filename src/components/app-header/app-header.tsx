import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './app-header.module.scss'

export const AppHeader = () => {
  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.link}>
          <a href="#">
            <BurgerIcon className={styles.icon} type="primary" />
            <span className="text text_type_main-default">Конструктор</span>
          </a>
        </div>
        <div className={styles.link}>
          <a href="#">
            <ListIcon className={styles.icon} type="secondary" />
            <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
          </a>
        </div>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.containerRight}>
        <div className={styles.link}>
          <a href="#">
            <ProfileIcon className={styles.icon} type="secondary" />
            <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
          </a>
        </div>
      </div>
    </header>
  )
}
