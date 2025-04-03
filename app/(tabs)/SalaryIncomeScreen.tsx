// SalaryIncomeScreen.tsx
import React, { useState, useContext } from 'react';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { IncomeContext, SalaryAllocation } from '../IncomeContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sharedStyles } from '../../components/sharedStyles';

const calculateSalaryAllocations = (income: number, percentages: SalaryAllocation) => {
  return {
    tithes: income * (percentages.tithes / 100),
    expenses: income * (percentages.expenses / 100),
    saving: income * (percentages.saving / 100),
    educationFund: income * (percentages.educationFund / 100),
    funFund: income * (percentages.funFund / 100),
    wealthFund: income * (percentages.wealthFund / 100),
  };
};

export default function SalaryIncomeScreen() {
  const [salaryIncome, setSalaryIncome] = useState('');
  const incomeContext = useContext(IncomeContext);

  if (!incomeContext) throw new Error('SalaryIncomeScreen must be used within an IncomeProvider');

  const { totalSalaryIncome, addSalaryIncome, allocationTotals, allocationPercentages, setAllocationTotals } = incomeContext;

  const handleSalaryIncomeSubmit = () => {
    const incomeValue = parseFloat(salaryIncome);
    if (!isNaN(incomeValue)) {
      addSalaryIncome(incomeValue);
      setSalaryIncome(''); // Clear input
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number for salary income.');
    }
  };

  const handleResetData = () => {
    addSalaryIncome(-totalSalaryIncome); // Reset total salary income to zero
    setAllocationTotals((prevTotals) => ({
      ...prevTotals,
      salary: {
        tithes: 0,
        expenses: 0,
        saving: 0,
        educationFund: 0,
        funFund: 0,
        wealthFund: 0,
      },
    }));
  };

  return (
    <ThemedView style={[sharedStyles.container, { backgroundColor: 'black' }]}>
      <ThemedText style={sharedStyles.header}>Salary Income</ThemedText>

      <TextInput
        style={sharedStyles.input}
        placeholder="Enter salary income"
        keyboardType="numeric"
        value={salaryIncome}
        onChangeText={setSalaryIncome}
      />

      <TouchableOpacity style={sharedStyles.button} onPress={handleSalaryIncomeSubmit}>
        <ThemedText style={sharedStyles.buttonText}>Add Salary Income</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={sharedStyles.button} onPress={handleResetData}>
        <ThemedText style={sharedStyles.buttonText}>Reset Data</ThemedText>
      </TouchableOpacity>

      <ThemedText>Total Salary Income: ${totalSalaryIncome.toFixed(2)}</ThemedText>
      <ThemedText style={sharedStyles.subHeader}>Current Total Allocations:</ThemedText>

      <ThemedView style={sharedStyles.allocationRow}>
        <ThemedText>Tithe ({allocationPercentages.salary.tithes}%):</ThemedText>
        <ThemedText>${allocationTotals.salary.tithes.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={sharedStyles.allocationRow}>
        <ThemedText>Expense ({allocationPercentages.salary.expenses}%):</ThemedText>
        <ThemedText>${allocationTotals.salary.expenses.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={sharedStyles.allocationRow}>
        <ThemedText>Saving ({allocationPercentages.salary.saving}%):</ThemedText>
        <ThemedText>${allocationTotals.salary.saving.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={sharedStyles.allocationRow}>
        <ThemedText>Education Fund ({allocationPercentages.salary.educationFund}%):</ThemedText>
        <ThemedText>${allocationTotals.salary.educationFund.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={sharedStyles.allocationRow}>
        <ThemedText>Fun Fund ({allocationPercentages.salary.funFund}%):</ThemedText>
        <ThemedText>${allocationTotals.salary.funFund.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={sharedStyles.allocationRow}>
        <ThemedText>Wealth Fund ({allocationPercentages.salary.wealthFund}%):</ThemedText>
        <ThemedText>${allocationTotals.salary.wealthFund.toFixed(2)}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
