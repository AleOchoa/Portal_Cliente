const router = require('express').Router();
const sql= require('mssql')

router.get('/', (req, res, next) => {
  const request = new sql.Request();
  request.query('select * from Empresa', function (err, recordset) {
            
    if (err) console.log(err)

    // send records as a response
    console.log(recordset)
    res.status(200).json(recordset);
    
  });
//  res.status(200).json({ msg: 'Working' });
});

module.exports = router;
