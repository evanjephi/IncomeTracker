import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { sharedStyles } from './sharedStyles';
import { ThemedView } from './ThemedView';

type AllocationRowProps = {
  label: string;
  percentage: number;
  amount: number;
};

const AllocationRow: React.FC<AllocationRowProps> = ({ label, percentage, amount }) => {
  return (
    <ThemedView style={sharedStyles.allocationRow}>
      <ThemedText>{label} ({percentage}%):</ThemedText>
      <ThemedText>${amount.toFixed(2)}</ThemedText>
    </ThemedView>
  );
};

export default AllocationRow;
