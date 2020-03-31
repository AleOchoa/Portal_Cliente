const router = require('express').Router();
const sql= require('mssql')
const bcrypt=require('bcrypt')

router.get('/', (req, res) => {
  const request = new sql.Request();
  request.query('select * from Empresa', function (err, recordset) {
            
    if (err){ console.log(err)}
    else {
    // send records as a response
    console.log(recordset)
    res.status(200).json(recordset);
    }
  });
//  res.status(200).json({ msg: 'Working' });
});
router.get('/perfil/:iduser',async (req,res)=>{
  const {iduser}=req.params
  const request=new sql.Request();
  const data=await request.query(`select * from Clientes where idcliente=${iduser};
                                SELECT * FROM Contrato C LEFT OUTER JOIN 
                                    (select A.* from SaldosEdoCuenta A inner join 
                                        (select IdContrato,Max(FechaCorte) FechaCorte From SaldosEdoCuenta group by IdContrato) B
                                        on A.IdContrato=B.IdContrato and A.FechaCorte=B.FechaCorte) S
                                      ON C.IdContrato=s.IdContrato
                                    WHERE C.IdCliente=${iduser};
                                    SELECT * FROM SaldosEdoCuenta WHERE IdContrato IN (SELECT IdContrato FROM Contrato WHERE IdCliente=${iduser})`
                                  ).catch(err=>console.log(err))
  
  
  const cliente=data.recordsets[0][0]
  let contratos=[]
  let contratosDetalle={}
  let edoCuenta={}
  data.recordsets[1].forEach(contrato=>{
    contratos.push(contrato.NoContrato[0])
    contratosDetalle[contrato.NoContrato[0]]=contrato
    edoCuenta[contrato.NoContrato[0]]={}
  })
  data.recordsets[2].forEach(registro=>{
    edoCuenta[registro.NoContrato][registro.FechaCorte.toISOString().substring(0,10)]=registro
  })
  res.status(200).json({cliente,contratos,contratosDetalle,edoCuenta})
})

router.post('/signup',async (req,res)=>{
  const {NoCliente,Nombre,Paterno,Materno,FechaNacimiento,Email,EmailConfirm,Password,PasswordConfirm}=req.body 
  const request=new sql.Request();
  //Se busca si hay un cliente con ese NoCliente, Nombre Completo y Fecha de Nacimiento
  const data = await request.input("NoCliente",sql.Int,NoCliente)
                  .input("NombreCompleto",sql.VarChar(200),Nombre+' '+Paterno+' '+Materno)
                  .input("Fecha",sql.DateTime,FechaNacimiento)
                  .query(`select * from Clientes where NoCliente= @NoCliente and NombreCliente=@NombreCompleto and FechaNacimiento=@Fecha`)
                  .catch(err=>res.status(500).json({msg:'No se pudo agregar el usuario'})) 
  //Si hay un cliente con esas características procedemos a crearlo
  if (data.recordset[0]) {
    //revisamos que no exista un usuario para ese cliente
    const verifyUser= await request.input("IdCliente",sql.Int,data.recordset[0].IdCliente)
                  .query('select * from Usuarios where IdCliente=@IdCliente').catch(err=>console.log(err))
    if(verifyUser.rowsAffected[0]>0){
      res.status(401).json({msg:"Usuario no generado. El cliente ya tiene una cuenta."})
    }
    else {
      //Confirmamos que los emails sean iguales
      if (Email===EmailConfirm) {
        //Confirmamos que los passwords sean los mismos
        if (Password===PasswordConfirm) {
          //Hacemos el hash del password
          const salt=await bcrypt.genSalt(Number(process.env.SALT))
          const hashPassword=await bcrypt.hash(Password,salt)
          //Procedemos a crear el usuario en bd
          const newData = await request.input("email",sql.VarChar(100),Email)
                    .input('password',sql.VarChar(sql.MAX),hashPassword)
                    .input("IdPerfil",sql.Int,data.recordset[0].IdPerfil)
                    .input("FechaDefault",sql.DateTime,'1900-01-01')
                    .query(`insert into Usuarios (IdCliente,Email,Password,Bloqueo,
          FecCambioPassword,PrimerAcceso,FecUltimoAcceso,IdPerfil
          ) values (@IdCliente,@email,@password,0,@FechaDefault,1,@FechaDefault,@IdPerfil)`).catch(err=>console.log(err))
          
          if(newData.rowsAffected[0]==1) {
            const newUser= await request.query('select * from Usuarios where IdCliente=@IdCliente').catch(err=>console.log(err))
            await request.input("IdUsuario",sql.Int,newUser.recordset[0].IdUsuario)
                          .query(`update Clientes set Email=@email, 
                                    IdUsuario=@IdUsuario
                                  where Idcliente=@IdCliente`).catch(err=>console.log(err))
            data.recordset[0].Email=newUser.recordset[0].Email
            data.recordset[0].IdUsuario=newUser.recordset[0].IdUsuario
            
            res.status(200).json({user:data.recordset[0]})
          }
          else{
            res.status(500).json({msg:"Algo salió mal"})
          }
        }
        else {
          res.status(400).json({msg:'Los passwords no coinciden'})
        }  
      }
      else {
        res.status(400).json({msg:'Los email no coinciden'})
      }
    }
  }
  else {
    res.status(400).json({msg:'No existe el cliente'})
  }
  
})

module.exports = router;
