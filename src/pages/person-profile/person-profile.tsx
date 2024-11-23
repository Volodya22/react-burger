import { useLocation } from "react-router"
import { ProfileMenu } from "../../components/profile-menu/profile-menu"
import { ProfilePage } from "./profile/profile";
import { OrderHistoryPage } from "./order-history/order-history";
import styles from './person-profile.module.scss';

export const PersonProfilePage = () => {
  const url = useLocation();

  return (
    <div className={styles.container}>
      <ProfileMenu />
      {
        (url.pathname === "/profile" ? <ProfilePage /> : <OrderHistoryPage />)
      }
    </div>
  )
}
