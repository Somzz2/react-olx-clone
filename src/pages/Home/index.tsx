import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {SearchArea, PageArea} from './styles'
import useApi from '../../helpers/OlxAPI';

import { PageContainer} from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

const Page = () => {
    const api = useApi();

    const [stateList, setStateList] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [adList, setAdList] = useState([])

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist)
        }
        getStates();
        
    }, []);

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats)
        }
        getCategories();
    }, []);

    useEffect(()=>{
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit: 8
            });
            setAdList(json.ads);
        };
        getRecentAds();
    }, []);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className='searchBox'>
                        <form method='GET' action='/ads'>
                            <input type='text' name='q' placeholder='O que você procura?' />
                            <select name='state'>
                                {stateList.map((i: any, k: number)=>
                                    <option key={k} value={i.name}>{i.name}</option>    
                                )}
                            </select>
                            <button>Pesquisar</button>                        
                        </form>
                    </div>
                    <div className='categoryList'>
                        {categories.map((i: any, k: number)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className='categoryItem'>
                                <img src={i.img} alt=''/>
                                <span>{i.name}</span>
                            </Link>
                            )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                   <h2>Anúncios Recentes</h2>
                   <div className='list'>
                       {adList.map((i: any, k: number)=>
                            <AdItem key={k} data={i} />
                       )}
                       
                    </div>
                    <Link to='/ads' className='seeAllLink'>Ver Todos</Link>

                    <hr />
                    ...
                </PageArea>
            </PageContainer>
        </>

    );
}

export default Page;