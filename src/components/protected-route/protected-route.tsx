import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { isAppInitialized, userData } from '../../services/auth/reducer';

type ProtectedRouteProps = {
  component: React.ReactElement;
  onlyUnAuth?: boolean;
};

type OnlyUnAuthProps = {
  component: React.ReactElement;
}

export const ProtectedRoute = ({ component, onlyUnAuth = false }: ProtectedRouteProps) => {
  const user = useAppSelector(userData);
  const isInitialized = useAppSelector(isAppInitialized)

  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  if (!isInitialized) {
    return (<p>Загрузка...</p>)
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to={from} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;

export const OnlyUnAuth = ({ component }: OnlyUnAuthProps) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
