import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Articles from './components/Articles';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';


class Router extends Component{

    render(){
        return (
            <BrowserRouter>
                <Header />        
                                
                    {/* CONFIGURAR RUTAS Y PÁGINAS */}
                    <Switch>
                        <Route exact path="/" component={Formulario} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/advert" component={Articles} />
                        <Route exact path="/crear" component={CreateArticle} />
                        <Route exact path="/editar/:id" component={EditArticle} />
                        <Route exact path="/home/:search" component={Search} />
                        <Route exact path="/redirect/:search" render={
                            (props) => {
                                var search = props.match.params.search;
                                return (<Redirect to={'/busqueda/'+search} />);
                            }
                        } />
                        
                        <Route component={Error} />


                        <Route exact path="/advert/:id" component={Article} />

                            return (
                                <div id="content">
                                    <h1 class="subheader">Página de detalle</h1>
            
                                </div>
                            );
                        } />
                    </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;