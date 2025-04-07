import { StyleSheet, View, Text } from 'react-native';
import { PushUpTracker } from '@/components/PushUpTracker';

const SAMPLE_RATE = 100; // milliseconds
const PUSHUP_THRESHOLD = 1.4; // Distance from the ground to consider a push-up (got to this measurement by testing)
const MIN_PUSHUP_INTERVAL = 750; // Minimum time (ms) between push-ups
const INACTIVITY_TIMEOUT = 5000; // Terminate the app if no activity for 5 seconds

// This function was developed with the assistance of AI tools, such as but not limited to ChatGPT and Claude.ai
export default function Workout() {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <PushUpTracker 
          SAMPLE_RATE={SAMPLE_RATE}
          PUSHUP_THRESHOLD={PUSHUP_THRESHOLD}
          MIN_PUSHUP_INTERVAL={MIN_PUSHUP_INTERVAL}
          INACTIVITY_TIMEOUT={INACTIVITY_TIMEOUT}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
