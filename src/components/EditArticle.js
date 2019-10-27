import React,{ Component } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import imageDefault from '../assets/images/default.png';
import Global from '../Global';

// 1. Tenemos que recoger el id del artículo a editar de la url
// 2. Crear un métido para sacar ese objeto del backend
// 3. Repoblar / rellenar el formulario con esos datos
// 4. Actualizar el objeto haciendo una petición al backend

class EditArticle extends Component{

    url = Global.url;

    titleRef = React.createRef();
    contentRef = React.createRef();

        
    state = {
        anuncios: [],
        status: null,
        selectedFile: null
    }
   

    componentWillMount(){
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido.'
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'anuncio/' + id)
            .then(res => {
                this.setState({
                    article: res.data.anuncio
                })
            });
    }

    changeState = () => {
        this.setState({
            anuncio: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                photo: this.state.anuncio.photo
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();
        // Rellenar el state con formulario
        this.changeState();

        if(this.validator.allValid()){
        // Hacer una petición http por post para guardar el artículo. Lo cambio a put para actualizar el artículo.
        axios.put(this.url+'anuncio/'+this.articleId, this.state.anuncio)
            .then(res => {
                if(res.data.anuncio){
                    this.setState({
                        anuncio: res.data.anuncio,
                        status: 'waiting'
                    });

                    swal(
                        'Artículo creado',
                        'El artículo ha sido creado con éxito',
                        'success'
                    );

                    //Subir la imagen
                    if(this.state.selectedFile !== null){

                        // Sacar el id del artículo guardado
                        var articleID = this.state.anuncio._id;

                        // Crear form data y añadir fichero
                        const formData = new FormData();

                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );

                        // Petición ajax
                        axios.post(this.url + 'upload-image/' + articleID, formData)
                            .then(res => {
                                if(res.data.anuncio){
                                    this.setState({
                                        anuncio: res.data.anuncio,
                                        status: 'success'
                                    });
                                }else{
                                    this.setState({
                                        anuncio: res.data.anuncio,
                                        status:'success'
                                    });
                                }
                            });
                    }else{
                        this.setState({
                            status: 'success'
                        });
                    }
                }else{
                    this.setState({
                        status: 'failed'
                    });
                }
            });
        } else {

            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render() {

        if(this.state.status === 'success'){
            return <Redirect to="/Articles" />;
        }
        var anuncio = this.state.anuncio;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Artículo</h1>

                    {this.state.anuncio.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Título:</label>
                                <input type="text" name="title" defaultValue={anuncio.title} ref={this.titleRef} onChange={this.changeState}/>
                                
                                {this.validator.message('title', this.state.anuncio.title, 'required|alpha_num_space')}


                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido:</label>
                                <textarea name="content" defaultValue={anuncio.content} ref={this.contentRef} onChange={this.changeState} ></textarea>
                                {this.validator.message('content', this.state.anuncio.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>                                
                                <div className="image-wrap">
                                {
                                    anuncio.photo !== null ? (
                                        <img src={this.url+'get-image/'+anuncio.photo} alt={anuncio.title} />                            
                                    ) : (
                                        <img src={imageDefault} alt={anuncio.title} className="thumb" />
                                    )
                                }
                                </div>                                
                                <input type="file" name="file0" onChange={this.fileChange}/>
                            </div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {this.state.anuncio.title &&
                        <h2>Cargando...</h2>
                    }
                </section>
            </div>
        )
    }
}

export default EditArticle;