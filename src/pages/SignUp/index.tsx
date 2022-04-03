import React, {useState, useEffect} from 'react';
import {PageArea} from './styles'
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/authHandler';

import { PageContainer, PageTitle, ErrorMessage} from '../../components/MainComponents'

const Page = () => {
    const api = useApi();

    const [name, setName] = useState<string>('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [stateList, setStateList] = useState([]);

    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(()=> {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist)
        }
        getStates();
    }, [api])

    const handleSubmit = async(e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword) {
            setError('Senhas não batem')
            setDisabled(false);
            return;
        } 

        const json: any = await api.register(name, email, password, stateLoc)

        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token)
            window.location.href = '/';
        }

        setDisabled(false);
        console.log(json)

    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className='area--title'>Nome Completo</div>
                        <div className='area--input'>
                            <input type='text' disabled={disabled} value={name} onChange={e=>setName(e.target.value)} required/>
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>Estado</div>
                        <div className='area--input'>
                            <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                <option></option>    
                                {stateList &&
                                    stateList.map((i: any, k: number)=>
                                        <option key={k} value={i._id}>{i.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>E-mail</div>
                        <div className='area--input'>
                            <input type='email' disabled={disabled} value={email} onChange={e=>setEmail(e.target.value)} required/>
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>Senha</div>
                        <div className='area--input'>
                            <input type='password' disabled={disabled} value={password} onChange={e=>setPassword(e.target.value)} required/>
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>Confirmar Senha</div>
                        <div className='area--input'>
                            <input type='password' disabled={disabled} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required/>
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;