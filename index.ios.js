/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import codePush from 'react-native-code-push'
import Navigation from '../flmf/app/config/entry'
import VirtualMain from './virtual/config/entry'
import Loading from './app/component/loading'
var BackboneEvents = require("backbone-events-standalone");
window.EventEmitter = BackboneEvents.mixin({});

export default class Flmf extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 0,
      loading: false
    }
  }
  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.tit}>返利魔方停止运营公告</Text>
        <Text style={styles.text}>各位亲爱的用户：</Text>
        <Text style={[styles.text,styles.text2]}>       鉴于市场处于严重下滑态势，返利魔方团队决定即日起停止运营。感谢大家长久的相伴，我们后会有期！</Text>
        <Text style={[styles.text,styles.text3]}>返利魔方运营团队</Text>
        <Text style={[styles.text,styles.text3]}>2019-3-28</Text>
      </View>
    )
    // let status = this.state.status;
    // if (this.state.loading) {
    //   if (status == 0) {
    //     return (
    //       <Navigation />
    //     )
    //   }
    //   else {
    //     return (
    //       <VirtualMain />
    //     );
    //   }
    // }
    // else {
    //   return (
    //     <Loading />
    //   )
    // }

  }
  componentDidMount() {
    let that = this;
    codePush.sync()
    


    // let url = 'http://www.fanlimofang.com/DataApi/GetVersion_dashu?version=3.0.2'
    // fetch(url)
    //   .then((response) => {
    //     if (response.ok) {
    //       response.json()
    //         .then((responseData) => {
    //           that.setState({
    //             status: responseData,
    //             loading: true
    //           })
    //         })
    //     }
    //     else {
    //       console.log('网络请求失败')
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('error:', error)
    //   })
  }

}

const styles=StyleSheet.create({
  content:{
    padding:30,
  },
  tit:{
    textAlign:'center',
    fontSize:16,
    paddingBottom:20,
  },
  text:{
    lineHeight:22,
    fontSize:14,
    color:'#333',
  },
  text2:{
    paddingTop:10,
  },
  text3:{
      textAlign:'right',
  },
})

AppRegistry.registerComponent('flmf', () => Flmf);
