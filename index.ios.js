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
    codePush.sync()
    let url = 'http://www.fanlimofang.com/DataApi/GetVersion_dashu?version=3.0.2'
    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((responseData) => {
              that.setState({
                status: responseData,
                loading: true
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

AppRegistry.registerComponent('flmf', () => Flmf);
