import React, { useContext } from 'react';
import { BusinessAllocation, IncomeContext } from '../IncomeContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sharedStyles } from '../../components/sharedStyles';
import AllocationRow from '../../components/AllocationRow';
import IncomeInput from '../../components/IncomeInput';

const calculateBusinessAllocations = (income: number, percentages: BusinessAllocation) => {
  return {
    tithe: income * (percentages.tithe / 100),
    expenses: income * (percentages.expenses / 100),
    educationFund: income * (percentages.educationFund / 100),
    businessFund: income * (percentages.businessFund / 100),
    funFund: income * (percentages.funFund / 100),
    wealthFund: income * (percentages.wealthFund / 100),
  };
};

export default function BusinessIncomeScreen() {
  const incomeContext = useContext(IncomeContext);

  if (!incomeContext) throw new Error('BusinessIncomeScreen must be used within an IncomeProvider');

  const { totalBusinessIncome, addBusinessIncome, allocationTotals, allocationPercentages, resetData } = incomeContext;

  const handleBusinessIncomeSubmit = (incomeValue: number) => {
    addBusinessIncome(incomeValue);
  };

  const handleResetData = () => {
    resetData(); // Reset all data, including business income and allocations
  };

  return (
    <ThemedView style={sharedStyles.container}>
      <ThemedText style={sharedStyles.header}>Business Income</ThemedText>

      <IncomeInput
        placeholder="Enter business income"
        onSubmit={handleBusinessIncomeSubmit}
        onReset={handleResetData} // Call the reset handler
      />

      <ThemedText>Total Business Income: ${totalBusinessIncome.toFixed(2)}</ThemedText>
      <ThemedText style={sharedStyles.subHeader}>Current Total Allocations:</ThemedText>

      <AllocationRow label="Tithe" percentage={allocationPercentages.business.tithe} amount={allocationTotals.business.tithe} />
      <AllocationRow label="Expenses" percentage={allocationPercentages.business.expenses} amount={allocationTotals.business.expenses} />
      <AllocationRow label="Education Fund" percentage={allocationPercentages.business.educationFund} amount={allocationTotals.business.educationFund} />
      <AllocationRow label="Business Fund" percentage={allocationPercentages.business.businessFund} amount={allocationTotals.business.businessFund} />
      <AllocationRow label="Fun Fund" percentage={allocationPercentages.business.funFund} amount={allocationTotals.business.funFund} />
      <AllocationRow label="Wealth Fund" percentage={allocationPercentages.business.wealthFund} amount={allocationTotals.business.wealthFund} />
    </ThemedView>
  );
}
