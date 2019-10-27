import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
  withRouter, 
  NavLink
} from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import Articles from './Articles';

class Header extends Component {

  searchRef = React.createRef();

  state = {
      search: "",
      redirect: false
  };

  redirectToSearch = (e) => {
    e.preventDefault();

    this.setState({
      search: this.searchRef.current.value,
      redirect: true
    });
    
  }

  render() {

    if(this.state.redirect){
      return (
        <Redirect to={"/redirect/"+this.state.search} />
      );
    }


    return (
      <React.Fragment>
      <Navbar bg="light" variant="light">
        <li>
            <NavLink to="/">Wallakeep</NavLink>
        </li>
        <Nav className="mr-auto">
          <li>
            <NavLink to="/crear">Crear</NavLink>
          </li>
          <li>
            <NavLink to="/actualizar">Actualizar</NavLink>
          </li>
          <li>
            <NavLink to="/advert">Listado</NavLink>
          </li>
        </Nav>
        <Form inline onSubmit={this.redirectToSearch}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.searchRef}/>
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>

      <Articles />
      </React.Fragment>
    );
  }
}

export default Header;
