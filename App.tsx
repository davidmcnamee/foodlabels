import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component{
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  }
  
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        { this.state.hasCameraPermission && (
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                }}>
                <TouchableOpacity style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                </TouchableOpacity>
              </View>
            </Camera>
        )}
        { !this.state.hasCameraPermission && (
          <Text>No camera permissions :(</Text>
        )}
      </View>
    );
  }
}
