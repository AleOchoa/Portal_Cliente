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
    edita:false,
    nuevo:false,
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
    isOpen: false,
    formUsuario: {
      id:"",
      name:"",
      email:"",
      rol:""
    },
    formContrato: {
      id:"",
      idcliente:"",
      monto:0,
      plazo:0,
      tasa:0,
      fechaInicio:"",
      diaPago:0,
      estatus:""
    },
    formCliente:{
      id:"",
      numCliente:"",
      nombre:"",
      apellidoPaterno:"",
      apellidoMaterno:"",
      rfc:"",
      fechaNacimiento:"",
      genero:"",
      curp:"",
      calle:"",
      ext:"",
      int:"",
      colonia:"",
      delegacion:"",
      ciudad:"",
      estado:"",
      cp:""
    },
    perfil:null,
    feed: false,
    isAdmin:false,
    contratoDetalle:null
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
  handleChange=(e,obj)=> {
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

  onClose = () => {
    this.setState({
      isOpen: false
    })
  }
  deleteUser = async (e, id) => {
    await SERVICE.deleteUser(id)
    const data = await SERVICE.feedUsers()
    this.setState({
      allUsers: data.users
    })
  }
  restorePassword = async (e, id) => {
    await SERVICE.restorePassword(id)
    const data = await SERVICE.feedUsers()
    this.setState({
      allUsers: data.users
    })
  }
  changeStatus = async (e, id) => {
    await SERVICE.changeStatus(id)
    const data = await SERVICE.feedUsers()
    this.setState({
      allUsers: data.users
    })
  }
  editUser = async (e, id) => {
    e.preventDefault()
    await SERVICE.editUser(id,this.state.formUsuario)
    const data = await SERVICE.feedUsers()
    const form= {
      id:"",
      name:"",
      email:"",
      rol:""
    }
    this.setState({
      formUsuario:form,
      edita: false,
      allUsers: data.users
    })
  }
  showEditUser = async(e,user) => {
    const form={
      id:user._id,
      name:user.name,
      email:user.email,
      rol:user.rol
    }
    this.setState({
      edita: true,
      formUsuario:form
    })
  }
  showNuevo = async(e) => {
    this.setState({
      nuevo: true
    })
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
  //NoCliente,Nombre,Paterno,Materno,FechaNacimiento,Email,EmailConfirm,Password,PasswordConfirm
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
          console.log("entra",data)
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
          this.setState({perfil:userData})
          console.log(this.state)
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


///Cliente
  createClient=async e =>{
    e.preventDefault()
    const form=this.state.formCliente
    this.setState({
      formCliente:{
        id:"",
        nombre:"",
        apellidoPaterno:"",
        apellidoMaterno:"",
        rfc:"",
        fechaNacimiento:"",
        numCliente:"",
        genero:"",
        curp:"",
        calle:"",
        ext:"",
        int:"",
        colonia:"",
        delegacion:"",
        ciudad:"",
        estado:"",
        cp:""
      },
      nuevo:false
    })
    return await SERVICE.createClient(form)
      .then(async (data)=>{
        const {clients}=await SERVICE.feedClients()
        this.setState({allClients: clients})
        return {
          client: data.cliente,
          msg: "Se ha agregado el cliente."
        }
      })
      .catch(({
        err
      }) => {
        return {
          client: null,
          msg: err
        }
      })
    }
    showEditClient= async(e,cliente) => {
      const form={
        id:cliente._id,
        nombre:cliente.nombre,
        apellidoPaterno:cliente.apellidoPaterno,
        apellidoMaterno:cliente.apellidoMaterno,
        rfc:cliente.rfc,
        numCliente:cliente.numCliente,
        genero:cliente.genero,
        curp:cliente.curp,
      }
      this.setState({
        edita: true,
        formCliente:form
      })
    }
    deleteClient = async (e, id) => {
      await SERVICE.deleteClient(id)
      const data = await SERVICE.feedClients()
      this.setState({
        allClients: data.clients
      })
    }
    editClient = async (e, id) => {
      e.preventDefault()
      await SERVICE.editClient(id,this.state.formCliente)
      const data = await SERVICE.feedClients()
      const form= {
        id:"",
        numCliente:"",
        nombre:"",
        apellidoPaterno:"",
        apellidoMaterno:"",
        rfc:"",
        fechaNacimiento:"",
        genero:"",
        curp:"",
        calle:"",
        ext:"",
        int:"",
        colonia:"",
        delegacion:"",
        ciudad:"",
        estado:"",
        cp:""
      }
      this.setState({
        formCliente:form,
        edita: false,
        allClients: data.clients
      })
    }

///Contrato
  createContract = async e=>{
    e.preventDefault()
    const form=this.state.formContrato
    this.setState({
      formContrato: {
        idcliente:"",
        monto:"",
        plazo:"",
        tasa:"",
        fechaInicio:"",
        diaPago:"",
        estatus:""
      },
      nuevo:false
    })
    return await SERVICE.createContract(form)
      .then(async (
        data
      ) => {
        const {
          contracts
        } = await SERVICE.feedContracts()
        this.setState({
          allContracts: contracts
        })
        const contrato=data.contrato.data.contrato
        return {
          contract: contrato,
          msg: "Se ha generado el contrato."
        }
      })
      .catch(({
        err
      }) => {
        return {
          contract: null,
          msg: "No se pudo crear el contrato."
        }
      })
  }
  showEditContract = async(e,contract) => {
    const form={
      id:contract._id,
      idcliente:"",
      monto:contract.monto,
      plazo:contract.plazo,
      tasa:contract.tasa,
      fechaInicio:"",
      diaPago:contract.diaPago,
      estatus:contract.estatus
    }
    this.setState({
      edita: true,
      formContrato:form
    })
  }
  editContract = async (e, id) => {
    e.preventDefault()
    await SERVICE.editContract(id,this.state.formContrato)
    const data = await SERVICE.feedContracts()
    const form= {
      id:"",
      idcliente:"",
      monto:"",
      plazo:"",
      tasa:"",
      cliente:"",
      fechaInicio:"",
      diaPago:"",
      estatus:""
    }
    this.setState({
      formContrato:form,
      edita: false,
      allContracts: data.contracts
    })
  }
  deleteContract = async (e, id) => {
    await SERVICE.deleteContract(id)
    const data = await SERVICE.feedContracts()
    this.setState({
      allContracts: data.contracts
    })
  }
  showDetailContract= (e,contract)=>{
    const fechaCorta=contract.fechaPrimerPago.substring(0,10)
    this.setState({contratoDetalle:{...contract,fechaPrimerPagoCorto:fechaCorta}})
    console.log(contract)

    this.props.history.push('/detalleContrato')
  }
  

  render() {
    const {
      state,
      handleInput,
      handleSignupSubmit,
      handleLoginSubmit,
      handleLogout,
      onClose,
      deleteUser,
      restorePassword,
      changeStatus,
      editUser,
      showEditUser,
      handleChange,
      showNuevo,
      createContract,
      showEditContract,
      deleteContract,
      editContract,
      showDetailContract,
      createClient,
      showEditClient,
      deleteClient,
      editClient
    } = this
    return ( <MyContext.Provider value = {
      {
        state,
        handleInput,
        handleSignupSubmit,
        handleLoginSubmit,
        handleLogout,
        onClose,
        deleteUser,
        restorePassword,
        changeStatus,
        editUser,
        showEditUser,
        handleChange,
        showNuevo,
        createContract,
        showEditContract,
        deleteContract,
        editContract,
        showDetailContract,
        createClient,
        showEditClient,
        deleteClient,
        editClient
      }
    } > {
      this.props.children
    } </MyContext.Provider>)
  }
}

export default withRouter(MyProvider)