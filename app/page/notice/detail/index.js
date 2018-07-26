import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, WebView } from 'react-native';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Api from '../../../util/api';
import NavBar from '../../../component/navBar';
import Loading from '../../../component/loading';

export default class NoticeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: '',
        }
    }
    render() {
        const { loading, dataSource } = this.state;
        if (!loading) {
            var HTML = "<html><style>img{width:100%}.code{width:auto}</style>" + dataSource.con_str + "</html>";
        }

        return (
            <View style={styles.container}>
                <NavBar title={'公告详情'} back={'公告详情'} navigator={this.props.navigator} />

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {
                        loading ?
                            <Loading />
                            :
                            <View style={{ flex: 1 }}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>{dataSource.title}</Text>
                                    <Text style={styles.dateTime}>{Util.formatDate(dataSource.addtime)}</Text>
                                </View>
                                <View style={styles.body}>
                                    <WebView
                                        style={{
                                            height: Theme.screenHeight,
                                           
                                        }}
                                        source={{ html: HTML }}
                                    />
                                </View>
                            </View>
                    }

                </ScrollView>
            </View>
        )
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        let that = this;

        let url = Api.getNoticeDetail + '?newsid=' + this.props.id;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                loading: false,
                                dataSource: responseData.data
                            })
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingBottom: 60,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    title: {
        fontSize: 14,
        color: '#000',
    },
    dateTime: {
        paddingTop: 10,
        fontSize: 11,
        color: '#999',
    },
    body: {
        padding: 15,
        flex: 1,
    },
})