import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import imageDefault from '../assets/images/default.png';



class Article extends Component {

        url = Global.url;
    
        state = {
            article: false,
            status: null
        };
    
        componentWillMount() {
            this.getArticle();
        }
    
        getArticle = () => {
            var id = this.props.match.params.id;
    
            axios.get(this.url + 'article/' + id)
                .then(res => {
                    this.setState({
                        article: res.data.article,
                        status: 'success'
                    });

                }).catch(err => {
                    this.setState({
                        article: false,
                        status: 'success'
                    });
                });
        }
    
        render() {
            var article = this.state.article;
            return(
                <div className="center">
                    <section id="content">
    
                        {this.state.article&&
                            <article className="article-item article-detail">
                                <div className="image-wrap">
                                {
                                    article.photo !== null ? (
                                        <img src={this.url+'get-image/'+article.photo} alt={article.title} />                            
                                    ) : (
                                        <img src={imageDefault} alt={article.title} />
                                    )
                                }
                                </div>
                                <h1 className="subheader">{article.title}</h1>
                                <p>{article.content}</p>                                
                                <Link to={'/editar/'+article._id} className="btn btn-warning">Editar</Link>    
                                <div className="clearfix"></div>
                            </article>
                        }
    
                        {!this.state.article && this.state.status === 'success' &&
                            <div id="article">
                                <h2 className="subheader">El artículo no existe</h2>
                                <p>Inténtalo más tarde</p>
                            </div>
                        }
                    </section>
                </div>
            );
        }
    }
    
    export default Article;