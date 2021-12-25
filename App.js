import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

import { WEATHER_API_KEY, BASE_WEATHER_URL } from '@env';

export default function App() {
  const weather_key = 'df7dad5c67d8b4f30a625623af8c19fd';
  const base_url = 'api.openweathermap.org/data/2.5/weather?';
  const [errMessage, setErrMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');

  useEffect(() => {
    load();
  }, []);

  // --------------------------------------------------
  async function load() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrMessage('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${weather_key}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrMessage('Something went wrong');
      }
    } catch (error) {
      console.log('errror', errMessage);
    }
  }
  // --------------------------------------------------

  if (currentWeather) {
    const {
      main: { temp },
    } = currentWeather;

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <Text>{temp}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
});
