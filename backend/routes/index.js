const router = require('express').Router();
const sql= require('mssql')

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
  
  
  const client=data.recordsets[0][0]
  let contratos=[]
  let contratosDetalle={}
  let edoCuenta={}
  data.recordsets[1].forEach(contrato=>{
    contratos.push(contrato.NoContrato[0])
    contratosDetalle[contrato.NoContrato]=contrato
    edoCuenta[contrato.NoContrato[0]]={}
  })
  data.recordsets[2].forEach(registro=>{
    edoCuenta[registro.NoContrato][registro.FechaCorte.toISOString().substring(0,10)]=registro
  })
  res.status(200).json({client,contratos,contratosDetalle,edoCuenta})
})

module.exports = router;
