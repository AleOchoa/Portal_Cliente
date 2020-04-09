import React, {useContext} from 'react';
import {MyContext} from '../../context'
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
    container: {
        flexDirection: 'row',
        '@media max-width: 400': {
          flexDirection: 'column',
        },
      },
    page: {
        flexDirection: 'row',
        backgroundColor: "#ffffff"
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
      title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
      },
      image: {
        marginVertical: 1,
        marginHorizontal: 200,
        height: 100,  
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
      text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
      },
      subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
      },
        header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    rightColumn: {
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
      marginLeft: 10,//alto
      marginRight: 50,
      marginTop: 30,
      borderStyle: 'solid',
          backgroundColor: 'red',
      color: '#fff',
      border: 1,
      borderWidth:2,
      //texto superior
      },
      leftColumn: {
        flexDirection: 'column',
        width: 170,
        marginLeft: 30,
        marginRight: 15,
        marginTop: 20,
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
                          <Text style={styles.header}> Estado de cuenta {contrato.NoContrato}</Text>
                          <View style={styles.container}>
                        <View style={styles.leftColumn}>
                        <Text style={styles.text}>No.Contrato: {contrato.NoContrato}</Text>
                        <Text style={styles.text}>Fecha Corte: {contrato.FechaCorte} </Text>
                        <Text style={styles.text}>Saldo al corte: {contrato.SaldoAlCorte}</Text> 
                        <Image style={styles.image} src="/logo.png"/>
                        </View>
                        <Text>{contrato.SaldoAlCorte}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                      <Text>This one does not wrap well testing the wrap features, I see some words getting cut off</Text>
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