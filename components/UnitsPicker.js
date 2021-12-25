import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const UnitsPicker = ({ unitSystem, setUnitSystem }) => {
  return (
    <View style={styles.container}>
      <Picker
        style={{ width: 150 }}
        selectedValue={unitSystem}
        onValueChange={(item) => setUnitSystem(item)}
        mode="dropdown"
        itemStyle={{
          fontSize: 20,
        }}
      >
        <Picker.Item label="Celcius" value="metric" />
        <Picker.Item label="Fahrenheit" value="imperial" />
      </Picker>
    </View>
  );
};

export default UnitsPicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: -30,
      },
      android: {
        top: 30,
      },
    }),
    left: 20,
  },
});
