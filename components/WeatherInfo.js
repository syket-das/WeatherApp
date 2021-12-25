import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { colors } from '../utils/index';

const { primary, secondary } = colors;

const WeatherInfo = ({ currentWeather }) => {
  const {
    main: { temp },
    weather: [details],
    name,
    sys: { country },
  } = currentWeather;
  const { icon, description, main } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.weatherInfo}>
      <Text>
        {name}, {country}
      </Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.weatherDesc}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: 'center',
  },
  weatherDesc: {
    textTransform: 'capitalize',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  textPrimary: {
    color: primary,
    fontSize: 40,
  },
  textSecondary: {
    color: secondary,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
