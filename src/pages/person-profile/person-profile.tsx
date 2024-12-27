import { useLocation } from "react-router"
import { ProfileMenu } from "../../components/profile-menu/profile-menu"
import { ProfilePage } from "./profile/profile";
import { OrderHistoryPage } from "./order-history/order-history";
import styles from './person-profile.module.scss';

export const PersonProfilePage = () => {
  const url = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ProfileMenu />
        { url.pathname !== "/profile" && (
          <p className={styles.note}>
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        )}
      </div>
      {
        (url.pathname === "/profile" ? <ProfilePage /> : <OrderHistoryPage />)
      }
    </div>
  )
}
