import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { getCurrentOrder } from '../../slices/feedSlice';
import { getIngredientsList } from '../../slices/ingredientsSlice';
import { useEffect } from 'react';
import { getOrderByNumber } from '../../actions/ApiActions';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  /** TODO: взять переменные orderData и ingredients из стора */

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, [dispatch]);

  const orderData = useSelector(getCurrentOrder);
  const ingredients: TIngredient[] = useSelector(getIngredientsList);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  console.log(orderInfo.status);
  return <OrderInfoUI orderInfo={orderInfo} />;
};
