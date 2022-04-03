import {Item} from './styles'
import {Link} from 'react-router-dom'
import { produceWithPatches } from 'immer';


export default (props: any) => {
    let price = '';

    if(props.data.priceNegotiable) {
        price = 'Preço Negociável'
    } else {
        price = `R$ ${parseInt(props.data.price).toFixed(2)}`
    }

    return (
        <Item className='aditem'>
            <Link to={`/ad/${props.data.id}`}>
                <div className='itemImage'>
                    <img src={props.data.image} alt='' />
                </div>
                <div className='itemName'>{props.data.title}</div>
                <div className='itemPrice'>{price}</div>
            </Link>    
            
        </Item>
    )
};