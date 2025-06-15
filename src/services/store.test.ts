import { feedSlice } from "../slices/feed/feedSlice"
import { constructorSlice } from "../slices/constructor/constructorSlice"
import { ingredientsSlice } from "../slices/ingredients/ingredientsSlice"
import { userSlice } from "../slices/user/userSlice"
import { orderSlice } from "../slices/order/orderSlice"
import { userOrdersSlice } from "../slices/userOrders/userOrdersSlice"
import { combineSlices } from "@reduxjs/toolkit"

const initialState = {
  [constructorSlice.name]: constructorSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [userSlice.name]: userSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState(),
  [userOrdersSlice.name]: userOrdersSlice.getInitialState()
}

describe('Проверка RootReducer', ()=>{
  test('Проверка RootReducer', ()=>{
    const rootReducer = combineSlices(
      constructorSlice,
      feedSlice,
      ingredientsSlice,
      userSlice,
      orderSlice,
      userOrdersSlice
    )

    expect(rootReducer).toBeDefined()

    const result = rootReducer(undefined, {type: 'UNKNOWN'})

    expect(result).toEqual(initialState)
  })
})