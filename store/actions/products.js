

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
 

export const deleteProduct = productId => {
    return{
        type: DELETE_PRODUCT,
        PID: productId
    };
};

export const createProduct = (title, description, ImageURL, price) => {
    return{
        type: CREATE_PRODUCT,
        productData:{
            title,
            description,
            ImageURL,
            price
        } 
    };
};


export const updateProduct =  (id, title, description, ImageURL, price) => {
    return{
        type: UPDATE_PRODUCT,
        pid: id,
        productData:{
            
            title,
            description,
            ImageURL,
            price
        } 
    };
};