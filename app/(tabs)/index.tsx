import { Text, View } from 'react-native';
import { Gyroscope, Accelerometer, DeviceMotion } from 'expo-sensors';
import { useState, useEffect } from 'react';

const SAMPLE_RATE = 100; // milliseconds

export default function HomeScreen() {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
  const [motionData, setMotionData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Gyroscope.setUpdateInterval(SAMPLE_RATE);
    Accelerometer.setUpdateInterval(SAMPLE_RATE);
    DeviceMotion.setUpdateInterval(SAMPLE_RATE);

    const gyroSubscription = Gyroscope.addListener(setGyroData);
    const accelSubscription = Accelerometer.addListener(setAccelData);
    const motionSubscription = DeviceMotion.addListener((data) => {
      if (data.acceleration) {
        setMotionData(data.acceleration);
      }
    });

    return () => {
      gyroSubscription.remove();
      accelSubscription.remove();
      motionSubscription.remove();
    };
  }, []);

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text>Gyroscope:</Text>
      <Text>X: {gyroData.x.toFixed(2)} Y: {gyroData.y.toFixed(2)} Z: {gyroData.z.toFixed(2)}</Text>
      
      <Text>Accelerometer:</Text>
      <Text>X: {accelData.x.toFixed(2)} Y: {accelData.y.toFixed(2)} Z: {accelData.z.toFixed(2)}</Text>
      
      <Text>Device Motion (Acceleration):</Text>
      <Text>X: {motionData.x?.toFixed(2)} Y: {motionData.y?.toFixed(2)} Z: {motionData.z?.toFixed(2)}</Text>
    </View>
  );
}