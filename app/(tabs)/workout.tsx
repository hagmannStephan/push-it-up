import { StyleSheet, View, Text } from 'react-native';

export default function Workout() {
  return (
    <View>
      <Text style={styles.text}>Workout View</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 150
  }
});
