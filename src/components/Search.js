import React, { Component } from "react";
import axios from "axios";
import Articles from './Articles';

class Search extends Component {

    render() {
        var searched = this.props.match.params.search;

    return (
      <div id="blog">        
        <div className="center">
          <div id="content">
                {/* Listado de artículos que vienen de la API */}            
                <Articles 
                    search={searched}
                />
          </div>
        </div>
      </div>
    );
    }
}


export default Search;