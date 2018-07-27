import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../../component/item/index';

export default class Group extends Component {
    render() {
        const { lists, navigator, title, type, dateDiff } = this.props;
        return (
            <View style={[type == 'first' ? null : Theme.mt15]}>
                <Title title={title} iconBgC={type == 'first' ? '#67cbdb' : '#FF9900'} />
                {
                    lists.length > 0 ?
                        lists.map((list, i) => {
                            return (
                                <Item dateDiff={dateDiff} data={list} key={i} navigator={navigator} backName={'首页'} />
                            )
                        })
                        :
                        <View style={styles.null}>
                            <Text style={styles.nullText}>暂无</Text>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    null: {
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },
    nullText: {
        fontSize: 11,
        color: '#999',
    },
})