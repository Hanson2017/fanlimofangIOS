import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';

export default class DetailTop extends Component {
    render() {
        const { data, that } = this.props;
        const activity = data.activity;
        const plat = data.plat;
        return (
            <View>
                
                <View style={[styles.deatilTopContainer]}>
                    <View style={styles.deatilTopHd}>
                        <View>
                            <Text style={styles.deatilTopHdText}>已参加</Text>
                            <Text style={styles.number}>{data.commentnum + ''}人</Text>
                        </View>
                        {
                            activity.keywords != '' && activity.keywords != null ?
                                <View style={styles.keywords}>
                                    <Text style={[styles.keywordText, styles.keywordTit]}>关键字:</Text>
                                    {
                                        Util.formatSymbol(activity.keywords).map((item, i) => {
                                            return <Text key={i} style={[styles.keywordText, styles.keyword]}>{item}</Text>;
                                        })
                                    }
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={styles.tagsContainer}>
                        <View style={styles.tags}>
                            <View style={[styles.tag, activity.isrepeat == 0 ? styles.tagFirst : styles.tagRepeat]}>
                                <Text style={[styles.tagText, activity.isrepeat == 0 ? styles.tagFirstText : styles.tagRepeatText]}>
                                    {activity.isrepeat == 0 ? '首次出借' : '多次出借'}
                                </Text>
                            </View>
                            {
                                activity.ishighest == 1 ?
                                    <View style={styles.tag}><Text style={styles.tagText}>全网领先</Text></View>
                                    :
                                    null
                            }

                            {
                                data.repayday == '当日返现' ?
                                    <View style={styles.tag}><Text style={styles.tagText}>当日返现</Text></View>
                                    :
                                    <View style={styles.tag}><Text style={styles.tagText}>{data.repayday.replace('个', '') + '返'}</Text></View>
                            }
                        </View>
                        {
                            activity.status == 1 ?
                                activity.atype == 1 ?
                                    <View style={styles.tags}>
                                        <View style={styles.tag}><Text style={styles.tagText}>风控分:{plat.riskscore + ''}</Text></View>
                                        {
                                            plat.noshowrisk !== 1 ?
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <View style={styles.tag}><Text style={styles.tagText}>风险等级:{Util.risklevel(plat.risklevel)}</Text></View>
                                                    <TouchableOpacity style={styles.prompt}
                                                        onPress={() => {
                                                            that.setState({
                                                                isHiddenIntroduce: false,
                                                            })
                                                        }}
                                                    >
                                                        <Text style={styles.promptText}>?</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                :
                                                null
                                        }
                                    </View>
                                    :
                                    <View style={styles.tags}>
                                        <View style={styles.tag}><Text style={styles.tagText}>{Util.inType(activity.atype)}</Text></View>
                                    </View>
                                :
                                null
                        }
                    </View>
                    <View style={styles.reasonContainer}>
                        <Text style={[styles.reasonText, styles.reasonTit]}>上架理由：</Text>
                        <Text style={styles.reasonText}>{Util.delHtmlTag(activity.reasons)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tipNote: {
        padding: 12,
        backgroundColor: '#fff',
    },
    tipNoteText: {
        fontSize: 11,
        color: '#E61C2C',
        lineHeight: 15,
    },
    deatilTopContainer: {
    
        padding: 12,
        backgroundColor: '#fff',
    },
    deatilTopHd: {
        marginTop: 5,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deatilTopHdText: {
        fontSize: 12,
        color: '#868686',
    },
    number: {
        paddingTop: 3,
        fontSize: 24,
        color: '#868686',
    },
    keywords: {
        height: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    keywordText: {
        fontSize: 11,
        color: '#999',
    },
    keyword: {
        paddingLeft: 5,
    },
    tags: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    tag: {
        marginRight: 8,
        paddingLeft: 4,
        paddingRight: 4,
        borderWidth: 0.5,
        borderColor: '#E62344',
        borderRadius: 3,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagText: {
        color: '#E62344',
        fontSize: 10,
    },
    tagFirst: {
        borderColor: '#67cbdb',
    },
    tagRepeat: {
        borderColor: '#FF9900',
    },
    tagFirstText: {
        color: '#67cbdb',
    },
    tagRepeatText: {
        color: '#FF9900',
    },
    reasonContainer: {
        marginTop: 3,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    reasonText: {
        color: '#6B6B6B',
        fontSize: 11,
    },
    reasonTit: {
        paddingBottom: 5,
    },
    prompt: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    promptText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        borderRadius: 7,

    },
})