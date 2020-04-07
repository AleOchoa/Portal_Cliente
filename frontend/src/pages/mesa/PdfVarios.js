import React, {useContext,useEffect} from 'react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../mesa/PdfDocument";
import {MyContext} from '../../context'



export default function PDFVarios({ history }){
    
  const context = useContext(MyContext)
  useEffect(()=>{
    if (!context.state.isLogged) return history.push('/')
  }) 
    const {edoCuenta,perfil,fechasEdoCuenta}=context.state
    
    const handleChange=async(e)=>{
      //si se modifica el contrato se debe borrar la fecha
      const {name,value}=e.target
      console.log(name)
      if (name==='contrato') {
        console.log('se cambia no contrato')
        await context.handleChange('fecha','','edoCuenta')
        await context.getFechasEdoCuenta(value)
      } 

      await context.handleChange(name,value,'edoCuenta')
      if (name==='fecha') {
        console.log('pdf')
        await context.handleChange('show',true,'edoCuenta')
      }
    }
    const setEdoCuenta=async ()=>{
    }
    


    return (<>
      {perfil &&
        <div className="container">
          <h2>Selecciona el Estado de Cuenta a Descargar</h2>
          <label htmlFor="contratos">No. Contrato</label>
          <select id="contratos" name="contrato" className="select"  onChange={(e)=>handleChange(e)} >
            <option value="" >
              Selecciona un contrato
            </option>
            {perfil.contratos.map((contrato, index) => {
              return (
                <option key={index} value={contrato}>
                  {contrato}
                </option>
              );
            })}
          </select>
          <label htmlFor="fechas">Fecha</label>
          <select id="fechas" name="fecha" className="select"  onChange={(e)=>handleChange(e)} >
            <option value="" >
              Selecciona un mes
            </option>
            {fechasEdoCuenta.map((fecha, index) => {
              return (
                <option key={index} value={fecha}>
                  {fecha}
                </option>
              );
            })}

          </select>
          {edoCuenta.show &&<PDFDownloadLink
            document={<PdfDocument data={perfil.edoCuenta[edoCuenta.contrato][edoCuenta.fecha]} />}
            fileName="EdoCuenta.pdf"
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#4a4a4a",
              backgroundColor: "#f2f2f2",
              border: "1px solid #4a4a4a"
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Pdf"
            }
          </PDFDownloadLink>}
        </div>}
        </>
      );
       
  }

