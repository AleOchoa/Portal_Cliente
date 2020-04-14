import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  IconButton
} from '@chakra-ui/core'
import { MyContext } from '../context'
import { TiThMenu } from "react-icons/ti";

function Navbar({ history }) {
  const go = path => history.push(path)
  return (
    <MyContext.Consumer>
      {context => {
        return (
          <Flex
            pos="fixed"
            top={0}
            zIndex="99"
            w="100vw"
            height="10vh"
            p={8}
            align="center"
            justify="space-between"
            backgroundColor="color3"
          >
            <Image height="9vh"  src="/logo_blanco.webp" />
            {context.state.isLogged && (
            <Menu autoSelect={false} >
              <MenuButton
                as={IconButton}
                variant="outline"
                color="color4"
                aria-label="Menu"
                size="lg"
                icon={TiThMenu}
                border="none"
              ></MenuButton>
              <MenuList>
                {context.state.isAdmin && (
                  <>
                    <MenuItem onClick={() => go('/usuarios')}>Usuarios</MenuItem>            
                    <MenuItem onClick={context.handleLogout}>Logout</MenuItem>
                  </>
                )}
                {!context.state.isAdmin && (
                  <>
                    <MenuItem onClick={() => go('/contratos')}>Mi cuenta</MenuItem>
                    <MenuItem onClick={() => go('/detalleContrato')}>Detalle Contratos</MenuItem>
                    <MenuItem onClick={() => go('/estadoCuenta')}>Estados de cuenta</MenuItem>
                    <MenuItem onClick={() => go('/estadoCuenta')}>Pago en línea</MenuItem>
                    <MenuItem onClick={() => go('/estadoCuenta')}>Consulta de factura</MenuItem>
                    <MenuItem onClick={() => go('/estadoCuenta')}>Cambio de contraseña</MenuItem>
                    <MenuItem onClick={() => go('/estadoCuenta')}>Atención a cliente</MenuItem>
                    <MenuItem onClick={context.handleLogout}>Cerrar sesión</MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>)}
          </Flex>
        )
      }}
    </MyContext.Consumer>
  )
}

export default withRouter(Navbar)
