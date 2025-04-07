import { Button, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// This function was developed with the assistance of AI tools, such as but not limited to ChatGPT and Claude.ai
export default function HomeScreen() {
  const router = useRouter();
  
  return (
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
