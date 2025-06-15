import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserInfo } from '../../slices/user/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserInfo);

  return <AppHeaderUI userName={user.name} />;
};
