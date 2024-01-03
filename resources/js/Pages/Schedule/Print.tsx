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
            width: "20%",
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
        logo: {
            width: 50,
            height: 50,
            marginBottom: 10,
        },
    });

    const Doc = () => (
        <Document>
            <Page orientation="landscape">
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.headerBackground]}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableHeader}>
                                Nama Pelanggan
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableHeader}>
                                Jumlah Barang
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableHeader}>Status</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableHeader}>
                                Waktu Penjadwalan
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableHeader}>Nama Kurir</Text>
                        </View>
                    </View>
                    {props.order_has_been_picked_up.map((order: any) => (
                        <View style={styles.tableRow} key={order.order_id}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {order.customer_name}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {order.items_count}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {order.status}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {order.scheduling_time}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {order.courier_name}
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
