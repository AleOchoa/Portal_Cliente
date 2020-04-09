import React, {useContext} from 'react';
import {Heading,Button,Stack,Input,useToast,
FormControl,FormLabel,Link } from "@chakra-ui/core";
import {MyContext} from '../context'

export default function Login({ history }) {
  const toast = useToast()
  const context = useContext(MyContext)

  const submit = async (e) => {
    const { user, msg } = await context.handleLoginSubmit(e)
    if (user) {
      history.push('/contratos')
    } else {
      toast({
        title: 'Revisa tus credenciales.',
        description: msg,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }
  const go = path => history.push(path)
  return (
    <MyContext.Consumer>
      {context => {
        return (
          <>
            <FormControl isRequired as="form" onSubmit={submit} marginTop="10vh" display="flex" h="60%" justifyContent="center" w="100%" p={4} color="white">
              <Stack width="40%" minWidth="300px" >
                <Heading as="h2" color="color5">Ingresa a tu cuenta</Heading>
                <FormLabel color="color5" htmlFor="Email">Correo electrónico </FormLabel>
                <Input name="Email" value={context.state.formLogin.email} onChange={(e) => context.handleInput(e, 'formLogin')} color="color5" type="email" roundedLeft="0" placeholder="email@emisha.com.mx" isRequired/>
                <FormLabel color="color5" htmlFor="Password">Contraseña</FormLabel>
                <Input name="Password" aria-describedby="email-helper-text" value={context.state.formLogin.password} onChange={(e) => context.handleInput(e, 'formLogin')} color="color5" type="password" rounded="0" placeholder="**********" isRequired/>
                <br />
                <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="color3" color="color6" size="md">
                  Iniciar sesión
                </Button>
              </Stack>
            </FormControl>
            <Link color="color5" onClick={()=>go('/crearCuenta')}>Crear Cuenta </Link>
          </>
        );
      }}
    </MyContext.Consumer>
  )
}


