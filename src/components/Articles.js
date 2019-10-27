import React, { Component } from 'react';
import axios from 'axios';
import imageDefault from '../assets/images/default.png';
import { Link } from "react-router-dom";
import Global from '../Global';

class Articles extends Component{

    url = Global.url;

    state = {
        anuncios: [],
        status: 'success'
    };

    componentWillMount(){
        var home = this.props.home;
        var search = this.props.search;

        this.getArticles();
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url+'search/'+searched)
            .then(res => {
                
                this.setState({
                    anuncios: res.data.anuncios,
                    status: 'success'
                });
                
            })
            .catch(err => {
                this.setState({
                    anuncios: [],
                    status: 'success'
                });
            });
    }

    getArticles = (searched) => {
        axios.get(this.url+"anuncios")
            .then( res => {
                this.setState({
                    anuncios: res.data.anuncios,
                    status: 'success'
                });
                console.log(this.state);
            });
    }

    render() {
        if(this.state.anuncios.length >= 1){

            var listArticles = this.state.anuncios.map((anuncio) => {

                return (
                    <article className="article-item" id="article-template">
                        <div className="image-wrap">
                            {
                                anuncio.photo !== null ? (
                                    <img src={this.url+'get-photo/'+anuncio.photo} alt={anuncio.title} />                            
                                ) : (
                                    <img src={imageDefault} alt={anuncio.title} />
                                )
                        }
                        </div>

                        <h2>{anuncio.title}</h2>
                        
                        <Link to={'/advert/'+anuncio._id}>Leer Más</Link>
                        <div className="clearfix"></div>
                    </article>
                );

            });
            return (
                <div id="anuncios">
                    {listArticles}
                </div>
            );
        }else if(this.state.anuncios.length === 0 && this.state.status === 'success'){
            return(
                <div id="anuncios">
                    <h2>No hay artículos para mostrar</h2>
                    <p>Todavía no hay contenido en esta sección</p>
                </div>
            );
        }else{
            return (
                <div id="anuncios">
                    <h2>Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            );
        }
    }
}

export default Articles;