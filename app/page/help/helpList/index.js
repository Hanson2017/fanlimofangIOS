import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, ListView, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';

import Theme from '../../../util/theme';
import Loading from '../../../component/loading';
import Util from '../../../util/util';
import Api from '../../../util/api';

class List extends Component {
    render() {
        let data = this.props.data;
        let listNo = parseInt(this.props.index) + 1;
        let isHidden = this.props.isHidden;
        let conStrs=data.con_str.split('</p>')
        let conStr=conStrs.map((text,i)=>{
            let newText=Util.delHtmlTag(text)
            return (
                <Text style={styles.listConText}>{newText}</Text>
                   
            )
        })
        return (
            <View style={styles.listView}>
                <View style={styles.listTitle}><Text style={styles.listTitleText}>{listNo + ''}.{data.title}</Text></View>
                <TouchableOpacity style={styles.moreBtn} onPress={this.props.onShow}>
                    <Text style={styles.moreText}>{data.show_text}</Text>
                    <View style={[styles.moreIcon,data.show_text == '点击收起'?styles.moreIconOpen:null]}></View>
                </TouchableOpacity>
                {!data.show_state ? null :
                    <View style={styles.listCon}>
                        {conStr}
                       
                    </View>
                }
            </View>
        )
    }
}


export default class HelpList extends Component {
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
        if (this.state.loading) {
            return <Loading />
        }
        else {
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    onScroll={this._onScroll.bind(this)}
                    renderRow={this.renderRow.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                />
            )
        }
    }
    componentDidMount() {
        this.getData(1)
    }
    renderRow(rowData, sectionID, rowID) {
        return <List index={rowID} data={rowData} key={rowID} onShow={this._onShow.bind(this, rowID)} />
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
    _onScroll(e){
        let that=this.props.that;
        var offsetY = e.nativeEvent.contentOffset.y;

        if (offsetY > 0) {
            that.setState({
                isFixed: true
            })
        }
        else {
            that.setState({
                isFixed: false
            })
        }
    }
    _onShow(i) {
        let that = this;

        this.state.dataSource2[i].show_state = !this.state.dataSource2[i].show_state


        if (!this.state.dataSource2[i].show_state) {
            this.state.dataSource2[i].show_text = '点开查看详情'
        }
        else {
            this.state.dataSource2[i].show_text = '点击收起'
        }

        var newDataSource2 = this.state.dataSource2;
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.setState({
            dataSource: ds.cloneWithRows(newDataSource2),
            dataSource2: newDataSource2
        })
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
                console.log('加载完啦')
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

        let url = Api.getInfoList + '?type=bangzhu&page=' + this.page + '&pagesize=30';

        fetch(url)
            .then((response) => {

                if (response.ok) {

                    response.json()
                        .then((responseData) => {
                            let dataSource = that.state.dataSource2;
                            dataSource = dataSource.concat(responseData.data);
                            let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

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

    listView: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 12,
        paddingBottom:0,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    listTitle: {
        marginBottom: 10,
    },
    listCon:{
        marginTop:10,
    },
    listTitleText: {
        fontSize: 11,
        color: '#666',
        lineHeight: 20,
    },
    listConText: {
        fontSize: 11,
        lineHeight: 20,
        color: '#666'
    },
    moreBtn: {
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    moreText:{
        fontSize: 11,
        color:'#999'
    },
    moreIcon:{
        marginTop:10,
        width:20,
        height:2,
        backgroundColor:'#c9c9c9',
    },
    moreIconOpen:{
        backgroundColor:'#e62344',
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