import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity, DeviceEventEmitter, Modal, Alert, Keyboard, Dimensions, Platform } from 'react-native';

import Api from '../util/api';
import CameraAction from '../component/CameraAction';
import Select from '../component/Select';
import Calendar from '../component/Calendar';
import Theme from '../util/theme';
import ModalImg from '../component/ModalImg';
import FormValidation from '../util/FormValidation';
import Icon from 'react-native-vector-icons/Icomoon';
import ThirdLogin from '../util/ThirdLogin'
import StorageLoginInfo from '../config/storageLogin'

const { width, height } = Dimensions.get('window');

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [
                {
                    userid: '',
                    phone: '',
                    realname: '',
                    plan: '请选择',
                    investdate: '',
                    fileUri: Api.domain + '/images/uploadimg.jpg',
                    fileName: ''
                }
            ],
            alipay: '',
            len: 1,
            visible: false,
            preview: '',
            userSetInfo: '',
            ref: false,
            comformType: 'Single',
        }
        let KeyboardAvoidingViewData = this.props.KeyboardAvoidingViewData;
        this.contentHeight = KeyboardAvoidingViewData.contentHeight;

        this.textInputView = null;//当前编辑的textInput
        this.lastMoveH = 0;//保留上次滑动的距离
        this.needMove = false;//弹出键盘时，textInputView是否需要滑动
    }
    CommentFormList(labelText, params, ViewInput) {
        let index=Math.random()*10000
        return (
            <View style={styles.FormList} key={index}>
                <View style={styles.FormListLabel}><Text style={styles.FormListLabelText}>{labelText}</Text></View>
                <View style={styles.FormListInputView}>
                    {ViewInput ?
                        <TouchableOpacity style={styles.ViewInput} onPress={ViewInput.onPress} activeOpacity={0.7}>
                            <Text style={{ color: '#666' }}>{ViewInput.value}</Text>
                        </TouchableOpacity>
                        :
                        <TextInput style={styles.textInput} {...params} onFocus={() => this.textInputView = params.ref} />
                    }
                </View>
            </View>
        )
    }
    useridFunction(i) {
        let that = this;
        let comment_field = this.props.dataSource.comment_field;
        let useridView = null;

        if (comment_field.indexOf('c_userid') >= 0) {
            useridView = this.CommentFormList('注册ID',
                {
                    onChangeText: (text) => {
                        that.state.listData[i].userid = text;
                    },
                    ref: 'userid' + i
                }
            )
        }
        return useridView;
    }
    phoneFunction(i) {
        let that = this;
        let comment_field = this.props.dataSource.comment_field;
        let phoneView = null;

        if (comment_field.indexOf('c_phone') >= 0) {
            phoneView = this.CommentFormList('注册手机号',
                {
                    defaultValue: that.state.listData[i].phone,
                    maxLength: 11,
                    keyboardType: 'numeric',
                    onChangeText: (text) => {
                        that.state.listData[i].phone = text;
                    },
                    ref: 'phone' + i
                }
            )
        }
        return phoneView;
    }
    realnameFunction(i) {
        let that = this;
        let comment_field = this.props.dataSource.comment_field;
        let realnameView = null;
        if (comment_field.indexOf('c_username') >= 0) {
            realnameView = this.CommentFormList('真实姓名',
                {
                    onChangeText: (text) => {
                        that.state.listData[i].realname = text;
                    },
                    ref: 'realname' + i
                }
            )
        }
        return realnameView;
    }
    investdateFunction(i) {
        let that = this;
        let comment_field = this.props.dataSource.comment_field;
        let investdateView = null;

        if (comment_field.indexOf('investdate') >= 0) {
            investdateView = this.CommentFormList('投资日期', {},
                {
                    value: that.state.listData[i].investdate,
                    onPress: this._selectData.bind(this, i)
                }

            )
        }
        return investdateView;
    }
    investImgFunction(i) {
        let that = this;
        let comment_field = this.props.dataSource.comment_field;
        let investImgView = null;
        let uri = this.state.listData[i].fileUri;
        let img_investUrl = Api.domain + this.props.dataSource.img_invest

        if (comment_field.indexOf('img_invest') >= 0) {

            investImgView = (
                <View style={[styles.uploadImgView, this.state.comformType == 'Single' ? { marginBottom: 20 } : null]}>
                    <View>
                        <Text style={styles.uploadImgViewText}>投资截图</Text>
                        <TouchableOpacity activeOpacity={0.7}
                            onPress={() => {
                                this.setState({
                                    visible: true,
                                    preview: uri
                                })
                            }}
                        >
                            <Image source={{ uri: uri }} style={styles.uploadImg} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            activeOpacity={0.7}
                            onPress={CameraAction.cameraAction.bind(this, this, i)}
                        >
                            <Text style={styles.uploadBtnText}>本地上传</Text>
                        </TouchableOpacity>
                    </View>
                    {i == 0 ?
                        <View style={{ marginLeft: 30, }}>
                            <Text style={styles.uploadImgViewText}>示例：</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                this.setState({
                                    visible: true,
                                    preview: img_investUrl
                                })
                            }}>
                                <Image source={{ uri: img_investUrl }} style={styles.uploadImg} />
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                </View>
            );
        }
        return investImgView;
    }
    planFunction(i) {
        let that = this;
        let planView = this.CommentFormList('所选方案', {},
            {
                value: that.state.listData[i].plan,
                onPress: this._selectPlan.bind(this, i)
            }

        )
        return planView;
    }

    headerFunction(i) {
        let hdView = null;
        if (this.state.comformType != 'Single') {
            hdView = (
                <View style={styles.hdView}>
                    <View><Text style={{ color: '#999' }}>账号{i + 1}</Text></View>
                    {
                        i != 0 ?
                            <TouchableOpacity activeOpacity={0.7} style={[Theme.flexDirection, { flexDirection: 'row' }]} onPress={this.deleteInputForm.bind(this, i)}>
                                <Icon name={'delete'} size={16} color={'#999'} />
                                <Text style={{ color: '#999', marginLeft: 5 }}>删除</Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
            )
        }
        return hdView;
    }
    fillFunction(i) {
        let that = this;
        let fillView = null;
        let userSetInfos = this.state.userSetInfo;
        if (signState !== null && userSetInfos != '') {
            fillView = (
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <View style={styles.FormListLabel}><Text style={{ color: '#34a0e7' }}>一键填充：</Text></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        {
                            userSetInfos.listdata.map((list,j) => {
                                return (
                                    <TouchableOpacity key={j} style={{ width: 130, marginBottom: 10, }}
                                        onPress={() => {
                                            that.state.listData[i].phone = list.c_phone;
                                            that.setState({
                                                ref: !that.state.ref
                                            })
                                        }}>
                                        <Text style={{ color: '#34a0e7' }}>{list.c_phone}</Text>
                                    </TouchableOpacity>
                                )
                            })

                        }
                    </View>
                </View>
            )

        }

        return fillView;
    }
    render() {
        let that = this;
        let comment_field = this.props.dataSource.comment_field;
        let commentForms = [];
        let fLine = (
            <View></View>
        )
        if (this.state.comformType != 'Single') {
            fLine = (
                <View style={{ height: 1, flex: 1, backgroundColor: '#eee', marginTop: 10, marginBottom: 20, }}></View>
            )
        }

        for (let i = 0; i < this.state.len; i++) {
            commentForms.push(
                this.headerFunction(i),
                this.fillFunction(i),
                this.useridFunction(i),
                this.phoneFunction(i),
                this.realnameFunction(i),
                this.planFunction(i),
                this.investdateFunction(i),
                this.investImgFunction(i),
                fLine
            )
        }

        return (
            <View>
                <ModalImg that={this} visible={this.state.visible} uri={this.state.preview} />

                {
                    signState == null ?
                        <View style={styles.commentTop}>
                            <Text style={styles.commentTopText}>无需注册也可参加活动，但注册后可更方便对信息进行编辑等操作，以及享受一键跟帖功能</Text>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity activeOpacity={0.6} style={styles.qqBtn} onPress={ThirdLogin._qqlogin.bind(this, this)}>
                                    <Text style={styles.qqBtnText}>QQ登录</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.6} style={[styles.qqBtn,styles.weChatBtn,{marginLeft:10,}]} onPress={ThirdLogin._wechatlogin.bind(this, this)}>
                                    <Text style={[styles.qqBtnText,styles.weChatBtnText]}>微信登录</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null
                }
                {/*未登录说明 end*/}
                <View style={styles.commentTab}>
                    <TouchableOpacity style={[styles.tab, this.state.comformType == 'Single' ? styles.tabActive : null]}
                        onPress={() => {
                            this.setState({
                                comformType: 'Single',
                                len: 1,
                                listData: [
                                    {
                                        userid: '',
                                        phone: '',
                                        realname: '',
                                        plan: '请选择',
                                        investdate: '',
                                        fileUri: Api.domain + '/images/uploadimg.jpg',
                                        fileName: ''
                                    }
                                ]
                            })
                        }}

                    >
                        <Text style={[styles.tabText, this.state.comformType == 'Single' ? styles.tabTextActive : null]}>单账号</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, this.state.comformType == 'double' ? styles.tabActive : null, { marginLeft: 20 }]}
                        onPress={() => {
                            this.setState({
                                comformType: 'double'
                            })
                        }}
                    >
                        <Text style={[styles.tabText, this.state.comformType == 'double' ? styles.tabTextActive : null]}>多账号</Text>
                    </TouchableOpacity>
                </View>
                {/* 单多账号Tab end */}
                {commentForms}
                {this.state.comformType != 'Single' ?
                    <View style={styles.addBtnView}>
                        <TouchableOpacity
                            style={styles.addBtn}
                            activeOpacity={0.7}
                            onPress={this.addInputForm.bind(this)}
                        >
                            <Text style={styles.addBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
                {/*添加账号 end*/}

                {
                    this.CommentFormList('支付宝账号',
                        {
                            defaultValue: this.state.alipay,
                            onChangeText: (text) => {
                                this.setState({
                                    alipay: text
                                })
                            },
                            ref: 'alipay'
                        }
                    )

                }
                {/*支付宝账号 end*/}
                <View style={styles.submitBtnView}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        activeOpacity={0.7}
                        onPress={this.onSubmit.bind(this)}
                    >
                        <Text style={styles.submitBtnText}>提交</Text>
                    </TouchableOpacity>
                </View>
                {/*提交 end*/}
            </View>
        )
    }

    addInputForm() {
        var that = this;
        that.state.listData.push(
            {
                userid: '',
                phone: '',
                realname: '',
                plan: '请选择',
                investdate: '',
                fileUri: Api.domain + '/images/uploadimg.jpg',
                fileName: ''
            }
        )
        this.setState({
            len: this.state.len + 1,
        })
    }
    deleteInputForm(index) {
        this.setState({
            len: this.state.len - 1,
        })
        this.state.listData.splice(index, 1)
    }
    _selectPlan(index) {
        let planList = this.props.plans;
        let selectList = []
        for (let i = 0; i < planList.length; i++) {
            selectList.push({ number: planList[i].number, value: '方案' + planList[i].number })
        }
        let selectNo = this.state.listData[index].plan == '请选择' ? -1 : this.state.listData[index].plan - 1
        this.props.navigator.push({
            component: Select,
            params: {
                selectList: selectList,
                selectNo: selectNo,
                headerText: '选择方案',
                index: index
            }
        })
    }
    _selectData(index) {
        this.props.navigator.push({
            component: Calendar,
            params: {
                headerText: '选择日期',
                investdate: this.state.listData[index].investdate,
                index: index
            }
        })
    }
    _keyboardDidShow = (e) => {
        let that = this;
        let moveH = this.props.KeyboardAvoidingViewData.moveH;
        let contentHeight = this.props.KeyboardAvoidingViewData.contentHeight;
        if (!this.textInputView) return;
        this.needMove = false;
        this.refs[this.textInputView].measure((ox, oy, w, h, px, py) => {
            let conHeight = height - 96;
            let leftHeight = conHeight - py;//输入框距离底部的距离 = （屏幕的高度 - 当前TextInput的高度）  
            //输入框距离底部的距离小于键盘的高度，需要滑动  
            if (leftHeight < e.startCoordinates.height + 25) {
                this.needMove = true;
                // 需要移动的距离  
                let moveHeight = 30 + (e.startCoordinates.height - leftHeight);

                //moveH 异常数据处理  
                if (moveH + conHeight > contentHeight) {
                    moveH = contentHeight - conHeight;
                }
                this.lastMoveH = moveH;
                that.props.KeyboardAvoidingViewData.scrollViewDom.scrollTo({ y: moveH + moveHeight, x: 0 });
            }
        });
    }

    _keyboardDidHide = () => {
        if (this.needMove) {
            this.props.KeyboardAvoidingViewData.scrollViewDom.scrollTo({ y: this.lastMoveH, x: 0 });
        }
        this.textInputView = null;
    }
    componentDidMount() {
        let that = this;
        this.getUserSetInfo();


        this.subscriptions = [
            DeviceEventEmitter.addListener('select', (data) => {
                let index = data.index;
                let value = data.value;
                that.state.listData[index].plan = value;
            }),
            DeviceEventEmitter.addListener('selectDate', (data) => {
                let index = data.index;
                let date = data.date;
                that.state.listData[index].investdate = date;
            })
        ]


    }
    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.subscriptions2 = [
                Keyboard.addListener('keyboardDidShow', this._keyboardDidShow),
                Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
            ];
        }
    }
    componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.remove());
        if (Platform.OS === 'ios') {
            this.subscriptions2.forEach((sub) => sub.remove());
        }
    };
    getUserSetInfo() {

        let that = this;
        if (signState !== null) {

            let memberId = signState.r_id;
            let url = Api.memberSet + memberId;
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        response.json()
                            .then((responseData) => {
                                that.setState({
                                    userSetInfo: responseData.data,
                                    alipay: responseData.data.alipayid
                                })
                                console.log(that.state.userSetInfo)
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
    goBackSuccee() {
        StorageLoginInfo.storageLoad(this)

        setTimeout(() => {
            this.getUserSetInfo();
            this.setState({
                ref: !this.state.ref
            })
        }, 300)

    }
    onSubmit() {
        let that = this;
        let listData = this.state.listData;
        let dataSource = this.props.dataSource;

        let alipay = this.state.alipay; //支付宝
        let activityid = dataSource.activityid; //活动ID
        let periodnumber = dataSource.periodnumber; // 期数  

        let memberid = 0;  //用户ID 
        let username = '游客'; //登录用户名

        if (signState !== null) {
            memberid = signState.r_id
            username = signState.r_username
        }

        let url = Api.addcommentmulti;   //提交数据请求地址
        let comment_field = dataSource.comment_field; //需要提交的字段

        for (let j = 0; j < listData.length; j++) {
            // userid 判断
            if (comment_field.indexOf('c_userid') >= 0) {
                if (FormValidation.empty(listData[j].userid, '账号' + (j + 1) + ':' + '用户ID不能为空') == false) {
                    return;
                }
            }
            // phone 判断
            if (comment_field.indexOf('c_phone') >= 0) {
                if (FormValidation.phoneValid(listData[j].phone, '账号' + (j + 1) + ':') == false) {
                    return;
                }
            }
            // realname 判断
            if (comment_field.indexOf('c_username') >= 0) {
                if (FormValidation.empty(listData[j].realname, '账号' + (j + 1) + ':' + '真实姓名不能为空') == false) {
                    return;
                }
            }
            // plan 判断
            if (listData[j].plan == '请选择') {
                Alert.alert('提示', '账号' + (j + 1) + ':' + '请选择方案')
                return;
            }
            // investdate 判断
            if (comment_field.indexOf('investdate') >= 0) {
                if (FormValidation.empty(listData[j].investdate, '账号' + (j + 1) + ':' + '投资日期不能为空') == false) {
                    return;
                }
            }
            // 投资截图判断
            if (comment_field.indexOf('img_invest') >= 0) {
                if (listData[j].fileUri == 'http://www.fanlimofang.com/images/uploadimg.jpg') {
                    Alert.alert('提示', '账号' + (j + 1) + ':' + '请上传投资截图')
                    return;
                }
            }

        }
        if (FormValidation.empty(alipay, '支付宝账号不能为空') == false) {
            return;
        }
        let formData = new FormData();

        for (let i = 0; i < listData.length; i++) {
            if (comment_field.indexOf('img_invest') >= 0) {
                formData.append("img_invest" + (i + 1), { uri: listData[i].fileUri, type: 'multipart/form-data', name: listData[i].fileName });    //上传图片
            }
            else {
                formData.append("img_invest" + i, '')
            }

            formData.append("c_userid" + (i + 1), listData[i].userid);// c_userid 用户注册id
            formData.append("c_phone" + (i + 1), listData[i].phone);// c_phone 手机
            formData.append("c_username" + (i + 1), listData[i].realname);// c_username 真实姓名
            formData.append("plannumber" + (i + 1), listData[i].plan);// plannumber 方案
            formData.append("investdate" + (i + 1), listData[i].investdate); // investdate 投资日期

        }
        formData.append("addnum", listData.length);// 
        formData.append("alipayid", alipay);// alipayid 支付宝
        formData.append("activityid", activityid); // activityid 活动ID
        formData.append("periodnumber", periodnumber);// periodnumber 期数  
        formData.append("memberid", memberid);// memberid 用户ID 
        formData.append("username", username);// username 登录用户 

        let opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        console.log(formData)
        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            console.log(responseData)
                            if (responseData.result == 1) {

                                Alert.alert(null, '回帖成功',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                that.props.updataComment();
                                                that.setState({
                                                    len: 1,
                                                    listData: [
                                                        {
                                                            userid: '',
                                                            phone: '',
                                                            realname: '',
                                                            plan: '请选择',
                                                            investdate: '',
                                                            fileUri: Api.domain + '/images/uploadimg.jpg',
                                                            fileName: ''
                                                        }
                                                    ]
                                                })
                                            }
                                        },
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

}


const styles = StyleSheet.create({
    commentTop: {
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,

    },
    commentTopText: {
        color: '#666',
        lineHeight: 20,
    },
    qqBtn: {
        marginTop: 8,
        width: 92,
        height: 28,
        borderColor: '#45b7ee',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 4
    },
    qqBtnText: {
        color: '#45b7ee',
        lineHeight: 20,
    },
    weChatBtn:{
        borderColor: '#00d10d',
    },
    weChatBtnText: {
        color: '#00d10d',
    },
    commentTab: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingBottom: 10,
    },
    tab: {
        width: 80,
        height: 32,
        borderColor: '#ddd',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 4
    },
    tabActive: {
        borderColor: '#ff6666',
    },

    tabText: {
        color: '#666',
    },
    tabTextActive: {
        color: '#ff6666',
    },
    FormList: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        marginBottom: 10,
    },
    FormListLabel: {
        width: 90,
    },
    FormListLabelText: {
        color: '#999',
    },
    FormListInputView: {
        flex: 1,
    },
    ViewInput: {
        padding: 8,
        height: 32,
        width: 160,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
    },
    textInput: {
        padding: 8,
        height: 32,
        width: 160,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#666'
    },
    hdView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 30,
        paddingBottom: 5,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    uploadImgView: {
        flexDirection: 'row',
    },
    uploadImgViewText: {
        color: '#999'
    },
    uploadImg: {
        width: 116,
        height: 84,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        marginTop: 10,
        marginBottom: 10,
    },
    uploadBtn: {
        width: 90,
        height: 30,
        backgroundColor: '#b3b0b0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    uploadBtnText: {
        color: '#fff',
        fontSize: 14,
    },
    fillView: {
        flexDirection: 'row',
    },
    addBtnView: {
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    addBtn: {
        width: 46,
        height: 46,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnText: {
        color: '#999',
        fontSize: 34,
    },
    submitBtnView: {
        marginTop: 10,
        paddingTop: 15,
        borderTopColor: '#f2f2f2',
        borderTopWidth: 1,
    },
    submitBtn: {
        width: 150,
        height: 42,
        backgroundColor: '#0099cc',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 16,
    }
})