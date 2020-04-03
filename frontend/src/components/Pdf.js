import React, {useContext} from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { PdfDocument } from "../pages/mesa/Clientes";
import {MyContext} from '../context'



export default function Login({ history }){
    const context = useContext(MyContext)
   
  
    const contrato = async e => {
      const {user}=await context.state(e)
    if(user){
        history.push('/clientes')
      } else{
        console.log(error);
      }
    }
  
    return (
      <div className="container">
        <h2>Información</h2>
        <label htmlFor="contrato">Select</label>
        <select id="contrato" className="select" onChange={contrato}>
        <option defaultValue="" disabled>
          option
        </option>
      </select>
        
        {show &&<PDFDownloadLink
          document={<PdfDocument data={state} />}
          fileName="estado.pdf"
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
      </div>
    );
  }

/*
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
)*/