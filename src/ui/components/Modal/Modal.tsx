import useLocalStorage from '../../../data/hooks/useLocalStorage';
import { useState, useEffect } from 'react';
import './Modal.css';

interface IModal {
    action: (value: boolean) => void;
}

const Modal = ({action}: IModal) => {

    const [carrinho, setCarrinho] = useState([]);

    const items = localStorage.getItem("@carrinho");
    useEffect(() =>{
        if(items){
            console.log(JSON.parse(items).carrinho)
            setCarrinho(JSON.parse(items).carrinho)
        }
    },[items])

    return (
        <div className="modal" onClick={() => action(false)}>
            <div className="modal__base">
                {carrinho?.map((car: any) => 
                    <div className="modal__base-carrinho" key={car.id}>{car.name}</div>    
                )}
            </div>
        </div>
    )
}

export default Modal;