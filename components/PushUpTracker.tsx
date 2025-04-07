import { Text, View, Vibration } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// This function was developed with the assistance of AI tools, such as but not limited to ChatGPT and Claude.ai
export function PushUpTracker({
    SAMPLE_RATE = 100,
    PUSHUP_THRESHOLD = 1.4,
    MIN_PUSHUP_INTERVAL = 750,
    INACTIVITY_TIMEOUT = 5000,
}: {
    SAMPLE_RATE?: number;
    PUSHUP_THRESHOLD?: number;
    MIN_PUSHUP_INTERVAL?: number;
    INACTIVITY_TIMEOUT?: number;
}) {
  const [motionData, setMotionData] = useState({ x: 0, y: 0, z: 0 });
  const [pushupCount, setPushupCount] = useState(0);
  const pushupCountRef = useRef(0);
  const [isGoingDown, setIsGoingDown] = useState(false);
  const [lastPushupTime, setLastPushupTime] = useState(0);
  const lastActivityTimeRef = useRef(Date.now());
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsReady(true);
          // Vibrate to indicate tracker is ready
          Vibration.vibrate(500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    // Only start after the countdown is done
    if (!isReady) return;

    DeviceMotion.setUpdateInterval(SAMPLE_RATE);
    const motionSubscription = DeviceMotion.addListener((data) => {
      if (data.acceleration) {
        setMotionData(data.acceleration);
      }
    });

    return () => {
      motionSubscription.remove();
    };
  }, [isReady, SAMPLE_RATE]);

  useEffect(() => {
    // Only start after the countdown is done
    if (!isReady) return;

    const currentTime = Date.now();
    if (Math.abs(motionData.z) > 0.5) {
      lastActivityTimeRef.current = currentTime;
    }

    if (motionData.z < -PUSHUP_THRESHOLD && !isGoingDown) {
      setIsGoingDown(true);
    }
    if (motionData.z > PUSHUP_THRESHOLD && isGoingDown) {
      setIsGoingDown(false);

      // Check if enough time has passed since the last push-up
      if (currentTime - lastPushupTime > MIN_PUSHUP_INTERVAL) {
        setPushupCount((prev) => {
          const newCount = prev + 1;
          pushupCountRef.current = newCount;
          return newCount;
        });
        setLastPushupTime(currentTime);
      }
    }
  }, [isReady, motionData.z]);

  useEffect(() => {
    // Only start after the countdown is done
    if (!isReady) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityTimeRef.current;

      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        // Stop the motion sensor
        clearInterval(interval);


        // Vibration feedback for inactivity
        Vibration.vibrate([0, 250, 75, 250, 75, 500]);
        // Save the push-up if highscore of the day
        const today = new Date().toISOString().split('T')[0];

        SecureStore.getItemAsync(today).then((savedCount) => {
          if (savedCount && parseInt(savedCount, 10) >= pushupCountRef.current) {
            return; // Do nothing if the saved count is greater or equal
          }

          // Save the new highscore for the day
          SecureStore.setItemAsync(today, pushupCountRef.current.toString());
        });

        // Redirect to the home screen after inactivity
        router.replace('/');
      }
    // Check every second
    }, 1000);

    return () => clearInterval(interval);
  }, [isReady]);

  return (
    <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {!isReady ? (
        <>
          <Text style={{ fontSize: 128, textAlign: 'center', color: 'white' }}>{countdown}</Text>
          <Text style={{ fontSize: 24, textAlign: 'center', color: 'white' }}>Get Ready!</Text>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 128, textAlign: 'center', color: 'white' }}>{pushupCount}</Text>
          <Text style={{ fontSize: 24, textAlign: 'center', color: 'white' }}>Keep Pushing!</Text>
        </>
      )}
    </View>
  );
}