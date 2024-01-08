import {
    PDFViewer,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    BlobProvider,
    PDFDownloadLink,
} from "@react-pdf/renderer";
import { FC } from "react";
import moment from 'moment'

const Print: FC<any> = (props: any) => {
    const styles = StyleSheet.create({
        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            margin: 10,
        },
        tableRow: { margin: "auto", flexDirection: "row" },
        tableCol: {
            width: "33%",
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
        },
        tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
        tableHeader: {
            margin: "auto",
            marginTop: 5,
            fontSize: 12,
            fontWeight: "bold",
        },
        headerBackground: {
            backgroundColor: "#f0f0f0",
        },
    });

    const Doc = () => (
        <Document>
            <Page orientation="landscape">
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.headerBackground]}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableHeader}>
                                Nomor Resi
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableHeader}>
                                Status
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableHeader}>
                                Nama Pelanggan
                            </Text>
                        </View>
                    </View>
                    {props.items.map((item: any) => (
                        <View style={styles.tableRow} key={item.receipt_number}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {item.receipt_number}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {item.order_status}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {item.customer_name}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <BlobProvider document={Doc}>
            {({ blob, url, loading, error }) => (
                <div>
                    <PDFViewer className="w-full h-screen">
                        <Doc />
                    </PDFViewer>
                    {!loading && blob && (
                        <PDFDownloadLink document={Doc} fileName="document.pdf">
                            {({ blob, url, loading, error }) =>
                                loading ? "Loading document..." : "Download"
                            }
                        </PDFDownloadLink>
                    )}
                </div>
            )}
        </BlobProvider>
    );
};

export default Print;
