import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getUserOrders } from '../../slices/userOrdersSlice';
import { useEffect } from 'react';
import { getOrders } from '../../actions/ApiActions';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
