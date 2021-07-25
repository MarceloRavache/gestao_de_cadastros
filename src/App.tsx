import Header from './ui/components/surfaces/Header/Header';
import data from './data';
import { useCallback, useRef, useState } from 'react';
import useLocalStorage from './data/hooks/useLocalStorage';
import Modal from './ui/components/Modal/Modal';

import './App.css';
import { useEffect } from 'react';

function App() {

  const [user, setUser] = useLocalStorage("@user",{});
  const [modal, setModal] = useState(false);

  const name = useRef<HTMLInputElement>(null);
  const endereco = useRef<HTMLInputElement>(null);
  const cidade = useRef<HTMLInputElement>(null);
  const estado = useRef<HTMLInputElement>(null);

  const { products } = data();

  useEffect(()=>{
    const carrinho = localStorage.getItem("@carrinho");
    if(!carrinho){
      localStorage.setItem("@carrinho", JSON.stringify({carrinho: []}));
    }
  },[])

  const submitUser = useCallback(() => {
    setUser(
      {
        name:name.current?.value,
        endereco:endereco.current?.value,
        cidade:cidade.current?.value,
        estado:estado.current?.value
      }
    );
  },[]);
  const submitBuy = useCallback((value) => {
    const carrinho = localStorage.getItem("@carrinho");
    if(carrinho){
      const products = JSON.parse(carrinho)
      const product = products.carrinho.find((car: any)=> car.id === value.id);
      if(product === undefined){
        console.log(product);

        localStorage.setItem("@carrinho",JSON.stringify({carrinho:[...products.carrinho,{id: value.id, name: value.title}]}));
      }
    }
    
  },[]);

  const handleModal = useCallback((value) => {
    setModal(value);
  },[]);

  const handleLogout = useCallback(() => {
    setUser({});
  },[]);

  return (
    <div>
      { modal && <Modal action={handleModal} />}
      <Header action={handleModal} handleLogout={handleLogout} />
      <header className="app__header">
        <div className="app__header-content">
          Gestão de cadastros com LocalStorage
        </div>
        {user.name === undefined && 
          <div className="app__header-conectar">
            <input ref={name} type="text" placeholder="Nome"/>
            <input ref={endereco} type="text" placeholder="Endereço"/>
            <input ref={cidade} type="text" placeholder="Cidade"/>
            <input ref={estado} type="text" placeholder="Estado"/>
            <button onClick={() => submitUser()}>Conectar</button>
          </div>
        }
      </header>
      <main className="app__main">
        <div className="app__main-products">
          {products.map(product =>
            <div className="app__main-product">
              <img src={product.image} alt="" />
              <h3>{product.title}</h3>
              <h5>{product.description}</h5>
              <button onClick={() => submitBuy(product)}>Comprar</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
