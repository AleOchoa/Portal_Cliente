import React, {useContext,useEffect} from 'react';
import {Flex, Text, SimpleGrid,Divider,Box,Select } from "@chakra-ui/core";
import {MyContext} from '../../context'
import { FaUser} from 'react-icons/fa';

export default function DetalleContrato({history}) {  
    const context = useContext(MyContext)
    const {perfil}= context.state
    useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
    })
    const handleInput=async(e)=>{
      await context.setContratoDetalle(e.target.value)
    }
    let contrato=null
    if (context.state.perfil) {contrato=context.state.perfil.contratosDetalle[context.state.indxContrato]}

    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex width="50vw" color="color1" wrap="wrap" flexDirection="column" alignContent="center">
                {perfil && contrato.NoContrato && <>
                    <Divider borderColor="color3" />
                    <Box display="flex" justifyContent="space-between">
                      <Text><Box as={FaUser} color="color3" /> {perfil.cliente.NombreCliente}</Text>
                      <Text color="color3">{perfil.cliente.NoCliente}</Text>
                    </Box>
                    <Divider borderColor="color3" />
                    <br/>
                    <Box>
                      <label htmlFor="contratos">No. Contrato</label>
                      <Select id="contratos" value={context.state.indxContrato} name="contrato" className="select"  onChange={(e)=>handleInput(e)} >
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
                      <Text>Fecha: <Text color="color3">{contrato.FechaCorte} </Text></Text>
                    </Box>
                    <br/>
                    <Box display="flex" justifyContent="space-between">
                        <Box width="50%">
                          <Text><Text fontWeight="bold">Fecha de apertura</Text> : {contrato.Fechaapertura} </Text>
                          <Text><Text fontWeight="bold">Fecha de término</Text> : {contrato.FechaTermino} </Text>
                          <Text><Text fontWeight="bold">Monto del crédito</Text> : {contrato.MontoFinanciado} </Text>
                          <Text><Text fontWeight="bold">Tasa interés anual</Text> : {contrato.Tasa[0]} % </Text>
                          <Text><Text fontWeight="bold">Fecha último corte</Text> : {contrato.FechaCorte} </Text>
                        </Box>
                        <Box width="50%">
                          <Text><Text fontWeight="bold">Saldo insoluto</Text> : {contrato.SaldoInsoluto} </Text>
                          <Text><Text fontWeight="bold">Saldo a favor</Text> : Falta campo </Text>
                          <Text><Text fontWeight="bold">Saldo Total</Text> : {contrato.TotalAPagar} </Text>
                          <Text><Text fontWeight="bold">Saldo vencido</Text> : {contrato.SaldoAlCorte} </Text>
                          <Text><Text fontWeight="bold">Intereses a la fecha</Text> : {contrato.InteresesXPagar} </Text>
                        </Box>
                    </Box>
                    <Divider borderColor="color1" />
                    <SimpleGrid columns={5} spacing={10}>
                        <Text>Fecha</Text>
                        <Text gridColumnGap={2/5}>Descripción</Text>
                        <Text>Cargo</Text>
                    </SimpleGrid>
                    <Divider borderColor="color1" />
                        {/*contrato.DetalleMovimientos && 
                        contrato.DetalleMovimientos.map((movimiento,indx)=>{
                          <SimpleGrid key={indx} columns={5} spacing={10}>
                            <Text>{movimiento.MvFechaValor}</Text>
                            <Text gridColumn={2/4}>{movimiento.MvDescripcion}</Text>
                            <Text>{movimiento.MvImporteCargo}</Text>
                          </SimpleGrid>
                        }

                        )}*/}
                    <Divider borderColor="color1" />
                    <Text justifySelf="flex-end" fontWeight="bold">Total {contrato.SaldoAlCorte}</Text>

                </>}
              </Flex>
            );
          }}
        </MyContext.Consumer>
      )
}