import { Text, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { useState, useEffect } from 'react';

// This function was developed with the assistance of AI tools, such as but not limited to ChatGPT and Claude.ai
export function PushUpTracker({
    SAMPLE_RATE = 100, // milliseconds
    PUSHUP_THRESHOLD = 1.4, // Distance from the ground to consider a push-up
    MIN_PUSHUP_INTERVAL = 750, // Minimum time (ms) between push-ups
}: {
    SAMPLE_RATE?: number;
    PUSHUP_THRESHOLD?: number;
    MIN_PUSHUP_INTERVAL?: number;
}) {
    const [motionData, setMotionData] = useState({ x: 0, y: 0, z: 0 });
    const [pushupCount, setPushupCount] = useState(0);
    const [isGoingDown, setIsGoingDown] = useState(false);
    const [lastPushupTime, setLastPushupTime] = useState(0);
  
    useEffect(() => {
      DeviceMotion.setUpdateInterval(SAMPLE_RATE);
  
      const motionSubscription = DeviceMotion.addListener((data) => {
        if (data.acceleration) {
          setMotionData(data.acceleration);
        }
      });
  
      return () => {
        motionSubscription.remove();
      };
    }, []);
  
    useEffect(() => {
      const currentTime = Date.now();
  
      if (motionData.z < -PUSHUP_THRESHOLD && !isGoingDown) {
        setIsGoingDown(true);
      }
      if (motionData.z > PUSHUP_THRESHOLD && isGoingDown) {
        setIsGoingDown(false);
  
        // Check if enough time has passed since the last push-up
        if (currentTime - lastPushupTime > MIN_PUSHUP_INTERVAL) {
          setPushupCount((prev) => prev + 1);
          setLastPushupTime(currentTime);
        }
      }
    }, [motionData.z]);
  
    return (
    <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text style={{ fontSize: 128, textAlign: 'center' }}>{pushupCount}</Text>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>Keep Pushing!</Text>
    </View>
    );
  }
  