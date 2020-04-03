import React, {useContext,useEffect} from 'react';
import {Select,Link,List,ListItem,Flex,Box,Heading,Button,Stack,Input,Icon,useToast, SimpleGrid,Text,InputLeftAddon, InputGroup } from "@chakra-ui/core";
import {MyContext} from '../../context'
import {MdPhoneIphone,MdAttachMoney} from "react-icons/md";
import { FaUser} from 'react-icons/fa';

export default function Contratos({history}) {  
    const context = useContext(MyContext)
    /*useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
    })*/
    const {feed,perfil}= context.state
        
    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex direction="column" alignItems="center" justifyContent="center">
{/*Datos del cliente*/}
                <Box  margin="1vh 0" display="flex" width="50vw">
                  <Box padding="10px" color="#FFFFFF" display="flex" backgroundColor="#718096" width="50vw" direction="row" justifyContent="space-around" alignItems="center">
                    <Box as={FaUser} height="20vh" width="20vh"/>
                    <Box textAlign="left" width="50%" display="flex" flexDirection="column">
                      {perfil && <p>{perfil.cliente.NombreCliente}</p>}
                      <br/>
                      <br/>
                      <p>No. Cliente</p>
                      {perfil && <p>{perfil.cliente.NoCliente}</p>}
                    </Box>
                  </Box>
                  <Box display="flex" color="#718096" backgroundColor="#CBD5E0"  width="50vw" flexDirection="column" justifyContent="space-around">
                    <Box>
                      <Icon name="email"/>
                      {perfil && <>    {perfil.cliente.Email}</>}
                    </Box>
                    <Box>
                      <Icon name="phone"/>
                      {perfil && <>    {perfil.cliente.Telefono}</>}
                    </Box>
                    <Box display="flex" alignSelf="center" alignItems="center">
                      <Text as={MdPhoneIphone} display="inline"/>
                      {perfil && <p>    {perfil.cliente.Celular}</p>}
                    </Box>
                  </Box>
                </Box>  
{/*Resumen de cuentas */}
                <Box margin="1vh 0" backgroundColor="teal.300" color="#FFFFFF" display="flex" width="50vw" justifyContent="space-between" alignItems="center" padding="15px"> 
                  <Heading size="lg" fontWeight="100" width="20vw">Resumen de cuentas</Heading>
                  <Box display="flex" alignItems="center">
                    <Box>
                      {perfil && perfil.resumen && <Heading>$ {perfil.resumen.SaldoAlCorte}</Heading>}
                      <p>Saldo total al corte</p>
                      {perfil && perfil.resumen &&<small>Última fecha de corte {perfil.resumen.FechaCorte.substring(0,10)}</small>}
                    </Box>
                    <Button href="/detalleContrato" leftIcon={MdAttachMoney} backgroundColor="#718096" variant="solid">Pagar</Button>
                  </Box>
                </Box>

              </Flex>
            );
          }}
        </MyContext.Consumer>
      )
}


