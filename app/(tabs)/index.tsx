import { Button, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { PushUpTracker } from '@/components/PushUpTracker';

const SAMPLE_RATE = 100; // milliseconds
const PUSHUP_THRESHOLD = 1.4; // Distance from the ground to consider a push-up (got to this measurement by testing)
const MIN_PUSHUP_INTERVAL = 750; // Minimum time (ms) between push-ups

// This function was developed with the assistance of AI tools, such as but not limited to ChatGPT and Claude.ai
export default function HomeScreen() {
  const router = useRouter();
  
  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <PushUpTracker
    //   SAMPLE_RATE={SAMPLE_RATE}
    //   PUSHUP_THRESHOLD={PUSHUP_THRESHOLD}
    //   MIN_PUSHUP_INTERVAL={MIN_PUSHUP_INTERVAL}
    //   />
    // </View>
    <View>
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
    color: 'black',
    textAlign: 'center',
    marginTop: 150
  }
});
