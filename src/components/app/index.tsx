import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/auth/login/login';
import { AppHeader } from '../app-header/app-header';
import { RegisterPage } from '../../pages/auth/register/register';
import { ForgotPasswordPage } from '../../pages/auth/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/auth/reset-password/reset-password';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect, useMemo } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { PersonProfilePage } from '../../pages/person-profile/person-profile';
import { OrderHistoryPage } from '../../pages/person-profile/order-history/order-history';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import Modal from '../modals/modal/modal';
import { IngredientDetails } from '../modals/ingredient-details/ingredient-details';
import { selectIngredient } from '../../services/ingredients/reducer';
import { getUserAction } from '../../services/auth/actions';
import { AccessTokenKey, appInitialized } from '../../services/auth/reducer';
import { FeedPage } from '../../pages/feed/feed';
import { OrderDataPage } from '../modals/order-data/order-data';

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    if (localStorage.getItem(AccessTokenKey)) {
      dispatch(getUserAction())
    }

    dispatch(getIngredients())
    dispatch(appInitialized())
  }, [])

  const toggle = () => {
    dispatch(selectIngredient(null));
    navigate('/', { replace: true });
  }

  const toggleFeed = () => {
    navigate('/feed', { replace: true });
  }

  const toggleHistory = () => {
    navigate('/profile/orders', { replace: true });
  }

  const routes = useMemo(() => (
    <Routes location={state?.backgroundLocation || location}>
      <Route path="/" Component={HomePage}></Route>
      <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />}></Route>
      <Route path="/register"element={<OnlyUnAuth component={<RegisterPage />} />}></Route>
      <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />}></Route>
      <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />}></Route>
      <Route path="/profile" element={<OnlyAuth component={<PersonProfilePage />} />}></Route>
      <Route path="/profile/orders" element={<OnlyAuth component={<PersonProfilePage />} />}></Route>
      <Route path="/ingredients/:id" element={<IngredientDetails />}></Route>
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/feed/:number" element={<OrderDataPage />} />
      <Route path="profile/orders/:number" element={<OnlyAuth component={<OrderDataPage />} />} />
      <Route path="*" Component={NotFoundPage}></Route>
    </Routes>
  ), [state, location])

  const modalRoutes = useMemo(() => (
    state?.backgroundLocation && (
      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <Modal wrapperId="modals" toggle={toggle}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal wrapperId="modals" toggle={toggleFeed}>
              <OrderDataPage />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal wrapperId="modals" toggle={toggleHistory}>
              <OrderDataPage />
            </Modal>
          }
        />
      </Routes>
  )), [state])

  return (
    <>
      <AppHeader />
      {routes}
      {modalRoutes}
    </>
  );
};
