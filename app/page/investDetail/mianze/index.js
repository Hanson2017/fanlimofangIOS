import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Title from '../../../component/title';

export default class Mianze extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: false,
        }
    }
    render() {
        const { isrepeat } = this.props;
        return (
            <View style={[styles.container]}>
                <Title title={'风险提示及免责声明'} />
                {
                    isrepeat == 0 ?
                        <View style={styles.mainzeContainer}>
                           
                            <Text style={styles.text}>1、返利魔方仅为信息提供平台，返利魔方不参与用户在任何网贷平台投资交易的过程，也不接受、不触碰、不吸纳任何用户的投资资金。</Text>
                            <Text style={styles.text}>2、返利魔方仅提供各网贷平台的活动信息，不构成任何对该有活动的网贷平台(以下简称“活动平台”）的安全性的评价或投资建议。任何活动平台都存在不同程度的投资风险，用户应自行、谨慎评估各活动平台的风险，自行决策是否投资，并自行承担全部风险。</Text>
                            {
                                this.state.isHidden ?
                                    null
                                    :
                                    <View>
                                        <Text style={styles.text}>3、活动平台如出现任何风险（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），返利魔方均不承担任何责任。</Text>
                                        <Text style={styles.text}>4、用户通过返利魔方提供的信息或链接，最终在各活动平台进行投资、完成交易。返利魔方提供的信息存在滞后、投资回报率测算有误差等风险，用户应在活动平台投资前，仔细阅读活动平台公布的活动规则及相关协议，充分理解相关规则与协议后再决策进行投资。</Text>
                                        <Text style={styles.text}>5、用户应合理、谨慎评估自己的风险承受能力，在自己的风险承受能力的范围内在活动平台进行投资。</Text>
                                        <Text style={styles.text}>6、返利魔方首投活动具有魔方保障功能，大部分活动赔付率在0.1%至1%之间，如在保障期之内平台出问题导致拿不回本金，可通过魔方保障获得极少量的赔付，赔付金额杯水车薪，仅起安慰作用。具体的赔付率在下方方案中有标明，请仔细阅读。</Text>
                                        <Text style={styles.text}>举例：某用户通过返利魔方，在2018年1月1日参与活动投资某平台1万元（必须是返利魔方有1万的活动方案，超过活动方案的投资本金不在保障范围内），项目期限为30天。该方案的赔付率假设为0.1%，保障期假设为31天，如果平台在2018年2月1日之前出事导致拿不回本金，可通过魔方保障获得赔付，因为赔付率为0.1%，所以赔付金额仅有10元。</Text>
                                        <Text style={styles.text}>7、再次强调，网贷投资不是银行存款，具备一定风险性，存在投资本金无法收回的风险。任何风险由用户自行承担，返利魔方不承担任何责任。</Text>
                                    </View>
                            }

                        </View>
                        :
                        <View style={styles.mainzeContainer}>
                            <Text style={styles.text}>【风险提示及免责声明】</Text>
                            <Text style={styles.text}>1、返利魔方仅为信息提供平台，返利魔方不参与用户在任何网贷平台投资交易的过程，也不接受、不触碰、不吸纳任何用户的投资资金。</Text>
                            <Text style={styles.text}>2、返利魔方仅提供各网贷平台的活动信息，不构成任何对该有活动的网贷平台(以下简称“活动平台”）的安全性的评价或投资建议。任何活动平台都存在不同程度的投资风险，用户应自行、谨慎评估各活动平台的风险，自行决策是否投资，并自行承担全部风险。</Text>
                            {
                                this.state.isHidden ?
                                    null
                                    :
                                    <View>
                                        <Text style={styles.text}>3、活动平台如出现任何风险（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），返利魔方均不承担任何责任。</Text>
                                        <Text style={styles.text}>4、用户通过返利魔方提供的信息或链接，最终在各活动平台进行投资、完成交易。返利魔方提供的信息存在滞后、投资回报率测算有误差等风险，用户应在活动平台投资前，仔细阅读活动平台公布的活动规则及相关协议，充分理解相关规则与协议后再决策进行投资。</Text>
                                        <Text style={styles.text}>5、用户应合理、谨慎评估自己的风险承受能力，在自己的风险承受能力的范围内在活动平台进行投资。</Text>
                                        <Text style={styles.text}>6、返利魔方复投活动没有任何保障功能。</Text>
                                        <Text style={styles.text}>7、再次强调，网贷投资不是银行存款，具备一定风险性，存在投资本金无法收回的风险。任何风险由用户自行承担，返利魔方不承担任何责任。</Text>
                                    </View>
                            }
                        </View>
                }
                {/* <TouchableOpacity style={styles.openbtn} activeOpacity={1}
                    onPress={()=>{
                        this.setState({
                            isHidden:!this.state.isHidden
                        })
                    }}
                >
                    <View style={[this.state.isHidden?styles.triangDown:styles.triangUp]}></View>
                    <Text style={styles.openbtnText}>{this.state.isHidden?'展开全文':'收起全文'}</Text>
                </TouchableOpacity> */}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    mainzeContainer: {
        padding: 12,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 11,
        color: '#999',
        lineHeight: 18,
    },
    openbtn: {
        paddingLeft: 12,
        paddingTop: 5,
        paddingBottom: 18,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    triangDown: {
        borderTopWidth: 6,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopColor: '#E62344',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    triangUp:{
        borderBottomWidth: 6,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomColor: '#E62344',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    openbtnText: {
        paddingLeft: 6,
        fontSize: 12,
        color: '#E62344',
    },
})