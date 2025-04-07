import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { BarChart } from 'react-native-chart-kit';

interface DayData {
  day: string;
  count: number;
}

export function ProgressChart() {
  const [weekData, setWeekData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeekData = async () => {
      try {
        setLoading(true);
        const data: DayData[] = [];
        const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(today.getDate() - i);
          const dateString = date.toISOString().split('T')[0];
          const dayOfWeek = dayLabels[date.getDay()];
          const savedCount = await SecureStore.getItemAsync(dateString);

          data.push({
            day: dayOfWeek,
            count: savedCount ? parseInt(savedCount, 10) : 0,
          });
        }

        setWeekData(data);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekData();
  }, []);

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', height: 220 }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const chartData = {
    labels: weekData.map(item => item.day),
    datasets: [
      {
        data: weekData.map(item => item.count),
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 40;

  const chartConfig = {
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 7 Days Progress</Text>
      <BarChart
        data={chartData}
        width={chartWidth}
        height={200}
        chartConfig={chartConfig}
        fromZero={true}
        yAxisLabel=""
        yAxisSuffix=""
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    marginHorizontal: 20,
  },
});
