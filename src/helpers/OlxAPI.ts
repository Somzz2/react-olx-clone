import Cookies from 'js-cookie';
import QueryString from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchFile = async (endpoint: string, body: any) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.append('token', token);
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        body
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}

const apiFetchPost = async (endpoint: string, body: any) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}
const apiFetchGet = async (endpoint: string, body: any = []) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI+endpoint}?${QueryString.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = './signin';
        return;
    }

    return json;
}

const OlxAPI = {

    login:async (email: string, password: string) => {
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        return json;
    },

    register:async (name: string, email: string, password: string, stateLoc: string) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },

    getStates:async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories
    },

    getAds: async (options: object) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        )
        return json;
    },

    getAd: async (id: number, other = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        )
        return json
    },

    addAd: async (fData: object) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json
    }

};

export default () => OlxAPI;