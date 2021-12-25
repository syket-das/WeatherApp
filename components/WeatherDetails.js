import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/index';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherDetails = ({ currentWeather, unitSystem }) => {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather;

  const windSpeed =
    unitSystem === 'metric'
      ? `${Math.round(speed)} meter/s`
      : `${Math.round(speed)} miles/h`;

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailBox,
            borderRightWidth: 1,
            borderRightColor: colors.border_col,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5
              name="temperature-low"
              size={24}
              color={colors.primary}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Feels Like</Text>
              <Text style={styles.textSecondary}>{feels_like}°</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="water"
              size={24}
              color={colors.primary}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Humidity</Text>
              <Text style={styles.textSecondary}>{humidity}%</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailBox,
            borderRightWidth: 1,
            borderRightColor: colors.border_col,
          }}
        >
          <View
            style={{
              ...styles.weatherDetailsRow,
            }}
          >
            <MaterialCommunityIcons
              name="weather-windy"
              size={24}
              color={colors.primary}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Wind Speed</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="speedometer"
              size={24}
              color={colors.primary}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Pressure</Text>
              <Text style={styles.textSecondary}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WeatherDetails;
const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderColor: colors.border_col,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItem: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondary: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 7,
  },
});
