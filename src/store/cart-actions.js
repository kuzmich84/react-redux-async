import {uiActions} from "./ui-slice"
import { cartActions } from "./cart-slice"

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-redux-async-b6c1d-default-rtdb.europe-west1.firebasedatabase.app/cart.json')

            if (!response) {
                throw new Error('Could not fetch cart data!')
            }

            return await response.json()
        }

        try{
           const cartData =  await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Fetched cart data successfully!',
            }))
            
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!.',
                message: 'Fetching cart data failed!',
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
        }))

        const sendRequest = async () => {
            const response = await fetch('https://react-redux-async-b6c1d-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity }),
            })

            if (!response.ok) {
                throw new Error('Sending cart data failed!')
            }
        }

        try {
            await sendRequest()

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!',
            }))
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!.',
                message: 'Sending cart data failed!',
            }))
        }


    }
}