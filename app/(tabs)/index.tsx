import { Text, View } from 'react-native';
import { Gyroscope, Accelerometer, DeviceMotion } from 'expo-sensors';
import { useState, useEffect } from 'react';

const SAMPLE_RATE = 100; // milliseconds
const PUSHUP_THRESHOLD = 1.5; // Adjust this based on testing

export default function HomeScreen() {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
  const [motionData, setMotionData] = useState({ x: 0, y: 0, z: 0 });
  const [pushupCount, setPushupCount] = useState(0);
  const [isGoingDown, setIsGoingDown] = useState(false);

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

  useEffect(() => {
    if (motionData.z < -PUSHUP_THRESHOLD && !isGoingDown) {
      setIsGoingDown(true);
    }
    if (motionData.z > PUSHUP_THRESHOLD && isGoingDown) {
      setIsGoingDown(false);
      setPushupCount((prev) => prev + 1);
    }
  }, [motionData.z]);

  return (
    <View style={{ padding: 20 }}>
      <Text>Gyroscope:</Text>
      <Text>X: {gyroData.x.toFixed(2)} Y: {gyroData.y.toFixed(2)} Z: {gyroData.z.toFixed(2)}</Text>
      
      <Text>Accelerometer:</Text>
      <Text>X: {accelData.x.toFixed(2)} Y: {accelData.y.toFixed(2)} Z: {accelData.z.toFixed(2)}</Text>
      
      <Text>Device Motion (Acceleration):</Text>
      <Text>X: {motionData.x?.toFixed(2)} Y: {motionData.y?.toFixed(2)} Z: {motionData.z?.toFixed(2)}</Text>
      
      <Text>Push-ups Count: {pushupCount}</Text>
    </View>
  );
}
