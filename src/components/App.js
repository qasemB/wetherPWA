import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Weather from './Weather';
import SwDev from '../SwDev';

const App = ()=>{
    return (
        <Provider store={store}>
            <div>
                <SwDev/>
                <Weather/>
            </div>
        </Provider>
    ) 
}

export default App;
