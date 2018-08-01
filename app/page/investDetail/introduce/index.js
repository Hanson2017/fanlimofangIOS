
import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Theme from '../../../util/theme';
import Util from '../../../util/util';

export default class MianzePop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: true,
        }
    }
    render() {
        const {isHidden } = this.state;
        const { that } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.mask}></View>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>返利魔方风险等级体系介绍</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.body}>
                           <View style={styles.bodyTop}>
                                <Text style={styles.bodyText}>本安全体系介绍仅供参考，不构成对任何平台的安全性评价或投资建议。</Text>
                                <Text style={styles.bodyText}>风险等级体系介绍如下：</Text>
                                <Text style={[styles.bodyText,{paddingTop:8,paddingBottom:8,}]}>安全性：AAA > AA > A > BBB > BB > B > CCC > CC > C</Text>
                                <Text style={styles.bodyText}>注意：返利魔方会根据活动平台的运营状态动态调整风控得分，请用户知悉。</Text>
                           </View>
                           <View style={styles.bodyInd}>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[AAA] 风控得分：91分-100分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>银行活期/定期存款。</Text>
                                </View>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[AA] 风控得分：81分-90分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>正规银行自身发行的理财产品[仅限风险等级为R1/R2级，其他级别不在本风险体系考察范围内]； 正规机构发行的货币基金类产品。</Text>
                                </View>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[A] 风控得分：71分-80分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>P2P网贷平台，平台在背景实力、风控体系、业务模式、产品特性、运营能力、IT技术等多个评估点中的绝大部分具备优秀的表现和实力，且经受过多年时间考验，具备强抗风险能力， 但是依然存在本金无法收回的风险。</Text>
                                </View>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[BBB] 风控得分：61分-70分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>P2P网贷平台，平台在背景实力、风控体系、业务模式、产品特性、运营能力、IT技术等多个评估点中的绝大部分具备良好表现和实力，且经受过较长时间考验，具备较强的抗风险能力，但是依然存在本金无法收回的风险。</Text>
                                </View>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[BB] 风控得分： 51分-60分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>P2P网贷平台，平台在背景实力、风控体系、业务模式、产品特性、运营能力、IT技术等多个评估点中的绝大部分具备较好的表现和实力，且经受过一定时间考验，具备一般的抗风险能力。在部分关键评估点上存在一定程度的缺陷，而且存在本金无法收回的风险。</Text>
                                </View>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[B] 风控得分： 41分-50分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>P2P网贷平台，平台在背景实力、风控体系、业务模式、产品特性、运营能力、IT技术等多个评估点中的绝大部分具备一般的表现和实力，且经受过一定时间考验，具备偏弱的抗风险能力。在部分关键评估点上存在较为明显的缺陷，而且存在本金无法收回的风险。</Text>
                                </View>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[CCC] 风控得分： 31分-40分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>P2P网贷平台，平台在背景实力、风控体系、业务模式、产品特性、运营能力、IT技术等多个评估点中的绝大部分具备偏弱表现和实力，具备偏弱的抗风险能力。在部分关键评估点上存在明显的缺陷，而且存在本金无法收回的风险。不符合返利魔方入驻标准。</Text>
                                </View>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[CC] 风控得分： 21分-30分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>P2P网贷平台，平台在背景实力、风控体系、业务模式、产品特性、运营能力、IT技术等多个评估点中的绝大部分具备非常弱表现和实力，具备非常弱的抗风险能力。在部分关键评估点上存在极为明显的缺陷，而且存在本金无法收回的风险。不符合返利魔方入驻标准。</Text>
                                </View>
                                <View style={styles.bodyIndDl}>
                                    <Text style={[styles.bodyText,styles.bodyIndDt]}>[C] 风控得分： 0分-20分</Text>
                                    <Text style={[styles.bodyText,styles.bodyIndDd]}>P2P网贷平台，平台在多数评估点上表现极其弱，抗风险能力极其弱，较多关键评估点存在显著的缺陷，存在本金无法收回的风险。不符合返利魔方入驻标准。</Text>
                                </View>
                           </View>
                        </View>

                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity style={[styles.btn, styles.btnCancel]} activeOpacity={0.6}
                            onPress={() => {
                                that.setState({
                                    isHiddenIntroduce: true,
                                })
                            }}
                        >
                            <Text style={[styles.btnText, styles.btnCancelText]}>我知道了</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: Theme.screenWidth,
        height: Theme.screenHeight,
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1002,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#000",
        opacity: 0.4,
        position: "absolute",
        width: Theme.screenWidth,
        height: Theme.screenHeight,
        left: 0,
        top: 0,
    },
    content: {
        width: Theme.screenWidth * 0.8,
        height: Theme.screenHeight * 0.7,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: '#797979',
    },
    header: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#797979',
    },
    headerText: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    body: {
        padding: 12,
    },
    bodyText: {
        color: '#666',
        fontSize: 12,
        lineHeight: 18,
    },
    bodyIndDl:{
        marginTop:12,
    },
    bodyIndDt:{
        fontWeight:'bold',
        color:'#333',
    },
    footer: {
        padding: 12,
    },
    
    btn: {
        height: 35,
        backgroundColor: '#bbb',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66CCCC',
    },
    btnText: {
        fontSize: 14,
        color: '#fff',
    },
    btnCancel: {
        backgroundColor: '#e61c2c',
    },
    
})