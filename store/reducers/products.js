import PRODUCTS from "../../data/DummyData";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";


const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod=> prod.ownerId === 'u1')
}

export default (state = initialState, action, ImageURL = 'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png') => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const newProd= new Product(new Date().toString(), 'u1', action.productData.title, 
            action.productData.imageUrl, action.productData.description, action.productData.price );
            return {
                ...state,
                userProducts: state.availableProducts.concat(newProd),
                availableProducts: state.availableProducts.concat(newProd)
            }
        case UPDATE_PRODUCT:
            let productIndex = state.userProducts.findIndex( 
                prod => prod.id === action.pid
            );
            const updateProduct = new Product(action.pid, state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
                
                );

                const updatedUserProds = [...state.userProducts];
                updatedUserProds[productIndex = updatedUserProds];
                const availableProdIndex = state.availableProducts.findIndex(
                    prod => prod.id === action.pid
                );
                const updatedAvailProds = [...state.availableProducts];
                updatedAvailProds[availableProdIndex] = updateProduct;

                return{
                    ...state,
                    availableProducts: updatedAvailProds,
                    userProducts: updatedUserProds
                }
        case DELETE_PRODUCT:
            return{
                ...state,
                userProducts: state.userProducts.filter(prod => prod.id !== action.PID),
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.PID),

            }
    }

    return state;
}