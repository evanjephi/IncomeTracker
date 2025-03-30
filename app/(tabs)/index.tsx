import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { IncomeContext } from '../IncomeContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sharedStyles } from '../../components/sharedStyles';
import AllocationGraph from '../../components/AllocationGraph';

const Index = () => {
  const incomeContext = useContext(IncomeContext);

  if (!incomeContext) {
    throw new Error('Index must be used within an IncomeProvider');
  }

  const { totalBusinessIncome, totalSalaryIncome, allocationTotals, allocationPercentages, savedData, saveCurrentData } = incomeContext;
  const totalIncome = totalBusinessIncome + totalSalaryIncome;
  const combinedAllocations = {
    tithes: allocationTotals.business.tithe + allocationTotals.salary.tithes,
    expenses: allocationTotals.salary.expenses + allocationTotals.business.expenses,
    saving: allocationTotals.salary.saving,
    educationFund: allocationTotals.business.educationFund + allocationTotals.salary.educationFund,
    businessFund: allocationTotals.business.businessFund,
    funFund: allocationTotals.business.funFund + allocationTotals.salary.funFund,
    wealthFund: allocationTotals.business.wealthFund + allocationTotals.salary.wealthFund,
  };

  const [isBusinessVisible, setIsBusinessVisible] = useState(false);
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);
  const [isCombinedVisible, setIsCombinedVisible] = useState(false);
  const [isGraphVisible, setIsGraphVisible] = useState(false);

  const toggleVisibility = (section: 'business' | 'salary' | 'combined' | 'graph') => {
    if (section === 'business') setIsBusinessVisible(!isBusinessVisible);
    if (section === 'salary') setIsSalaryVisible(!isSalaryVisible);
    if (section === 'combined') setIsCombinedVisible(!isCombinedVisible);
    if (section === 'graph') setIsGraphVisible(!isGraphVisible);
  };

  const combinedAllocationData = {
    labels: ['Tithes', 'Expenses', 'Saving', 'Education Fund', 'Business Fund', 'Fun Fund', 'Wealth Fund'],
    values: [
      combinedAllocations.tithes,
      combinedAllocations.expenses,
      combinedAllocations.saving,
      combinedAllocations.educationFund,
      combinedAllocations.businessFund,
      combinedAllocations.funFund,
      combinedAllocations.wealthFund,
    ],
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={sharedStyles.container}>
        <ThemedText style={[sharedStyles.header]}>Income Summary Report</ThemedText>
        <ThemedText style={[sharedStyles.subHeader]}>Total Income</ThemedText>
        <ThemedText style={[sharedStyles.total]}>Business Income: ${totalBusinessIncome.toFixed(2)}</ThemedText>
        <ThemedText style={[sharedStyles.total]}>Salary Income: ${totalSalaryIncome.toFixed(2)}</ThemedText>
        <ThemedText style={[sharedStyles.total, { fontWeight: 'bold' }]}>Overall Total Income: ${totalIncome.toFixed(2)}</ThemedText>
        <TouchableOpacity onPress={saveCurrentData} style={[sharedStyles.button]}>
          <ThemedText style={[sharedStyles.buttonText]}>Save All Data</ThemedText>
        </TouchableOpacity>
        
        <ThemedText style={[sharedStyles.subHeader]}>Uptodate Business Income Data:</ThemedText>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Tithe:</ThemedText>
          <ThemedText>${savedData.business.tithe.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Expenses:</ThemedText>
          <ThemedText>${savedData.business.expenses.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Education Fund:</ThemedText>
          <ThemedText>${savedData.business.educationFund.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Business Fund:</ThemedText>
          <ThemedText>${savedData.business.businessFund.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Fun Fund:</ThemedText>
          <ThemedText>${savedData.business.funFund.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Wealth Fund:</ThemedText>
          <ThemedText>${savedData.business.wealthFund.toFixed(2)}</ThemedText>
        </ThemedView>

        <ThemedText style={[sharedStyles.subHeader]}>Uptodate Salary Income Data:</ThemedText> 
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Tithe:</ThemedText>
          <ThemedText>${savedData.salary.tithes.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Expenses:</ThemedText>
          <ThemedText>${savedData.salary.expenses.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Saving:</ThemedText>
          <ThemedText>${savedData.salary.saving.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Education Fund:</ThemedText>
          <ThemedText>${savedData.salary.educationFund.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Fun Fund:</ThemedText>
          <ThemedText>${savedData.salary.funFund.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Wealth Fund:</ThemedText>
          <ThemedText>${savedData.salary.wealthFund.toFixed(2)}</ThemedText>
        </ThemedView>
        <TouchableOpacity onPress={() => toggleVisibility('business')} style={[sharedStyles.collapsibleHeader]}>
          <ThemedText style={[sharedStyles.collapsibleHeaderText]}>Business Income Allocations</ThemedText>
        </TouchableOpacity>
        {isBusinessVisible && (
          <ThemedView style={sharedStyles.collapsibleContent}>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Tithe ({allocationPercentages.business.tithe}%):</ThemedText>
              <ThemedText>${allocationTotals.business.tithe.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Expense ({allocationPercentages.business.expenses}%):</ThemedText>
              <ThemedText>${allocationTotals.business.expenses.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Education Fund ({allocationPercentages.business.educationFund}%):</ThemedText>
              <ThemedText>${allocationTotals.business.educationFund.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Business Fund ({allocationPercentages.business.businessFund}%):</ThemedText>
              <ThemedText>${allocationTotals.business.businessFund.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Fun Fund ({allocationPercentages.business.funFund}%):</ThemedText>
              <ThemedText>${allocationTotals.business.funFund.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Wealth Fund ({allocationPercentages.business.wealthFund}%):</ThemedText>
              <ThemedText>${allocationTotals.business.wealthFund.toFixed(2)}</ThemedText>
            </ThemedView>
          </ThemedView>
        )}
        <TouchableOpacity onPress={() => toggleVisibility('salary')} style={[sharedStyles.collapsibleHeader]}>
          <ThemedText style={[sharedStyles.collapsibleHeaderText]}>Salary Income Allocations</ThemedText>
        </TouchableOpacity>
        {isSalaryVisible && (
          <ThemedView style={sharedStyles.collapsibleContent}>
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
              <ThemedText>Debt ({allocationPercentages.salary.funFund}%):</ThemedText>
              <ThemedText>${allocationTotals.salary.funFund.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Wealth Fund ({allocationPercentages.salary.wealthFund}%):</ThemedText>
              <ThemedText>${allocationTotals.salary.wealthFund.toFixed(2)}</ThemedText>
            </ThemedView>
          </ThemedView>
        )}
        <TouchableOpacity onPress={() => toggleVisibility('combined')} style={[sharedStyles.collapsibleHeader]}>
          <ThemedText style={[sharedStyles.collapsibleHeaderText]}>Combined Allocations</ThemedText>
        </TouchableOpacity>
        {isCombinedVisible && (
          <ThemedView style={sharedStyles.collapsibleContent}>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Tithes:</ThemedText>
              <ThemedText>${combinedAllocations.tithes.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Expenses:</ThemedText>
              <ThemedText>${combinedAllocations.expenses.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Saving:</ThemedText>
              <ThemedText>${combinedAllocations.saving.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Education Fund:</ThemedText>
              <ThemedText>${combinedAllocations.educationFund.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Business Fund:</ThemedText>
              <ThemedText>${combinedAllocations.businessFund.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Fun Fund & Debt:</ThemedText>
              <ThemedText>${combinedAllocations.funFund.toFixed(2)}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.allocationRow}>
              <ThemedText>Wealth Fund:</ThemedText>
              <ThemedText>${combinedAllocations.wealthFund.toFixed(2)}</ThemedText>
            </ThemedView>
          </ThemedView>
        )}
        <TouchableOpacity onPress={() => toggleVisibility('graph')} style={[sharedStyles.collapsibleHeader]}>
          <ThemedText style={[sharedStyles.collapsibleHeaderText]}>Graph</ThemedText>
        </TouchableOpacity>
        {isGraphVisible && (
          <ThemedView style={sharedStyles.collapsibleContent}>
            <AllocationGraph data={combinedAllocationData} />
          </ThemedView>
        )}
      </ThemedView>
    </ScrollView>
  );
};

export default Index;
