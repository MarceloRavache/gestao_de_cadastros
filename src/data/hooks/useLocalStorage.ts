import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storaged, setStoraged] = useState(() => {
        try{
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch (err) {
            return initialValue;
        }
    });
    const setValue = (value: T | ((val:T) => T)) => {
        try{
            const valueToSored = value instanceof Function ? value(storaged) : value;

            setStoraged(valueToSored);
            localStorage.setItem(key, JSON.stringify(valueToSored));
        }catch (err){
            console.log(err);
        }
    }

    return [storaged, setValue];
}

export default useLocalStorage;