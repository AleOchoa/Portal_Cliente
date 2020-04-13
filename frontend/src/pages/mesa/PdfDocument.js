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


const styles = StyleSheet.create({
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

    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    contratoContainer: {
        backgroundColor: "#f6f6f5",
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    movieDetails: {
        display: "flex",
        marginLeft: 5
    },
    movieTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    movieOverview: {
        fontSize: 10
    },

    vote: {
        display: "flex",
        flexDirection: "row"
    },
    rating: {
        height: 10,
        width: 10
    },
    vote_text: {
        fontSize: 10
    },
    vote_pop: {
        fontSize: 10,
        padding: 2,
        backgroundColor: "#61C74F",
        color: "#fff"
    },
    vote_pop_text: {
        fontSize: 10,
        marginLeft: 4
    },
    overviewContainer: {
        minHeight: 110
    },
    detailsFooter: {
        display: "flex",
        flexDirection: "row"
    },
    lang: {
        fontSize: 8,
        fontWeight: 700
    },
    vote_average: {
        fontSize: 8,
        marginLeft: 4,
        fontWeight: "bold"
    }
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
                        <Text style={styles.text}>No.Contrato: {contrato.NoContrato}</Text>
                        <Text style={styles.text}>Fecha Corte: {contrato.FechaCorte} </Text>
                        <Text style={styles.text}>Saldo al corte: {contrato.SaldoAlCorte}</Text> 
                        <Image style={styles.image} src="/logo.png"/>
                    </View>
            : ""}
                  <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
            </Page>
        </Document>
    );
}