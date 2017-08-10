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
import VirtualMain from './virtual/main'
import Loading from './app/component/Loading'

export default class Flmf extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 0,
      loading: false
    }
  }
  render() {
    let status = this.state.status;
    if (this.state.loading) {
      if (status == 0) {
        return (
          <Navigation />
        )
      }
      else {
        return (
          <VirtualMain />
        );
      }
    }
    else {
      return (
        <Loading />
      )
    }

  }
  componentDidMount() {
    let that = this;
    let url = 'http://www.fanlimofang.com/DataApi/GetVersion?version=3.0.20'
    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((responseData) => {
              that.setState({
                status: responseData,
                loading: true
              })
              console.log(hotData)
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

AppRegistry.registerComponent('flmf', () => Flmf);
