import { NavLink } from "react-router-dom"
import styles from './profile-menu.module.scss'
import { logoutAction } from "../../services/auth/actions"
import { useAppDispatch } from "../../services/store"
import { RefreshTokenKey } from "../../services/auth/reducer"

export const ProfileMenu = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    const token = localStorage.getItem(RefreshTokenKey)!;
    dispatch(logoutAction(token));
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <NavLink end to="/profile">
        {
          ({ isActive }) => (
            <>
              <span className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>Профиль</span>
            </>
          )
        }
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/profile/orders">
        {
          ({ isActive }) => (
            <>
              <span className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>История заказов</span>
            </>
          )
        }
        </NavLink>
      </div>
      <div className={styles.item}>
        <a onClick={logout}>
          <span className="text text_type_main-default text_color_inactive">Выход</span>
        </a>
      </div>
    </div>
  )
}
