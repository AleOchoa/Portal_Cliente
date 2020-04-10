import React from 'react';

import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
//import moment from "moment";


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
        width:'60%',
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
        width:'35%',
        borderRadius:'10',
    },
    imagen:{
        width: '60',
        height: '100',

    },
     
        
      

});

export function PdfDocument(props) {
    const contrato=props.data
    console.log("pdf props", props.data);
    return (
        <Document>
            <Page  size="A4" style={styles.page}>
            {contrato? 
                         <View style={styles.body}>
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
                        </View>
               
            : ""}
                  <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
            </Page>
        </Document>
    );
}