import React from 'react';
import {Switch, Route } from 'react-router-dom';
import NotFound from './components/404/NotFound.js';
import Navbar from './components/Navbar';
import {Box} from "@chakra-ui/core";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Usuarios from './pages/admin/Usuarios'
import Contratos from './pages/mesa/Contratos';
import Clientes from './pages/mesa/PdfVarios'
import DetalleContrato from './pages/mesa/DetalleContrato'
const Router = () => (
  <>
  <Navbar />
  <Box marginTop="10vh"/>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/crearCuenta" component={Signup} />
      <Route exact path="/usuarios" component={Usuarios} />
      <Route exact path="/contratos" component={Contratos} />
      <Route exact path="/clientes" component={Clientes}/>
      <Route exact path="/detalleContrato" component={DetalleContrato}/>
     
      <Route component={NotFound} />
    </Switch>
  </>
);

export default Router;
