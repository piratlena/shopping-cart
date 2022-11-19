import { createContext, useState} from 'react';
import { productsArray, getProductData} from './productsStore';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export function CartProvider({children}) {

    const [cartProducts, setCartProducts] = useState([])

 function getProductQuantity(id) {
 const quantity = cartProducts.find(product => product.id === id)?.quantity
    if(quantity === undefined) {
        return 0;
    }
    return quantity;
 }

 function addOneToCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
        setCartProducts([
            ...cartProducts,
            {
                id: id,
                quantity: 1
            }
        ])
    } else {
        setCartProducts(
            cartProducts.map(
                product => 
                product.id === id
                ? {...product, quantity: product.quantity + 1}
                : product
            )
        )
    }
 }

 function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity == 1) {
        deleteOneFromCart(id)
    } else {
            setCartProducts(
                cartProducts.map(
                    product => 
                    product.id === id
                    ? {...product, quantity: product.quantity - 1}
                    : product
                )
            )
        
    }
 }

 function deleteOneFromCart(id) {
    setCartProducts(
        cartProducts => 
        cartProducts.filter(currentProduct => {
            return currentProduct.id != id;
        })
    )
 }

 function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
        const getProductData = getProductData(cartItem.id);
        totalCost += (getProductData.price * cartItem.quantity)
    })
    return totalCost
 }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteOneFromCart,
        getTotalCost
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;
