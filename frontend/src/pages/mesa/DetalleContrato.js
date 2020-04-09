import React, {useContext,useEffect} from 'react';
import {Flex, Text, SimpleGrid,Divider,Box,Select,List, ListItem, Link } from "@chakra-ui/core";
import {MyContext} from '../../context'
import { FaUser} from 'react-icons/fa';

export default function DetalleContrato({history}) {  
    const context = useContext(MyContext)
    const {perfil}= context.state
    useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
      window.scrollTo(0, 0)
    })
    const handleInput=async(e)=>{
      await context.setContratoDetalle(e.target.value)
    }
    let contrato=null
    if (context.state.perfil) {contrato=context.state.perfil.contratosDetalle[context.state.indxContrato]}
    
    const go = path => history.push(path)

    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex width="50vw" color="color1" wrap="wrap" flexDirection="column" alignContent="center">
                {perfil && contrato.NoContrato && <>
                    <Divider borderColor="color3" borderWidth="2px"/>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <Box as={FaUser} color="color3" />
                        <Text>  {perfil.cliente.NombreCliente}</Text>
                      </Box>
                      <Text color="color3">{perfil.cliente.NoCliente}</Text>
                    </Box>
                    <Divider borderColor="color3" borderWidth="2px" />
                    <br/>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <label htmlFor="contratos">No. Contrato</label>
                        <Select textAlign="center" maxWidth="200px" id="contratos" value={context.state.indxContrato} name="contrato" className="select"  onChange={(e)=>handleInput(e)} >
                          <option value="" disabled >
                            Selecciona un contrato
                          </option>
                          {perfil.contratosDetalle.map((contrato, index) => {
                            return (
                              <option key={index} value={index}>
                                {contrato.NoContrato[0]}
                              </option>
                            );
                          })}
                        </Select>
                      </Box>
                      <Box>Fecha: <Text as="span" color="color3">{contrato.FechaCorte} </Text></Box>
                    </Box>
                    <br/>
                    <Box display="flex" textAlign="left" justifyContent="space-between">
                        <Box width="50%">
                          <Box><Text as="span" fontWeight="bold">Fecha de apertura</Text> : {contrato.FechaApertura} </Box>
                          <Box><Text as="span" fontWeight="bold">Fecha de término</Text> : {contrato.FechaTermino} </Box>
                          <Box><Text as="span" fontWeight="bold">Monto del crédito</Text> : {contrato.MontoFinanciado} </Box>
                          <Box><Text as="span" fontWeight="bold">Tasa interés anual</Text> : {contrato.Tasa[0]} % </Box>
                          <Box><Text as="span" fontWeight="bold">Fecha último corte</Text> : {contrato.FechaCorte} </Box>
                        </Box>
                        <Box width="50%">
                          <Box><Text as="span" fontWeight="bold">Saldo insoluto</Text> : {contrato.SaldoInsoluto} </Box>
                          <Box><Text as="span" fontWeight="bold">Saldo a favor</Text> : {contrato.SaldoAFavor} </Box>
                          <Box><Text as="span" fontWeight="bold">Saldo Total</Text> : {contrato.TotalAPagar} </Box>
                          <Box><Text as="span" fontWeight="bold">Saldo vencido</Text> : {contrato.SaldoVencido} </Box>
                          <Box><Text as="span" fontWeight="bold">Intereses a la fecha</Text> : {contrato.InteresesXPagar} </Box>
                        </Box>
                    </Box>
                    <List>
                      <ListItem>
                        <Divider borderColor="color1"  borderWidth="2px"/>
                        <SimpleGrid columns={5} spacing={10}>
                            <Text>Fecha</Text>
                            <Text gridColumn="2/4">Descripción</Text>
                            <Text>Cargo</Text>
                        </SimpleGrid>
                        <Divider borderColor="color1" borderWidth="2px" />
                      </ListItem>
                        {contrato && contrato.DetalleMovimientos && 
                        contrato.DetalleMovimientos.map((movimiento,indx)=>{
                          return (
                            <ListItem key={indx}>
                            <SimpleGrid columns={5} spacing={10}>
                              <Text>{movimiento.MvFechavalor}</Text>
                              <Text gridColumn="2/4">{movimiento.MvDescripcion}</Text>
                              <Text>{movimiento.MvTotalMovimiento}</Text>
                            </SimpleGrid>
                          </ListItem> 
                          );
                        }
                        )}
                    </List>
                    <Divider borderColor="color1" borderWidth="2px" />
                    <Text marginLeft="auto" fontWeight="bold">Total {contrato.SaldoAlCorte}</Text>

                </>}
                <Link marginLeft="auto" color="color3" onClick={() => go('/contratos')}>Regresar</Link>
              </Flex>
            );
          }}
        </MyContext.Consumer>
      )
}