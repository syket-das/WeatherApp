import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/index';

const ReloadIcon = ({ load }) => {
  const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';
  return (
    <View style={styles.reloadIcon}>
      <Ionicons
        onPress={() => load()}
        name={reloadIconName}
        size={24}
        color={colors.primary}
      />
    </View>
  );
};

export default ReloadIcon;

const styles = StyleSheet.create({
  reloadIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});
