import React, {useEffect, useState} from 'react';
import {Platform, View, Text, Button, ScrollView} from 'react-native';
import RNSimpleOpenvpn, {
  addVpnStateListener,
  removeVpnStateListener,
} from 'react-native-simple-openvpn';

const isIPhone = Platform.OS === 'ios';

const VPNScreen = () => {
  const [vpnStatusList, setVpnStatusList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    observeVpn();

    return () => {
      stopObserveState();
      removeVpnStateListener();
    };
  }, []);

  async function stopObserveState() {
    if (isIPhone) {
      await RNSimpleOpenvpn.stopObserveState();
    }
  }

  async function observeVpn() {
    if (isIPhone) {
      await RNSimpleOpenvpn.observeState();
    }

    addVpnStateListener(state => {
      console.log('State', state);
      setVpnStatusList(prevState => [...prevState, state?.level]);
      setIsConnected(state === 'CONNECTED');
    });
  }

  async function startOvpn() {
    try {
      await RNSimpleOpenvpn.connect({
        remoteAddress: '192.168.1.65 3000',
        ovpnFileName: 'Russian',
        assetsPath: '',
        providerBundleIdentifier: 'com.testtasks',
        localizedDescription: 'TestTaskS',
      });
      setVpnStatusList(prevState => [...prevState, 'Connecting...']);
    } catch (error) {
      console.log('Error', error);
      setVpnStatusList(prevState => [...prevState, `Error: ${error.message}`]);
    }
  }

  async function stopOvpn() {
    try {
      await RNSimpleOpenvpn.disconnect();
      setVpnStatusList(prevState => [...prevState, 'Disconnecting...']);
    } catch (error) {
      setVpnStatusList(prevState => [...prevState, `Error: ${error.message}`]);
    }
  }

  function printVpnState() {
    const state = JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2);
    setVpnStatusList(prevState => [...prevState, `Current State: ${state}`]);
  }

  function clearLog() {
    setVpnStatusList([]);
  }

  return (
    <View style={{flex: 1, padding: 16}}>
      <ScrollView style={{flex: 1, marginBottom: 16}}>
        {vpnStatusList.length > 0 ? (
          vpnStatusList.map((status, index) => (
            <Text key={index} style={{marginBottom: 8}}>
              {status}
            </Text>
          ))
        ) : (
          <Text>{'No VPN status changes logged yet.'}</Text>
        )}
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title={isConnected ? 'Disconnect' : 'Connect'}
          onPress={isConnected ? stopOvpn : startOvpn}
        />
        <Button title="Print VPN State" onPress={printVpnState} />
        <Button title="Clear Log" onPress={clearLog} />
      </View>
    </View>
  );
};

export default VPNScreen;
