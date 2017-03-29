import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert, DeviceEventEmitter, Modal } from 'react-native';
import Theme from '../util/theme';
import Api from '../util/api';
import Header from '../component/Header';
import Loading from '../component/Loading';
import TxtInput from '../component/TextInputListW'
import SubmitBtn from '../component/SubmitBtn'
import FormValidation from '../util/FormValidation'
import Select from '../component/Select'
import Calendar from '../component/Calendar'

export default class ActiveRecordEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: null,
            planList: null,
            userid: '',
            phone: '',
            realname: '',
            plan: 1,
            investdate: '',
            alipay: '',
        }
    }
    render() {

        let comment_field = this.props.comment_field;

        if (comment_field.indexOf('c_userid') >= 0) {
            var useridView =
                <TxtInput
                    label={'注册ID'}
                    params={{ value: this.state.userid, onChangeText: this.onChangeTextUserid.bind(this) }}
                />
        }
        if (comment_field.indexOf('c_phone') >= 0) {
            var phoneView =
                <TxtInput
                    label={'注册手机号'}
                    params={{ value: this.state.phone, maxLength: 11, keyboardType: 'numeric', onChangeText: this.onChangeTextPhone.bind(this) }}
                />
        }
        if (comment_field.indexOf('c_username') >= 0) {
            var realnameView =
                <TxtInput
                    label={'真实姓名'}
                    params={{ value: this.state.realname, onChangeText: this.onChangeTextRealname.bind(this) }}
                />
        }

        if (comment_field.indexOf('investdate') >= 0) {
            var investdateView =

                <TxtInput
                    label={'投资日期'}
                    value={this.state.investdate}
                    ViewInput={true}
                    onPress={this._selectData.bind(this, this.state.plan)}
                />
        }
        let planstr = this.state.plan.toString()
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} headerText={'活动记录修改'} />

                <View style={styles.content}>
                    <View style={styles.FormContainer}>

                        {useridView}
                        {phoneView}
                        {realnameView}
                        <TxtInput
                            label={'所选方案'}
                            value={planstr}
                            ViewInput={true}
                            onPress={this._selectPlan.bind(this, this.state.plan)}
                        />

                        {investdateView}
                        <TxtInput
                            label={'支付宝账号'}
                            borderBt={'null'}
                            params={{ value: this.state.alipay, onChangeText: this.onChangeTextAlipay.bind(this) }}
                        />
                    </View>
                    <View style={[Theme.mt20]}>
                        <SubmitBtn value={'保存'} onPress={this.onSubmit.bind(this)} />
                    </View>

                </View>
            </View>
        )
    }
    onChangeTextUserid(text) {
        this.setState({
            userid: text
        })
    }
    onChangeTextPhone(text) {
        this.setState({
            phone: text
        })
    }
    onChangeTextRealname(text) {
        this.setState({
            realname: text
        })
    }
    onChangeTextInvestdate(text) {
        this.setState({
            investdate: text
        })
    }

    onChangeTextPlan(text) {
        this.setState({
            plan: text
        })
    }
    onChangeTextAlipay(text) {
        this.setState({
            alipay: text
        })
    }
    _selectPlan(planNo) {
        let planList = this.state.planList;
        let selectList = []
        for (let i = 0; i < planList.length; i++) {
            selectList.push({ number: planList[i].number, value: '方案' + planList[i].number })
        }
        this.props.navigator.push({
            component: Select,
            params: {
                selectList: selectList,
                selectNo: planNo - 1,
                headerText: '选择方案'
            }
        })
    }
    _selectData() {
        this.props.navigator.push({
            component: Calendar,
            params: {
                headerText: '选择日期',
                investdate:this.state.investdate

            }
        })
    }
    onSubmit() {
        let that = this;
        let dataSource = this.state.dataSource;
        let memberId = signState.r_id;
        let id = dataSource.id;
        let activityid = dataSource.activityid;
        let activitynumber = dataSource.activitynumber;
        let alipayid = this.state.alipay;
        let data_c_userid = this.state.userid;
        let data_c_phone = this.state.phone;
        let data_c_username = this.state.realname;
        let data_activityplannumber = this.state.plan;
        let data_investdate = this.state.investdate;
        let url = Api.membermodcomment;

        let comment_field = this.props.comment_field;

        if (comment_field.indexOf('c_userid') >= 0) {
            if (FormValidation.empty(data_c_userid, '用户ID不能为空') == false) {
                return;
            }
        }
        if (comment_field.indexOf('c_phone') >= 0) {
            if (FormValidation.phoneValid(data_c_phone) == false) {
                return;
            }
        }
        if (comment_field.indexOf('c_username') >= 0) {
            if (FormValidation.empty(data_c_username, '真实姓名不能为空') == false) {
                return;
            }
        }
        if (FormValidation.empty(data_activityplannumber, '活动方案不能为空') == false) {
            return;
        }
        if (comment_field.indexOf('investdate') >= 0) {
            if (FormValidation.empty(data_investdate, '投资日期不能为空') == false) {
                return;
            }
        }
        if (FormValidation.empty(alipayid, '支付宝账号不能为空') == false) {
            return;
        }

        let formData = {
            memberid: memberId,
            id: id,
            activityid: activityid,
            activitynumber: activitynumber,
            alipayid: alipayid,
            data_c_userid: data_c_userid,
            data_c_phone: data_c_phone,
            data_c_username: data_c_username,
            data_activityplannumber: data_activityplannumber,
            data_investdate: data_investdate
        }

        let opt = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {

                                Alert.alert(null, '修改成功',
                                    [
                                        { text: 'OK', onPress: () => { that.goback() } },
                                    ])
                            }
                            else {
                                Alert.alert('提示', responseData.resultmsg)
                            }
                        }))
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => { console.error(error) })

    }
    componentDidMount() {
        let that = this;
        this.getData();
        this.subscription = DeviceEventEmitter.addListener('select', (data) => {
            that.setState({
                plan: data
            })
        })
        this.subscription2 = DeviceEventEmitter.addListener('selectDate', (data) => {
            that.setState({
                investdate: data
            })
            console.log(data)
        })
    }
    componentWillUnmount() {
        this.subscription.remove();
        this.subscription2.remove();
    };
    getData() {
        let that = this;
        let memberId = signState.r_id;
        let id = this.props.id;
        let url = Api.getmembercommentRow + '?memberid=' + memberId + '&commentid=' + id;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            let comments = responseData.data.comment;
                            let planList = responseData.data.planlist;
                            that.setState({
                                dataSource: comments,
                                planList: planList,
                                userid: comments.data_c_userid,
                                phone: comments.data_c_phone,
                                realname: comments.data_c_username,
                                plan: comments.data_activityplannumber,
                                investdate: comments.data_investdate,
                                alipay: comments.alipayid,
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
    goback() {
        DeviceEventEmitter.emit('editComment', '修改成功')
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    content: {
        margin: 10,
        flex: 1,
    },
    FormContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    submitBtn: {
        width: 100,
        height: 36,
        backgroundColor: '#0099cc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 14,
    }
})