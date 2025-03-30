import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type AllocationGraphProps = {
  data: { labels: string[], values: number[] };
};

const AllocationGraph: React.FC<AllocationGraphProps> = ({ data }) => {
  return (
    <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
      <BarChart
        data={{
          labels: data.labels,
          datasets: [{ data: data.values }],
        }}
        width={screenWidth - 2}
        height={300}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={{
         
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            paddingRight: 10,
          },
          propsForLabels: {
            fontSize: 10,
            rotation: 45,
            translateY: 10,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default AllocationGraph;
