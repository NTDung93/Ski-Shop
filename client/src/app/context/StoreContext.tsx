import { PropsWithChildren, createContext, useState } from "react";
import { Basket } from '../models/basket';
import React from "react";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error('Oops - we do not seem to be inside the provider');
    }
    return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBaket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            // if (items[itemIndex].quantity <= 0) {
            //     items.splice(itemIndex, 1);
            //     setBaket(prevState => {
            //         return { ...prevState!, items }
            //     })
            // }
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBaket(prevState => {
                return { ...prevState!, items }
            })
        }
    }

    return (
        //define what we gonna provide to our children in our app
        <StoreContext.Provider value={{ basket, setBasket: setBaket, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}