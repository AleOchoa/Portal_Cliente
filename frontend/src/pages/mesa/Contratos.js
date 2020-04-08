import React, {useContext,useEffect} from 'react';
import {Link,Flex,Box,Heading,Button,Icon,Text,Collapse,IconButton } from "@chakra-ui/core";
import {MyContext} from '../../context'
import {MdPhoneIphone,MdAttachMoney} from "react-icons/md";
import { FaUser} from 'react-icons/fa';

export default function Contratos({history}) {  
  const context = useContext(MyContext)
  const go = async (path,indx) =>{
    if (indx>=0) {await context.setContratoDetalle(indx)}
    history.push(path)
  }
  
  const {perfil}= context.state
  const handleToggle =  (id) => context.showContrato(id)  ;
  useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
    })
    
        
    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex direction="column" alignItems="center" justifyContent="center">
{/*Datos del cliente*/}
                <Box  margin="1vh 0" display="flex" width="50vw">
                  <Box padding="10px" color="color4" display="flex" backgroundColor="color1" width="50vw" direction="row" justifyContent="space-around" alignItems="center">
                    <Box as={FaUser} height="20vh" width="20vh"/>
                    <Box textAlign="left" width="50%" display="flex" flexDirection="column">
                      {perfil && <p>{perfil.cliente.NombreCliente}</p>}
                      <br/>
                      <br/>
                      <p>No. Cliente</p>
                      {perfil && <p>{perfil.cliente.NoCliente}</p>}
                    </Box>
                  </Box>
                  <Box display="flex" color="color1" backgroundColor="color2"  width="50vw" flexDirection="column" justifyContent="space-around">
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
                <Box margin="1vh 0" backgroundColor="color3" color="color4" display="flex" width="50vw" justifyContent="space-between" alignItems="center" padding="15px"> 
                  <Heading size="lg" fontWeight="100" width="20vw">Resumen de cuentas</Heading>
                  <Box display="flex" alignItems="center">
                    <Box>
                      {perfil && perfil.resumen && <Heading>$ {perfil.resumen.SaldoAlCorte}</Heading>}
                      <p>Saldo total al corte</p>
                      {perfil && perfil.resumen &&<small>Última fecha de corte {perfil.resumen.FechaCorte.substring(0,10)}</small>}
                    </Box>
                    <Button onClick={() => go('/clientes',null)} leftIcon={MdAttachMoney} backgroundColor="color1" variant="solid">Pagar</Button>
                  </Box>
                </Box>

{/*Resumen contratos*/}
{perfil && perfil.contratosDetalle && perfil.contratosDetalle.map((contrato, id) => (
                  <Box margin="1vh 0" key={id}>
                    <Collapse startingHeight={135} isOpen={contrato.show}>
                      <Box height="135px" backgroundColor="color1" color="color4" display="flex" width="50vw" justifyContent="space-between" alignItems="center" padding="15px"> 
                        <Box>
                          <Heading size="md" fontWeight="100" width="20vw">Contrato</Heading>
                          <Heading size="lg" fontWeight="100" width="20vw">{contrato.NoContrato[0]}</Heading>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Box>
                            {perfil && perfil.resumen && <Heading>$ {contrato.SaldoAlCorte}</Heading>}
                            <p>Saldo total al corte</p>
                            {perfil && perfil.resumen &&<small>Última fecha de corte {contrato.FechaCorte.substring(0,10)}</small>}
                          </Box>
                          <Button size="md" onClick={() => go('/clientes',id)} leftIcon={MdAttachMoney} backgroundColor="color3" variant="solid">Pagar</Button>
                        </Box>
                      </Box>
                      <Box height="135px" display="flex"  flexDirection="column" width="50vw" padding="15px" color="color1" backgroundColor="color2">
                        <Box display="flex" flexWrap="wrap" justifyContent="space-around" alignItems="center">
                          <Box width="15%">
                            <Text fontSize="sm" fontWeight="bold">Saldo insoluto</Text>
                            <br/>
                            <Text fontSize="sm" >${contrato.SaldoInsoluto}</Text>
                          </Box>
                          <Box width="15%">
                            <Text fontSize="sm" fontWeight="bold">Saldo vencido</Text>
                            <br/>
                            <Text fontSize="sm" >${contrato.TotalAPagar}</Text>
                          </Box>
                          <Box width="15%">
                            <Text fontSize="sm" fontWeight="bold">Prox. vencimiento</Text>
                            <br/>
                            <Text fontSize="sm" >${contrato.MontoProxVenc}</Text>
                          </Box>
                          <Box width="15%">
                            <Text fontSize="sm" fontWeight="bold">Fecha de pago</Text>
                            <br/>
                            <Text fontSize="sm" >{contrato.FechaProxVenc}</Text>
                          </Box>
                          <Link onClick={() => go('/detalleContrato',id)}>
                            Detalle de movimientos <Icon name="search-2"/>
                          </Link>
                        </Box>
                      </Box>

                    </Collapse>
                    {contrato.show ? <Box height="14px" backgroundColor="color2" width="50vw"><IconButton height="14px" size="sm" onClick={()=>handleToggle(id)} aria-label="Search database" icon="chevron-up" /></Box> : <Box height="14px" backgroundColor="color1" width="50vw"><IconButton height="14px" size="sm" onClick={()=>handleToggle(id)} aria-label="Search database" icon="chevron-down"  backgroundColor="color1"/></Box>}
                  </Box>
                ))}

              </Flex>
            );
          }}
        </MyContext.Consumer>
      )
}


