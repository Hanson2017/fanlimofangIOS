import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, RefreshControl, ListView ,ActivityIndicator} from 'react-native';
import Theme from '../../util/theme';
import Util from '../../util/util';
import Api from '../../util/api';
import NavBar from '../../component/navBar';
import Loading from '../../component/loading';
import Detail from './detail';

export default class Notice extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: false,
            isLoadMoreOver: false,
            dataSource: ds.cloneWithRows([]),
            dataSource2: [],
            pageCount: 1,
            totalNum: null,
            pageSize: null,
            ref: false
        };
    }
    render() {
        const { navigator } = this.props;
        const { loading, isRefreshing, dataSource } = this.state;
        return (
            <View style={styles.container}>
                <NavBar title={'全部公告'} back={'全部公告'} navigator={this.props.navigator} />
                {
                    loading ?
                        <Loading />
                        :
                        <View style={styles.content}>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}
                                renderFooter={this.renderFooter.bind(this)}
                                onEndReached={this._onEndReached.bind(this)}
                                onEndReachedThreshold={10}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isRefreshing}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                            />
                        </View>
                }


            </View>
        )
    }
    componentDidMount() {
        this.getData(1)
    }
    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity key={rowID} style={styles.list} onPress={()=>{
                this.goDetail(rowData.id)
            }}>
                <Text numberOfLines={1} style={styles.titleText}>{rowData.title}</Text>
                <Text style={styles.dateText}>{Util.formatDate(rowData.addtime)}</Text>
            </TouchableOpacity>
        )
    }

    renderFooter() {
        if (this.state.isLoadMore) {
            if (this.state.isLoadMoreOver) {
                console.log('没有更多啦！')
                return (
                    <View style={styles.loadMore}>
                        <Text style={styles.loadMoreText}>没有更多啦！</Text>
                    </View>
                )
            }
            else {
                console.log(' 正在加载...')
                return (
                    <View style={styles.loadMore}>
                        <ActivityIndicator animating={true} />
                    </View>
                )
            }
        }
        else {
            return null;
        }

    }
    _onEndReached() {
        if (this.state.totalNum > this.state.pageSize) {
            this.getData(2)
        }
    }
    _onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData(3)
    }
    goDetail(id) {
        const {navigator } = this.props;
        navigator.push({
            component: Detail,
            params: {
                id: id,
            }
        })
    }
    getData(type) {
        let that = this;
        let pageCount = this.state.pageCount;

        if (type == 1) {
            this.page = 1;
            this.setState({
                loading: true,
            })
        }
        else if (type == 2) {
            if (pageCount > this.page) {
                this.page++;
                this.setState({
                    isLoadMore: true,
                })
            }
            else {
                this.setState({
                    isLoadMoreOver: true,
                })
                setTimeout(() => {
                    this.setState({
                        isLoadMoreOver: false,
                    })
                }, 3000)
                return;
            }

        }
        else if (type == 3) {
            this.page = 1;
            this.setState({
                dataSource2: [],
            })
        }

        let url = Api.getNotice + '?type=gonggao&page=' + this.page + '&pagesize=10';

        fetch(url)
            .then((response) => {

                if (response.ok) {

                    response.json()
                        .then((responseData) => {
                            let dataSource = that.state.dataSource2;
                            dataSource = dataSource.concat(responseData.data);
                            let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                            console.log(responseData)
                            that.setState({
                                isRefreshing: false,
                                loading: false,
                                isLoadMore: false,
                                dataSource: ds.cloneWithRows(dataSource),
                                dataSource2: dataSource,
                                pageCount: responseData.pageCount,
                                totalNum: responseData.totalNum,
                                pageSize: responseData.pageSize
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
        backgroundColor: Theme.bgColor,
    },
    content:{
        paddingBottom:60,
        backgroundColor:'#fff',
    },
    list: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        padding:15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    titleText:{
        flex:1,
        fontSize:12,
        color:'#444',
    },
    dateText:{
        fontSize:12,
        color:'#999',
    },
    loadMore: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loadMoreText: {
        color: '#999',
    }
})
