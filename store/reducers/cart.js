import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";






const initialState = {
    items: {},
    total: 0,
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct= action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;


            let updatedorNewCartItem;

            if(state.items[addedProduct.id]){
                //already have item in cart 
                updatedorNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice


                );
               
            } else{
              

    }
    updatedorNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
    return{
        ...state,
        items: {...state.items, [addedProduct.id]: updatedorNewCartItem},
        total: state.total + prodPrice
    };
    case REMOVE_FROM_CART:
        const selectedCartItem = state.items[action.pid];
        const currentQuantity = selectedCartItem.quantity;
        let updatedCartItems;

        if(currentQuantity > 1){
        
            //reduce not erase
            const updatedCartItem = new CartItem(selectedCartItem.quantity - 1,
                selectedCartItem.productPrice,
                selectedCartItem.productTitle,
                selectedCartItem.sum - selectedCartItem.productPrice
                
                );
                updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
               

        } else{
            updatedCartItems = {...state.items};
            delete updatedCartItems[action.pid];

        }
        return {
            ...state,
            items: updatedCartItems,
            total: state.total - selectedCartItem.productPrice
        };
    case ADD_ORDER:
        return initialState;

        case DELETE_PRODUCT:
            if(!state.items[action.PID]){
                return state;
            }

            const updatedItems = {...state.items};
            const itemTotal = state.items[action.PID].sum;
            delete updatedItems[action.PID];

            return{
                ...state,
                items: updatedItems,
                total: state.total - itemTotal
            }
}

 return state;


}