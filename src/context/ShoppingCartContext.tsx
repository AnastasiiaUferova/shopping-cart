import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContextProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider ({children}:ShoppingCartContextProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce(
        (quantity, item)=> item.quantity + quantity,
        0
    )

    const openCart = () => {
        setIsOpen(true)
    }

    const closeCart = () => {
        setIsOpen(false)
    }

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id:number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) { //check if we have the item
                return [...currItems, {id, quantity: 1}]} //add item quantity if null
            else {
                return currItems.map(item => { 
                    if (item.id === id) {
                        return {...item, quantity: item.quantity+1} //increase quantity if not null
                    }
                    else return item //we don't change quantity of an item if the id is not the same
                })
            }
        })
    }

    function decreaseCartQuantity(id:number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity == 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    }
                    else return item
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems =>  {
            return  currItems.filter(item => item.id !== id)
        })
    }


    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart
            }}>
            {children}
            <ShoppingCart  isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}