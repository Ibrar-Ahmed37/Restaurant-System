import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Dishes} from './Dishes';
import {Leaders} from './Leaders';
import {Comments} from './Comments';
import {Promotions} from './Promotions';
import thunk from 'redux-thunk';
import {createForms} from 'react-redux-form';
import {InitializeFeedBack} from './Forms'
import logger from 'redux-logger';
export const configureStore=()=>
{
    const store=createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions,
            ...createForms({feedback:InitializeFeedBack})
        }),
        applyMiddleware(thunk, logger)
        
    );
    return store;

}