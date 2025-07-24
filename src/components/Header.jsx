import { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/circulou_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdPersonOutline, MdNotificationsNone } from 'react-icons/md';
import { jwtDecode } from 'jwt-decode';

const getInitialLoginState = () => {
  const token = localStorage.getItem("token");
  if (!token) return { usuarioLogado: false, nomeUsuario: "", userId: null };
  try {
    const decoded = jwtDecode(token);
    const agora = Date.now() / 1000;
    if (decoded.exp > agora) {
      const usuarioData = localStorage.getItem("usuario");
      const storedUserId = localStorage.getItem("userId");
      if (usuarioData && storedUserId) {
        const usuario = JSON.parse(usuarioData);
        return { usuarioLogado: true, nomeUsuario: usuario.nome?.split(" ")[0] || "", userId: storedUserId };
      }
    }
  } catch (err) {
    console.error("Erro ao decodificar token no carregamento inicial do Header:", err);
  }
  return { usuarioLogado: false, nomeUsuario: "", userId: null };
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [{ usuarioLogado, nomeUsuario, userId }, setLoginState] = useState(getInitialLoginState);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const deslogar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("usuario");

    setLoginState({ usuarioLogado: false, nomeUsuario: "", userId: null });
    window.dispatchEvent(new Event('logoutEvent'));
    navigate("/");
  };



  useEffect(() => {
    const handleLoginStatusChange = () => {
      setLoginState(getInitialLoginState());
    };

    handleLoginStatusChange();

    window.addEventListener("storage", handleLoginStatusChange);
    window.addEventListener("logoutEvent", handleLoginStatusChange);

    return () => {
      window.removeEventListener("storage", handleLoginStatusChange);
      window.removeEventListener("logoutEvent", handleLoginStatusChange);
    };
  }, []);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 justify-content-between">
      <div className="container-fluid">
        <div className="d-flex align-items-center flex-grow-1">
          <Link to="/" className="navbar-brand me-4">
            <img src={logo} alt="Logo Circulou" style={{ height: '90px' }} />
          </Link>
          <div className="input-group me-4" style={{ maxWidth: '300px' }}></div>
        </div>

        <button className="navbar-toggler" type="button" onClick={toggleMobileMenu} aria-controls="navbarNav" aria-expanded={isMobileMenuOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="d-none d-lg-flex align-items-center">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/" className='nav-link'>Página Inicial</Link></li>
            <li className="nav-item"><Link to="/itens" className='nav-link'>Ver Itens</Link></li>
            {usuarioLogado &&
              <>
                <li className="nav-item"><Link to="/meus-itens" className='nav-link'>Meus Itens</Link></li>
                <li className="nav-item"><Link to="/minhas-propostas" className='nav-link'>Minhas Propostas</Link></li>
              </>
            }
          </ul>


          <div style={{ borderLeft: '1px solid #CCC', height: '30px', margin: '0 15px' }}></div>


          {usuarioLogado ? (
            <Link to="/cadastrar-item" className="btn btn-primary me-3" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Cadastrar Item</Link>
          ) : (
            <Link to="/login" className="btn btn-primary me-3" style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Login</Link>
          )}

          {usuarioLogado && (
            <Link to="/notificacoes" className="text-dark me-2" style={{ fontSize: '1.5em' }}>
              <MdNotificationsNone />
            </Link>
          )}

          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <button onClick={() => setMenuAberto(!menuAberto)} className="btn pt-2 me-2 text-dark" style={{ border: "none" }}>
              <MdPersonOutline size={24} />
            </button>

            {usuarioLogado && nomeUsuario && (
              <span style={{ fontSize: "0.95em", fontWeight: "500", color: "#333" }}>Olá, {nomeUsuario}!</span>
            )}

            {menuAberto && usuarioLogado && (
              <div style={{ position: "absolute", right: 0, top: "100%", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", borderRadius: "6px", padding: "0.5rem", zIndex: 1000, width: "180px" }}>
                <Link to="/perfil" className="btn btn-sm btn-outline-primary w-100 mb-2" onClick={() => setMenuAberto(false)}>Ver Perfil</Link>

                {userId && (
                  <Link to={`/usuario/${userId}`} className="btn btn-sm btn-outline-primary w-100 mb-2" onClick={() => setMenuAberto(false)}>
                    Ver Perfil Público
                  </Link>
                )}

                <button onClick={deslogar} className="btn btn-sm btn-outline-danger w-100">Sair</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={toggleMobileMenu} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}>
          <div className="mobile-nav-menu bg-white p-4" onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '250px', boxShadow: '-2px 0 5px rgba(0,0,0,0.2)' }}>
            <button className="btn-close" onClick={toggleMobileMenu} style={{ position: 'absolute', top: '10px', right: '10px' }}></button>

            {usuarioLogado && nomeUsuario && (
              <span style={{ fontSize: "0.95em", fontWeight: "500", color: "#333" }}>Olá, {nomeUsuario}!</span>
            )}
            <ul className="navbar-nav flex-column">
              <li className="nav-item"><Link className="nav-link" to="/" onClick={toggleMobileMenu}>Página Inicial</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/itens" onClick={toggleMobileMenu}>Ver Itens</Link></li>
              {usuarioLogado && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/meus-itens" onClick={toggleMobileMenu}>Meus Itens</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/minhas-propostas" onClick={toggleMobileMenu}>Minhas Propostas</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/notificacoes" onClick={toggleMobileMenu}>Notificações</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/perfil" onClick={toggleMobileMenu}>Perfil</Link></li>
                </>
              )}

              <li className="nav-item mt-3">
                {usuarioLogado ? (
                  <Link className="btn btn-primary w-100" to="/cadastrar-item" onClick={toggleMobileMenu} style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Cadastrar Item</Link>
                ) : (
                  <Link className="btn btn-primary w-100" to="/login" onClick={toggleMobileMenu} style={{ backgroundColor: '#3accfa', borderColor: '#3accfa' }}>Login</Link>
                )}
              </li>

              {usuarioLogado && (
                <li className="nav-item"><button className="btn btn-outline-danger w-100 mt-3" onClick={deslogar}>Sair</button></li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;