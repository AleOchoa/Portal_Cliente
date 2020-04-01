import React, {useContext} from 'react';
import {MyContext} from '../context'
import {Box,Heading,Button,Stack,InputGroup,InputLeftAddon,Input,useToast} from "@chakra-ui/core";


export default function Signup({ history }) {
    const toast = useToast()
    const context = useContext(MyContext)
  
    const submit = async (e) => {
      const { user, msg } = await context.handleSignupSubmit(e)
      if (user) {
          history.push('/contratos')
      } else {

        toast({
          title: 'Revisa tus credenciales.', description: msg, status: 'error', duration: 5000, isClosable: true
        })
      }
    }
    
    return (
      <MyContext.Consumer>
        {context => {
          return (
            <>   
            
              <Box as="form" onSubmit={submit} marginTop="5vh" display="flex" h="10%" justifyContent="space-around" w="" p={4} color="white">
                <Stack width="50%" minWidth="100px" >
                  <Heading as="h2" color="teal.700">Captura de datos personales</Heading>
                  <InputGroup>
                    <InputLeftAddon w='31vh' backgroundColor="teal.100" children='Nombre' color="teal.700"/>
                    <Input name="Nombre" value={context.state.formSignup.Nombre} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" roundedLeft="0" isRequired/>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon w='31vh' backgroundColor="teal.100" children='Apellido paterno' color="teal.700"/>
                    <Input name="Paterno" value={context.state.formSignup.Paterno} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" roundedLeft="0" isRequired/>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon w='31vh' backgroundColor="teal.100" children='Apellido materno' color="teal.700"/>
                    <Input name="Materno" value={context.state.formSignup.Materno} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" roundedLeft="0" isRequired/>
                  </InputGroup>
                  <InputGroup>
                  <InputLeftAddon w='31vh' backgroundColor="teal.100" children="Numero de cliente" color="teal.700" />
                  <Input name="NoCliente" value={context.state.formSignup.NoCliente} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" roundedLeft="0" isRequired/>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon w='31vh' backgroundColor="teal.100" children='Fecha de nacimiento' color="teal.700"/>
                    <Input name="FechaNacimiento" value={context.state.formSignup.FechaNacimiento} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="date" roundedLeft="0" isRequired/>
                  </InputGroup>
                  <InputGroup>
                  <InputLeftAddon w='31vh' backgroundColor="teal.100" children="Correo electronico" color="teal.700" />
                  <Input name="Email" value={context.state.formSignup.Email} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="email" roundedLeft="0" placeholder="correo@emisha.com.mx" isRequired/>
                  </InputGroup>
                  <InputGroup>
                  <InputLeftAddon w='31vh' backgroundColor="teal.100" children="Confirmar Correo electronico" color="teal.700" />
                  <Input name="EmailConfirm" value={context.state.formSignup.EmailConfirm} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="email" roundedLeft="0" placeholder="correo@emisha.com.mx" isRequired/>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon w='31vh' backgroundColor="teal.100" children="Contraseña" color="teal.700" />
                    <Input name="Password" value={context.state.formSignup.Password} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="password" rounded="0" placeholder="********" isRequired/>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon w='31vh' backgroundColor="teal.100" children="Confirmar contraseña" color="teal.700" />
                    <Input name="PasswordConfirm" value={context.state.formSignup.PasswordConfirm} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="password" rounded="0" placeholder="********" isRequired/>
                  </InputGroup>
                  <br />
                  <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                    Crear cuenta
                  </Button>
                </Stack>
              </Box>
            </>
          );
        }}
      </MyContext.Consumer>
    )
  }