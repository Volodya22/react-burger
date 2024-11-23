import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './app-header.module.scss'
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { isUserDataLoading, userData } from "../../services/auth/reducer"

export const AppHeader = () => {
  const user = useSelector(userData)
  const isLoading = useSelector(isUserDataLoading)

  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.link}>
          <NavLink to="/">
          {
            ({ isActive }) => (
              <>
                <BurgerIcon className={styles.icon} type={isActive ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>Конструктор</span>
              </>
            )
          }
          </NavLink>
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
          {
            isLoading ? (
              <>Загрузка...</>
            ) : user ? (
              <NavLink to="/profile">
              {
                ({ isActive }) => (
                  <>
                    <ProfileIcon className={styles.icon} type={isActive ? 'primary' : 'secondary'} />
                    <span className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>Личный кабинет</span>
                  </>
                )
              }
              </NavLink>
            ) : (
              <NavLink to="/login">
              {
                ({ isActive }) => (
                  <>
                    <ProfileIcon className={styles.icon} type={isActive ? 'primary' : 'secondary'} />
                    <span className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>Войти</span>
                  </>
                )
              }
              </NavLink>
            )
          }
        </div>
      </div>
    </header>
  )
}
