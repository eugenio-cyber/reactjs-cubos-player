import Logo from "../../assets/logo.svg";
import Perfil from "../../assets/profile.png";
import "./style.css";

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Ícone do logo" />
      <div className="header__welcome">
        <img className="header__profile" src={Perfil} alt="Imagem do perfil" />
        <h2 className="header__title">Bem vindo, Wesley.</h2>
      </div>
    </header>
  );
}

export default Header;
