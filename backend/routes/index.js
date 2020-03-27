const router = require('express').Router();
const sql= require('mssql')

router.get('/', (req, res) => {
  const request = new sql.Request();
  request.query('select * from Clientes a left outer join Contrato b on a.IdCliente=b.IdCliente', function (err, recordset) {
            
    if (err) console.log(err)

    // send records as a response
    console.log(recordset)
    res.status(200).json(recordset);
    
  });
//  res.status(200).json({ msg: 'Working' });
})
.get('/:iduser',async (req,res)=>{
  const {iduser}=req.params
  const request=new sql.Request();
  let data=await request.query(`select * from Clientes where idcliente=${iduser}`)
  const client=data.recordsets[0][0]
  data=await request.query(`select * from Contrato where idcliente=${iduser}`)
  let contratos=[]
  let contratosDetalle={}
  data.recordsets[0].forEach(contrato=>{
    contratos.push(contrato.NoContrato)
    contratosDetalle[contrato.NoContrato]=contrato
  })
  res.status(200).json({client,contratos,contratosDetalle})

})

module.exports = router;
