import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { AuthProvider } from './contexts/authProvider';
import MainNavigation from './components/MainNavigation';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
            <MainNavigation />
        </SafeAreaView>
      </AuthProvider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
