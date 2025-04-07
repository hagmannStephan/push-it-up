import { Button, View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ProgressChart } from '../../components/ProgressChart';

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
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello Stephan!</Text>
      <Text style={styles.subHeading}>Want to set a new record for today?</Text>
      <View style={styles.chartContainer}>
        <ProgressChart />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Start the Challenge!"
          onPress={() => {
            router.push('/workout');
          }}
          color="#841584"
        />
      </View>
      {todayCount !== null && (
        <View style={styles.textContainer}>
          <Text style={styles.score}>
            Today you managed to do {todayCount} Pushup's in a single set!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'black',
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '500',
    color: '#d3d3d3',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 60,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#301c4a',
    padding: 10,
  },
  textContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  score: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});