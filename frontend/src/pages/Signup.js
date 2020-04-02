import React, {useContext} from 'react';
import {MyContext} from '../context'
import {Heading,Button,Stack,FormControl,Input,useToast, 
  FormLabel } from "@chakra-ui/core";


export default function Signup({ history }) {
    const toast = useToast()
    const context = useContext(MyContext)
  
    const submit = async (e) => {
      const {user, msg } = await context.handleSignupSubmit(e)
      if (user) {
          toast({
          position:"top",
          title: "Cliente creado",
          description: msg,
          status: "success",
          duration: 4000,
          isClosable: true,
        })
        
          history.push('/')
      } else {

        toast({
          title: 'Usuario no creado.', description: msg, status: 'error', duration: 5000, isClosable: true
        })
      }
    }
    
    return (
      <MyContext.Consumer>
        {context => {
          return (
            <>   
            
            
            <FormControl isRequired as="form" onSubmit={submit} marginTop="10vh" display="flex" h="60%" justifyContent="center" w="100%" p={4} color="red">
              <Stack width="40%" minWidth="300px">
                  <Heading as="h2" color="teal.700">Captura de datos personales</Heading>
                 
                 <FormLabel htmlFor="fname">Nombre</FormLabel>
                <Input id="fname" name="Nombre" value={context.state.formSignup.Nombre} onChange={(e) => context.handleInput(e, 'formSignup')} type="text" roundedLeft="0" isRequired />
                <FormLabel htmlFor="fname">Apellido paterno</FormLabel>
                <Input name="Paterno" value={context.state.formSignup.Paterno} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" roundedLeft="0" isRequired/>
                <FormLabel htmlFor="fname">Apellido materno</FormLabel>
                <Input name="Materno" value={context.state.formSignup.Materno} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" roundedLeft="0" isRequired/>
                <FormLabel htmlFor="fname">Numero de cliente</FormLabel>
                <Input name="NoCliente" value={context.state.formSignup.NoCliente} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" roundedLeft="0" isRequired/>
                <FormLabel htmlFor="fname">Fecha de nacimiento</FormLabel>
                <Input name="FechaNacimiento" value={context.state.formSignup.FechaNacimiento} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="date" roundedLeft="0" isRequired/>
                <FormLabel htmlFor="fname">Correo electronico</FormLabel>
                <Input name="Email" value={context.state.formSignup.Email} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="email" roundedLeft="0" placeholder="correo@emisha.com.mx" isRequired/>
                <FormLabel htmlFor="fname">Confirmar correo</FormLabel>
                <Input name="EmailConfirm" value={context.state.formSignup.EmailConfirm} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="email" roundedLeft="0" placeholder="correo@emisha.com.mx" isRequired/>
                <FormLabel htmlFor="fname">Contraseña</FormLabel>
                <Input name="Password" value={context.state.formSignup.Password} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="password" rounded="0" placeholder="********" isRequired/>
                <FormLabel htmlFor="fname" justifySelf="left">Confirmar contraseña</FormLabel>
                <Input name="PasswordConfirm" value={context.state.formSignup.PasswordConfirm} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="password" rounded="0" placeholder="********" isRequired/>
       

                <br />
                  <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                    Crear cuenta
                  </Button>
                </Stack>
              </FormControl>
            </>
          );
        }}
      </MyContext.Consumer>
    )
  }