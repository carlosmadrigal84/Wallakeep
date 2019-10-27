import React, { Component } from 'react';
import Articles from './Articles';

class Home extends Component{

    render() {
        return(
            <div id="content">
                <h1 class ="subheader">Últimos Artículos</h1>
                <Articles />
            </div>
        );
    }
}

export default Home;