import React, {
  createContext,
  Component
} from 'react'
import {
  withRouter
} from 'react-router-dom'
import SERVICE from './services/index'


export const MyContext = createContext()

class MyProvider extends Component {
  state = {
    formSignup: {
      Nombre: '',
      Paterno: '',
      Materno: '',
      FechaNacimiento: '',
      Email:'',
      EmailConfirm: '',
      Password: '',
      PasswordConfirm:'',
      NoCliente:''
    },
    formLogin: {
      Email: '',
      Password: ''
    },
    loggedUser: null,
    isLogged: false,
    perfil:null,
    indxContrato:null,
    isAdmin:false,
    edoCuenta:{
      contrato:'',
      fecha:'',
      show:false
    },
    fechasEdoCuenta:[]
  }

  handleInput = (e, obj) => {
    const {
      name,
      value
    } = e.target
    let Obj = this.state[obj]
    Obj[name] = value
    this.setState({
      Obj
    })
  }
  handleChange=(name,value,obj)=> {
    let Obj = this.state[obj]
    Obj[name] = value
    this.setState({
      Obj
    })
  }

  async componentDidMount() {
    /*const data = await SERVICE.feedAll()
    this.setState({
      feed: true,
      allUsers: data.users,
      allContracts: data.contracts,
      allClients: data.clients
    })
    */
  }

  
  showContrato = (id)=>{
    const nuevoPerfil=this.state.perfil
    nuevoPerfil.contratosDetalle[id].show=!this.state.perfil.contratosDetalle[id].show
    this.setState({perfil:nuevoPerfil})
  }
  setContratoDetalle=async (indx)=>{
    await this.setState({indxContrato:indx})
  }
  getFechasEdoCuenta=async (contrato)=>{
    let fechas=[]
    for (let fecha in this.state.perfil.edoCuenta[contrato]) {
      fechas.push(fecha)
    }
    await this.setState({fechasEdoCuenta:fechas})
  }

  handleLogout = async () => {
    await SERVICE.logOut()
    this.props.history.push('/')
    this.setState({
      loggedUser: null,
      isLogged: false,
      isAdmin:false
    })
  }
 handleSignupSubmit = async e => {
    e.preventDefault()
    const form = this.state.formSignup
    this.setState({
      formSignup: {
        Nombre: '',
        Paterno: '',
        Materno: '',
        FechaNacimiento: '',
        Email:'',
        EmailConfirm: '',
        Password: '',
        PasswordConfirm:'',
        NoCliente:''

      },
      nuevo:false
    })
    return await SERVICE.signup(form)
      .then(({
        data
      }) => {
          return {
          user: data.cliente,
          msg: data.msg
        }
      })
      .catch((
        err
      ) => {
        return {
          user: null,
          msg: err.response.data.msg
        }
      })
  }

  handleLoginSubmit = e => {
    e.preventDefault()
    const form = this.state.formLogin
    return SERVICE.login(form)
      .then(async ({
        data
      }) => {
        if (data.cliente) {
          this.setState({
            loggedUser: data.cliente,
            isLogged: true
          })
          if (data.cliente.IdPerfil===1) {this.setState({isAdmin:true})}
          const {data:userData}= await SERVICE.profile(data.cliente.IdCliente)
          this.setState({perfil:userData,feed:true})
          return {
            user: data.cliente,
            msg: 'Login realizado.'
          }
        }
        else {
        return {
          user: null,
          msg: 'Usuario inactivo.'
        }}
      })
      .catch(err => {
        this.setState({
          loggedUser: null,
          isLogged: false,
          formLogin: {
            Email: '',
            Password: ''
          }
        })
        return {
          user: null,
          msg: 'Email/contraseña inválidos.'
        }
      })
      .finally(() => this.setState({
        formLogin: {
          Email: '',
          Password: ''
        }
      }))
  }


  

  render() {
    const {
      state,
      handleInput,
      handleSignupSubmit,
      handleLoginSubmit,
      handleLogout,
      handleChange,
      showContrato,
      setContratoDetalle,
      getFechasEdoCuenta
    } = this
    return ( <MyContext.Provider value = {
      {
        state,
        handleInput,
        handleSignupSubmit,
        handleLoginSubmit,
        handleLogout,
        handleChange,
        showContrato,
        setContratoDetalle,
        getFechasEdoCuenta
      }
    } > {
      this.props.children
    } </MyContext.Provider>)
  }
}

export default withRouter(MyProvider)