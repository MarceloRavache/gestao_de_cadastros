import './Header.css';

interface IHeader {
    action: (value: boolean) => void;
    handleLogout: () => void;
}

const Header = ({action, handleLogout}:IHeader) => {

    return(
        <>
            <div className="menu">
                <div className="menu__logo">GDS</div>
                <div className="menu__links">
                    <div className="menu__link" onClick={() => action(true)}>Carrinho</div>
                    <div className="menu__link" onClick={() => handleLogout()}>Logout</div>
                </div>
            </div>
        </>
    )
}

export default Header;