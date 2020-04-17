import React from 'react';

import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
      body:{
       padding:'20',
      },
      container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        fontSize:'11',
        paddingTop:'15'
      },
      leftColumn: {
        
        flexDirection: 'column',
        width: '50%',
      },
      rightColumn: {
        display:'flex',
        flexDirection: 'column',
        width:'45%',
        
      },
      contenedorDos:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        textAlign:'center',
        marginTop: '5'
      },
      contenedorNaranja:{
        backgroundColor: '#FF6F00',
        color: '#fff',
        padding:'10px',
        width:'50%',
        borderRadius:'10',
        borderStyle: "solid", 
        borderColor: '#FF6F00',
        borderWidth: 3,
      },
      contenedorBorde:{
        borderColor: '#FF6F00',
        borderStyle: "solid", 
        borderWidth: 3,
        padding:'10px',
        width:'45%',
        borderRadius:'10',
    },
    imagen:{
        width: '60',
        height: '100',

    },
    contenedorNaranja1:{
        backgroundColor: '#FF6F00',
        color: '#fff',
        padding:'10px',
        width:'100%',
        borderRadius:'10',
        borderStyle: "solid", 
          borderColor: '#FF6F00',
          borderWidth: 3,
        },
      
      
      leftColumn1: {
        flexDirection: 'column',
        width: '50%',
        borderColor: '#FF6F00',
        borderStyle: "solid", 
        borderWidth: 3,
        padding:'10px',
      },
      rightColumn1: {
        display:'flex',
        flexDirection: 'column',
        width:'45%',
        borderColor: '#FF6F00',
        borderStyle: "solid", 
        borderWidth: 3,
        padding:'10px',
      },
      contenedorNaranjaT:{
        backgroundColor: '#FF6F00',
        color: '#fff',
        padding:'5px',
        width:'100%',
        borderRadius:'10',
        borderStyle: "solid", 
          borderColor: '#FF6F00',
          borderWidth: 3,
        textAlign:'center',
        },
      
          table: {
          display: 'table',
          width: "auto",
          margin: 10,
          borderWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderColor:  '#FF6F00',
          flexDirection: 'column',
          //flexShrink: 1
      },
        tableRow: {
          width: '100%',
          border: 1,
          borderColor:  '#FF6F00',
          // alignItems: 'justify',
        margin: "auto",
        flexDirection: "row",
          // flexGrow: 1,
          // flexAlign: 'strech'
      },
    
      tableColHeader: {
        borderBottomColor: '#000',
        borderColor:  '#FF6F00',
        width:"50%",
        textAlign:'left'
      },
    
        tableCellHeader: {
        margin: 1,
        borderColor:  '#FF6F00',
        fontSize: 12,
        textAlign: 'left',
        borderRightWidth: 1,
         
      },
     
        Cuentas: {
        flexDirection: 'column',
        width: '100%',
        borderColor: '#FF6F00',
        borderStyle: "solid", 
        borderWidth: 3,
        padding:'10px',
      },
     //Tabla de cuentas 
      cuentatable: { 
        display: "table", 
       
          margin: '1%',
          borderWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
     
        //borderStyle: "solid", 
        //borderColor: '##FF6F00',
       
    
      }, 
      cuentatableRow: { 
        margin: "auto", 
        flexDirection: "row" ,
        //backgroundColor: 'red', 
        borderColor: '#FF6F00',
        borderWidth: 1, 
        //borderLeftWidth: 0, 
        //borderTopWidth: 0
        
      }, 
      cuentatableColHeader: { 
        width: "25%", 
        borderStyle: "solid", 
        backgroundColor: '#FF6F00',
        borderColor: '#FF6F00',
       
       // borderBottomColor: '#FF6F00',
        //borderWidth: 1, 
        //borderLeftWidth: 0, 
        //borderTopWidth: 0
      },   
      cuentatableCol: { 
        width: "25%", 
        borderStyle: "solid", 
        borderColor: '#FF6F00',
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      cuentatableCellHeader: {
        margin: "auto", 
       // margin: 10, 
        borderColor: '#FF6F00',
        color:'#fff',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 500
      },  
      cuentatableCell: { 
        margin: "auto", 
        //margin: 5, 
        borderColor: '##FF6F00',
        fontSize: 12 
      },
      
      //TABLA DETALLES AVISOS
       //Tabla de cuentas 
      detalletable: { 
        display: "table", 
            width: "98%",
        padding:'0',
          margin: '1%',
          borderWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
     
        //borderStyle: "solid", 
        //borderColor: '##FF6F00',
       
    
      }, 
      detalletableRow: { 
        margin: "auto", 
        flexDirection: "row" ,
        //backgroundColor: 'red', 
        borderColor: '#FF6F00',
        borderWidth: 1, 
        //borderLeftWidth: 0, 
        //borderTopWidth: 0
        
      }, 
      detalletableColHeader: { 
        width: "25%", 
        borderStyle: "solid", 
        backgroundColor: '#FF6F00',
        borderColor: '#FF6F00',
       
       // borderBottomColor: '#FF6F00',
        //borderWidth: 1, 
        //borderLeftWidth: 0, 
        //borderTopWidth: 0
      },   
      detalletableCol: { 
        width: "25%", 
        borderStyle: "solid", 
        borderColor: '#FF6F00',
        borderWidth: 0, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      detalletableCellHeader: {
        margin: "auto", 
        //margin: 8, 
        borderColor: '#FF6F00',
        color:'#fff',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 500
      },  
      detalletableCell: { 
        margin: "auto", 
        //margin: 5, 
        borderColor: '##FF6F00',
        fontSize: 12 
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
      contenedorTres:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        fontSize: 10,
      },
      contenedorNTres:{
        width:'75%',
      },
      contenedorBTres:{
        borderStyle: "solid", 
        textAlign:'right',
        width:'29%',
        borderRadius:'10',
    },


        
      

});

export function PdfDocument(props) {
    const contrato=props.data
    return (
        <>
            {contrato? 
                <Document>
            <Page pageNumber={1} size="A4" style={styles.body}>   
  <View  fixed>
  <View style={styles.container}>
     <View style={styles.leftColumn}>
     <Image style={styles.imagen} src="/logo.png"/>
         <Text> EDUPASS, SA DE CV SOFOMENR </Text>
         <Text> AV ANATOLE FRANCE 152A  </Text>
         <Text>COL POLANCO CP11550</Text>
         <Text>MEXICO CDMX</Text>
     </View>
     <View style={styles.rightColumn}>
         <View style={styles.contenedorDos}>
             <View style={styles.contenedorNaranja}>
                 <Text>IMPORTE A PAGAR</Text>
             </View>
             <View style={styles.contenedorBorde}> 
             <Text>{contrato.SaldoAlCorte}</Text>
             </View>
         </View>
         <View style={styles.contenedorDos}>
             <View style={styles.contenedorNaranja}>
                 <Text>FECHA DE PAGO</Text>
             </View>
             <View style={styles.contenedorBorde}> 
                 <Text>{contrato.FechaCorte}</Text>
             </View>
         </View>
         <View style={styles.contenedorDos}>
             <View style={styles.contenedorNaranja}>
                 <Text>NO DE CLIENTE</Text>
             </View>
             <View style={styles.contenedorBorde}> 
                 <Text>{contrato.NoCliente}</Text>
             </View>
           </View>
     </View>
  </View> 
  <View style={styles.container}>
    <View style={styles.leftColumn}>
        <View style={styles.contenedorDos}>
        <View style={styles.contenedorNaranja1}>
            <Text>DATOS DEL CLIENTE</Text>
        </View>     
        </View>     
        </View>
        <View style={styles.rightColumn}>
        <View style={styles.contenedorDos}>
        <View style={styles.contenedorNaranja1}>
            <Text>INFORMACIÓN DE LA CUENTA</Text>
        </View>
        </View>
    </View>
</View>      

<View style={styles.container}>
      <View style={styles.leftColumn1}>
        <View style={styles.contenedorTres}>
          <View style={styles.contenedorNTres}>
            <Text>{contrato.NombreCliente}{'\n'}{contrato.Calle}{"\n"}COL. {contrato.Colonia}  CP. {contrato.CodigoPostal}{"\n"} {contrato.Municipio} {contrato.Estado}{"\n"}{contrato.RFC} {"\n"}NO CLIENTE: {contrato.NoCliente}{"\n"}NO CONTRATO: {contrato.NoContrato}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.rightColumn1}>
          <View style={styles.contenedorTres}>
          <View style={styles.contenedorNTres}>
          <Text >MONTO FINANCIADO{"\n"}CAPITAL NO EXIGIBLE{"\n"}CAT SIN IVA (COSTO ANUAL TOTAL){"\n"}TASA DE INTERÉS ORDINARIA{"\n"}
           TASA DE INTERÉS MORATORIA{"\n"}INTERESES COBRADOS{"\n"}COMISIONES CARGADAS</Text>
            <Text>NO DE CLIENTE</Text>
          </View>
           <View style={styles.contenedorBTres}> 
           <Text>{contrato.MontoFinanciado}{"\n"}{contrato.SaldoInsoluto}{"\n"}{contrato.CAT}%{"\n"}{"\n"}{contrato.Tasa}{"\n"}{contrato.TasaMora}{"\n"}{contrato.InteresPeriodo}{"\n"}{contrato.ComisionesPeriodo}</Text>
          </View>
        </View>
        </View>
    </View>
   

    <View style={styles.container}>
      <View style={styles.contenedorNaranjaT}>
          <Text >RESUMEN DEL PRERIODO</Text>
          <Text>DEL 13 DE ENERO 2020 AL 13 DE ABRIL 2020</Text>
      </View>
    </View> 

    <View style={styles.table}wrap>
      <View style={styles.tableRow}>
      <View style={styles.tableColHeader}>			  		       
          <Text style={styles.tableCellHeader}>SALDO AL CORTE      {contrato.SaldoAlCorte}{'\n'}   SALDO AL CORTE ANTERIOR       {contrato.SaldoAlCorteAnterior}{'\n'}   + CARGOS DEL MES       {contrato.CargosDelPeriodo}{'\n'}   (-) PAGOS Y ABONOS       {contrato.PagosDelPeriodo}</Text>
          <Text style={styles.tableCellHeader}>PROXIMI VENCIMIENTO      {contrato.MontoProxVenc} {'\n'}</Text>
          <Text style={styles.tableCellHeader}>TOTAL  A PAGAR      {contrato.TotalAPagar}{'\n'}   CAPITAL       {contrato.CapitalPeriodo}{'\n'}   INTERES       {contrato.InteresPeriodo}{'\n'}   COMISIONES       {contrato.ComisionesPeriodo}{'\n'}   OTROS CARGOD       {contrato.OtrosCargosPeriodo}{'\n'}   IVA       {contrato.IVAPeriodo}</Text>
          
      </View>
      <View style={styles.tableColHeader}>			  		       
        <Image style={styles.imagen} src="/logo.png"/>
      </View>
      </View>      
    </View>

    <View style={styles.container}>
    <View style={styles.contenedorNaranjaT}>
        <Text>CUENTAS PARA PAGO</Text>
    </View>
    </View> 

    <View style={styles.container}>
        <View style={styles.Cuentas}>
        <View style={styles.cuentatable} wrap> 
        <View style={styles.cuentatableRow}> 
        <View style={styles.cuentatableColHeader}> 
            <Text style={styles.cuentatableCellHeader}>BANCO</Text> 
        </View> 
        <View style={styles.cuentatableColHeader}> 
            <Text style={styles.cuentatableCellHeader}>CONVENIO</Text> 
        </View>
        <View style={styles.cuentatableColHeader}> 
            <Text style={styles.cuentatableCellHeader}>TITULAR</Text> 
        </View>
        <View style={styles.cuentatableColHeader}> 
            <Text style={styles.cuentatableCellHeader}>REFERENCIA</Text> 
        </View>
        </View>
        <View style={styles.cuentatableRow}> 
        <View style={styles.cuentatableCol}> 
            <Text style={styles.cuentatableCell}>React-PDF</Text> 
        </View> 
        <View style={styles.cuentatableCol}> 
            <Text style={styles.cuentatableCell}>3</Text> 
        </View> 
        <View style={styles.cuentatableCol}>
            <Text style={styles.cuentatableCell}>2019-02-20 - 2020-02-19</Text> 
        </View>
        <View style={styles.cuentatableCol}> 
            <Text style={styles.cuentatableCell}>5€</Text> 
        </View> 
        </View> 
        <View style={styles.cuentatableRow}> 
        <View style={styles.cuentatableCol}> 
            <Text style={styles.cuentatableCell}>Another row</Text> 
        </View> 
        <View style={styles.cuentatableCol}> 
            <Text style={styles.cuentatableCell}>Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
            Quijote de la Mancha</Text> 
        </View> 
        <View style={styles.cuentatableCol}>
            <Text style={styles.cuentatableCell}>2019-05-20 - 2020-07-19</Text> 
        </View>
        <View style={styles.cuentatableCol}> 
            <Text style={styles.cuentatableCell}>25€</Text> 
        </View>  
        </View>        
        </View>     
        </View>
        </View>
    </View>
</Page>

<Page pageNumber={1} size="A4" style={styles.body}> 
    <View fixed>
        <View style={styles.container}>
            <View style={styles.contenedorNaranjaT}>
                <Text>DETALLE DE MOVIMIENTOS</Text>
                <Text>DEL 13 DE ENERO 2020 AL 13 DE ABRIL 2020</Text>
            </View>
            </View>
            <View style={styles.detalletable} wrap> 
            <View style={styles.detalletableRow}> 
            <View style={styles.detalletableColHeader}> 
                <Text style={styles.detalletableCellHeader}>FECHA</Text> 
            </View> 
            <View style={styles.detalletableColHeader}> 
                <Text style={styles.detalletableCellHeader}>DESCRIPCION</Text> 
            </View>
            <View style={styles.detalletableColHeader}> 
                <Text style={styles.detalletableCellHeader}>CARGO</Text> 
            </View>
            <View style={styles.detalletableColHeader}> 
                <Text style={styles.detalletableCellHeader}>ABONO</Text> 
            </View>
            </View>
            <View style={styles.detalletableRow}> 
            <View style={styles.detalletableCol}> 
                <Text style={styles.detalletableCell}>React-PDF</Text> 
            </View> 
            <View style={styles.detalletableCol}> 
                <Text style={styles.detalletableCell}>3</Text> 
            </View> 
            <View style={styles.detalletableCol}>
                <Text style={styles.detalletableCell}>2019-02-20 - 2020-02-19</Text> 
            </View>
            <View style={styles.detalletableCol}> 
                <Text style={styles.detalletableCell}>5€</Text> 
            </View> 
            </View> 
            </View>  

            <View style={styles.container}>
            <View style={styles.contenedorNaranjaT}>
                <Text>AVISO DE VENCIMIENTO</Text>
            </View>
            </View>
            <View style={styles.detalletable} wrap> 
            <View style={styles.detalletableRow}> 
            <View style={styles.detalletableColHeader}> 
                <Text style={styles.detalletableCellHeader}>FECHA</Text> 
            </View> 
            <View style={styles.detalletableColHeader}> 
                <Text style={styles.detalletableCellHeader}>DESCRIPCION</Text> 
            </View>
            <View style={styles.detalletableColHeader}> 
                <Text style={styles.detalletableCellHeader}>CARGO</Text> 
            </View>
            <View style={styles.detalletableColHeader}> 
                <Text style={styles.detalletableCellHeader}>ABONO</Text> 
            </View>
            </View>
            <View style={styles.detalletableRow}> 
            <View style={styles.detalletableCol}> 
                <Text style={styles.detalletableCell}>React-PDF</Text> 
            </View> 
            <View style={styles.detalletableCol}> 
                <Text style={styles.detalletableCell}>3</Text> 
            </View> 
            <View style={styles.detalletableCol}>
                <Text style={styles.detalletableCell}>2019-02-20 - 2020-02-19</Text> 
            </View>
            <View style={styles.detalletableCol}> 
                <Text style={styles.detalletableCell}>5€</Text> 
            </View> 
            </View> 
        </View>  

        <View style={styles.container}>
            <View style={styles.Cuentas}>
                <Text style={styles.detalletableCell}>LEYENDAS</Text>   
            </View>
            </View>
            <View>  
                <Text>IMPORTANTE</Text>  
            <View style={styles.container}>
            <View style={styles.Cuentas}>
                <Text style={styles.detalletableCell}>LEYENDAS 2</Text>   
            </View>
            </View>
        </View>


    </View>
          

    
          
                                              
            </Page>
        </Document>
             : <Document />} 
   </> );
 
}