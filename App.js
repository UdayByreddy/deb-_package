import 'react-native-url-polyfill/auto';
import 'text-encoding-polyfill';
import '@azure/core-asynciterator-polyfill'

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Subscriber from './src/nats/Subscriber';
import Publisher from './src/nats/Publisher';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <Subscriber />
      <Publisher />
    </SafeAreaView>
  );
}
