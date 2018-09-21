import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Title from '../../component/title';
import Theme from '../../util/theme';


export default class MianzeTab extends React.Component {
    render() {
        return (
            <View style={Theme.mt15}>
                <Title title={'风险提示及免责声明'} />              
                <View style={styles.content}>
                    <Text style={styles.text}>1、返利魔方仅为信息提供平台，返利魔方不参与用户在任何网贷平台出借交易的过程，也不接受、不触碰、不吸纳任何用户的出借资金。</Text>
                    <Text style={styles.text}>2、返利魔方仅提供各网贷平台的活动信息，不构成任何对该有活动的网贷平台(以下简称“活动平台”）的安全性的评价或出借建议。任何活动平台都存在不同程度的出借风险，用户应自行、谨慎评估各活动平台的风险，自行决策是否出借，并自行承担全部风险。</Text>
                    <Text style={styles.text}>3、活动平台如出现任何风险（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），返利魔方均不承担任何责任。</Text>
                    <Text style={styles.text}>4、用户通过返利魔方提供的信息或链接，最终在各活动平台进行出借、完成交易。返利魔方提供的信息存在滞后、出借回报率测算有误差等风险，用户应在活动平台出借前，仔细阅读活动平台公布的活动规则及相关协议，充分理解相关规则与协议后再决策进行出借。</Text>
                    <Text style={styles.text}>5、用户应合理、谨慎评估自己的风险承受能力，在自己的风险承受能力的范围内在活动平台进行出借。</Text>
                    <Text style={styles.text}>6、再次强调，网贷出借不是银行存款，具备一定风险性，存在出借本金无法收回的风险。任何风险由用户自行承担，返利魔方不承担任何责任。</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 12,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 11,
        color: '#666',
        lineHeight: 18,
    },
})