import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getConstructorIngredients,
  getConstructorBread
} from '../../slices/constructorSlice';
import { getIsLoadOrder } from '../../slices/orderSlice';
import { getSuccessOrder } from '../../slices/orderSlice';
import { postOrder } from '../../actions/ApiActions';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../slices/userSlice';
import { packOrder } from '../../utils/packOrder';
import { clearSuccessOrder } from '../../slices/orderSlice';
import { clearConstructor } from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: useSelector(getConstructorBread),
    ingredients: useSelector(getConstructorIngredients)
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderRequest = useSelector(getIsLoadOrder);
  const orderModalData = useSelector(getSuccessOrder);
  const userInfo = useSelector(getUserInfo);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userInfo.email || !userInfo.name) {
      navigate('/login', {replace: true});
      return;
    }
    dispatch(
      postOrder(packOrder(constructorItems.ingredients, constructorItems.bun))
    ).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    navigate('/feed');
    dispatch(clearSuccessOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
