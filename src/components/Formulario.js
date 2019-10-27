import React, { Component } from 'react';

class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();

    state = {
        user: {}
    }

    recibirFormulario = (e) => {
        e.preventDefault();

        var genero = 'hombre';

        if(this.generoHombreRef.current.checked){
            genero = this.generoHombreRef.current.value;
        }else if(this.generoMujerRef.current.checked){
            genero = this.generoMujerRef.current.value;
        };

        localStorage.setItem("key", "value");

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            genero: genero
        }

        this.setState({
            user: user
        });

        console.log(user);

    }

    render (){

        if(this.state.user.nombre){
            var user = this.state.user;
        }

        return (
            <div id="formulario">
                {this.state.user.nombre &&
                    <div id="user-data">
                        <p>Nombre: <strong>{user.nombre}</strong></p>
                        <p>Apellidos: <strong>{user.apellidos}</strong></p>
                        <p>Género: <strong>{user.genero}</strong></p>
                    </div>
                }
                {/* Crear un formulario */}
                <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" name="nombre" ref={this.nombreRef}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input type="text" name="apellidos" ref={this.apellidosRef}/>
                    </div>

                    <div className="form-group radibuttons">
                        <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef}/> Hombre
                        <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef}/> Mujer
                    </div>

                    <div className="clearfix"></div>
                    <input type="submit" value="Enviar" className="boton" />
                </form>
            </div>
        ); 
    }
}
export default Formulario;