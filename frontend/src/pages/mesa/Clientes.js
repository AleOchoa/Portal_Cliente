import React, {useContext, useEffect} from 'react';
import {List,ListItem,Flex,Heading,useToast, SimpleGrid,Text } from "@chakra-ui/core";
import {MyContext} from '../../context'
//import {Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer";


export default function Clientes({history}) {  
    const context = useContext(MyContext)
    const toast = useToast()
    useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
    })
    const {feed,edita,nuevo}= context.state
    const submitClient = async (e) => {
        const {client,msg}= await context.createClient(e)     
        if (client) {
            toast({
                position:"top",
                title: "Cliente creado",
                description: msg,
                status: "success",
                duration: 4000,
                isClosable: true,
              })
        } else {
          toast({
            position:"top",
            title: 'Cliente no creado',
            description: msg,
            status: 'error',
            duration: 4000,
            isClosable: true
          })
        }
      }
    
    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex direction="column" alignItems="center" justifyContent="center">
                   
               <Heading as="h3" size="md" color="teal.700">Clientes</Heading>

              

                  <List>
                    <ListItem
                          color="teal.700"
                        >
                      <SimpleGrid columns={9}>
                        <Text >Nombre</Text>
                        <Text >Apellido Paterno</Text>
                        <Text >Apellido Materno</Text>
                        <Text >No. Cliente</Text>
                        <Text >RFC</Text>
                        <Text >CURP</Text>
                        <Text >Genero</Text>
                        <Text >Editar</Text>
                        <Text >Borrar</Text>
                      </SimpleGrid>
                    </ListItem>
                    {feed && context.state.allClients.map((client, id) => (
                        <ListItem
                          key={id}
                          color="teal.700"
                        >
                          <SimpleGrid columns={9}>
                            <Text >{client.nombre}</Text>
                            <Text >{client.apellidoPaterno}</Text>
                            <Text >{client.apellidoMaterno}</Text>
                            <Text >{client.numCliente}</Text>
                            <Text >{client.rfc}</Text>
                            <Text>{client.curp}</Text>
                            <Text >{client.genero}</Text>
                             </SimpleGrid>
                          </ListItem>

                      ))}
                  </List> 
              </Flex>
            );
          }}
        </MyContext.Consumer>
      )
}

/*export function PdfDocument(props) {
  const context = useContext(MyContext)
  console.log("pdf props", props.data);
  return (
      <Document>
          <Page style={styles.page}>
              {props.data ? props.data.map((index) => {
                          return (  <View key={index}>fff</View>
                            );
                          })
                      : ""}
            </Page>
        </Document>
    );
}*/



