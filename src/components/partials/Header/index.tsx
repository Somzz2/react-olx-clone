import React from 'react';
import { Link } from 'react-router-dom';
import {HeaderArea} from './styles';

import { doLogout, isLogged } from '../../../helpers/authHandler';

const Header = () => {
    let logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }

    return (
        <HeaderArea>
            <div className='container'>
                <div className='logo'>
                    <Link to="/">
                        <span className='logo-1'>O</span>
                        <span className='logo-2'>7</span>
                        <span className='logo-3'>X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/my-account">Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link className='button 'to="/post-an-ad">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged &&
                        <>
                            <li>
                                <Link to="/signin">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Cadastrar</Link>
                            </li>
                            <li>
                                <Link className='button 'to="/signin">Poste um anúncio</Link>
                            </li>
                        </>
                        }

                    </ul>
                </nav>
            </div>
        </HeaderArea>
    )
}
export default Header