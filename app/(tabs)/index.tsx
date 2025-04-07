import { Button, View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

// This function was developed with the assistance of AI tools, such as but not limited to ChatGPT and Claude.ai
export default function HomeScreen() {
  const router = useRouter();
  const [todayCount, setTodayCount] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
  
    const timeout = setTimeout(() => {
      SecureStore.getItemAsync(today).then((savedCount) => {
        if (savedCount) {
          setTodayCount(parseInt(savedCount, 10));
        }
      });
    }, 300); // Wait 300ms before reading because may not be updated yet
  
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <View>
      {todayCount !== null && (
        <Text style={styles.score}>Today's Push-Ups: {todayCount}</Text>
      )}
      <View style={styles.button}>
        <Button
          title="Go to Workout"
          onPress={() => {
            router.push('/workout');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
    marginTop: 150
  },
  score: {
    marginTop: 100,
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
});
