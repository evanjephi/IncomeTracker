import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type SavedDataPieChartProps = {
  title: string;
  data: {
    tithes: number;
    expenses: number;
    saving?: number; // Optional for salary and combined data
    educationFund: number;
    businessFund?: number; // Optional for salary data
    funFund: number;
    wealthFund: number;
  };
};

const SavedDataPieChart: React.FC<SavedDataPieChartProps> = ({ title, data }) => {
  const chartData = [
    { name: 'Tithes', amount: data.tithes, color: '#FF6384', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Expenses', amount: data.expenses, color: '#36A2EB', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    ...(data.saving !== undefined
      ? [{ name: 'Saving', amount: data.saving, color: '#FFCE56', legendFontColor: '#7F7F7F', legendFontSize: 12 }]
      : []),
    { name: 'Education Fund', amount: data.educationFund, color: '#4BC0C0', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    ...(data.businessFund !== undefined
      ? [{ name: 'Business Fund', amount: data.businessFund, color: '#9966FF', legendFontColor: '#7F7F7F', legendFontSize: 12 }]
      : []),
    { name: 'Fun Fund', amount: data.funFund, color: '#FF9F40', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Wealth Fund', amount: data.wealthFund, color: '#FFCD56', legendFontColor: '#7F7F7F', legendFontSize: 12 },
  ];

  return (
    <>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </>
  );
};

export default SavedDataPieChart;
