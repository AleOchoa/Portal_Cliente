import React, {useContext,useEffect} from 'react';
import {Flex, Text, SimpleGrid,Divider,Box,Select,List,ListItem, Link } from "@chakra-ui/core";
import {MyContext} from '../../context'
import { FaUser,FaRegFilePdf,FaRegFileExcel} from 'react-icons/fa';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../mesa/PdfDocument";
import { CSVLink } from 'react-csv'

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
    let infoExcel=[]
    if (context.state.perfil) {
      contrato=context.state.perfil.contratosDetalle[context.state.indxContrato]
      contrato.DetalleMovimientos.forEach(registro=>{
      infoExcel.push({Fecha:registro.MvFechavalor,Descripcion:registro.MvDescripcion,Importe:registro.MvTotalMovimiento})
      })
    }
    
    const go = path => history.push(path)
    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex  minWidth="400px" justifySelf="center" width="50vw" color="color1" wrap="wrap" flexDirection="column" alignContent="center">
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
                        <label htmlFor="contratos">No. Contrato  </label>
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
                    <SimpleGrid columns={2} >
                          <Box display="flex" padding="0 20px 0 0px" textAlign="left" justifyContent="space-between" ><Text as="span" fontWeight="bold">Fecha de apertura:</Text>  {contrato.FechaApertura} </Box>
                          <Box display="flex" padding="0 0px 0 20px" textAlign="left" justifyContent="space-between"><Text as="span" fontWeight="bold">Saldo insoluto:</Text>  {contrato.SaldoInsoluto} </Box>
                          <Box display="flex" padding="0 20px 0 0px" textAlign="left" justifyContent="space-between" ><Text as="span" fontWeight="bold">Fecha de término:</Text>  {contrato.FechaTermino} </Box>
                          <Box display="flex" padding="0 0px 0 20px" textAlign="left" justifyContent="space-between"><Text as="span" fontWeight="bold">Saldo a favor:</Text>  {contrato.SaldoAFavor} </Box>
                          <Box display="flex" padding="0 20px 0 0px" textAlign="left" justifyContent="space-between" ><Text as="span" fontWeight="bold">Monto del crédito:</Text>  {contrato.MontoFinanciado} </Box>
                          <Box display="flex" padding="0 0px 0 20px" textAlign="left" justifyContent="space-between"><Text as="span" fontWeight="bold">Saldo vencido:</Text>  {contrato.SaldoVencido} </Box>
                          <Box display="flex" padding="0 20px 0 0px" textAlign="left" justifyContent="space-between" ><Text as="span" fontWeight="bold">Tasa interés anual:</Text>  {contrato.Tasa[0]} % </Box>
                          <Box display="flex" padding="0 0px 0 20px" textAlign="left" justifyContent="space-between"><Text as="span" fontWeight="bold">Intereses a la fecha:</Text>  {contrato.InteresesXPagar} </Box>
                          <Box display="flex" padding="0 20px 0 0px" textAlign="left" justifyContent="space-between" ><Text as="span" fontWeight="bold">Fecha último corte:</Text>  {contrato.FechaCorte} </Box>
                          <Box display="flex" padding="0 0px 0 20px" textAlign="left" justifyContent="space-between"><Text as="span" fontWeight="bold">Saldo total:</Text>  {contrato.SaldoAlCorte} </Box>
                      </SimpleGrid> 
{/* Descarga info */}
                    <Box color='color3' height="auto" display='flex' justifyContent='flex-end'>
{/*descarga pdf*/}
                      <PDFDownloadLink
                          document={<PdfDocument data={{...perfil.edoCuenta[contrato.NoContrato[0]][contrato.FechaCorte.substring(3,11)],...perfil.cliente}} />}
                          fileName={`EdoCuenta${contrato.NoContrato[0]}${contrato.FechaCorte.substring(3,11)}.pdf`}
                        >
                          <Box width='30px' height="auto" as={FaRegFilePdf} />
                      </PDFDownloadLink>
{/*Descarga excel */}
                      <CSVLink data={infoExcel} filename={`DetalleMovimientos${contrato.NoContrato[0]}${contrato.FechaCorte.substring(3,11)}.csv`}>
                          <Box width='30px' height="auto" as={FaRegFileExcel} />
                      </CSVLink>
                    </Box>
{/*Tabla con detalle movimientos */}
                    <List>
                      <ListItem>
                        <Divider borderColor="color1"  borderWidth="2px"/>
                        <SimpleGrid color="color3" columns={6} spacing={10}>
                            <Text gridColumn="1/3">Fecha</Text>
                            <Text gridColumn="3/6">Descripción</Text>
                            <Text>Importe</Text>
                        </SimpleGrid>
                        <Divider borderColor="color1" borderWidth="2px" />
                      </ListItem>
                        {contrato && contrato.DetalleMovimientos && 
                        contrato.DetalleMovimientos.map((movimiento,indx)=>{
                          return (
                            <ListItem key={indx}>
                            <SimpleGrid columns={6} spacing={10}>
                              <Text gridColumn="1/3">{movimiento.MvFechavalor}</Text>
                              <Text gridColumn="3/6">{movimiento.MvDescripcion}</Text>
                              <Text>{movimiento.MvTotalMovimiento}</Text>
                            </SimpleGrid>
                          </ListItem> 
                          );
                        }
                        )}
                    </List>
                    <Divider borderColor="color1" borderWidth="2px" />
                    <Text marginLeft="auto" fontWeight="bold">Total {contrato.Total}</Text>

                </>}
                <Link marginLeft="auto" color="color3" onClick={() => go('/contratos')}>Regresar</Link>
              </Flex>
            );
          }}
        </MyContext.Consumer>
      )
}