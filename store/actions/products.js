import Product from "../../models/product";

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';


 


export const fetchProducts = () => {
return async dispatch => {
    //any async code you want
    try{
   const response = await fetch('https://shop-app-faf07-default-rtdb.firebaseio.com/products.json' );

   if(!response.ok){
       throw new Error('something went wrong')
   }


    const resData = await response.json();
    console.log(resData);
    const loadedProducts = [];
    for(const key in resData){
        loadedProducts.push(new Product(key, 'u1', resData[key].title, resData[key].ImageURL, resData[key].description, resData[key].price ))
    }


    dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts

    });
} catch(err){


    throw err;
}

};
};

export const deleteProduct = productId => {
    return async dispatch => {

     const response =  await fetch(`https://shop-app-faf07-default-rtdb.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE',
            
        });
        if(!response.ok){
            throw new Error('something went wrong')
        }

        dispatch({
            type: DELETE_PRODUCT,
            PID: productId
        });
    }
 
};

export const createProduct = (title, description, ImageURL, price) => {
    return async dispatch => {
        //any async code you want
        
       const response = await fetch('https://shop-app-faf07-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description,
                ImageURL,
                price
            })
        });
    
        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData:{
                id: resData.name,
                title,
                description,
                ImageURL,
                price
            } 

    });
   
    };
};


export const updateProduct =  (id, title, description, ImageURL, price) => {
    return async dispatch => {
     const response = await fetch(`https://shop-app-faf07-default-rtdb.firebaseio.com/product/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description,
                ImageURL,
                price
            })
        });

        if(!response.ok){
            throw new Error('something went wrong');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData:{
                title,
                description,
                ImageURL,
                price
        }
    });
  
    };
};