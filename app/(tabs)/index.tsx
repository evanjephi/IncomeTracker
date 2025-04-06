import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, FlatList, View, Dimensions, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { IncomeContext } from '../IncomeContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sharedStyles } from '../../components/sharedStyles';
import AllocationGraph from '../../components/AllocationGraph';
import SavedDataPieChart from '../components/SavedDataPieChart';

const Index = () => {
  const incomeContext = useContext(IncomeContext);

  if (!incomeContext) {
    throw new Error('Index must be used within an IncomeProvider');
  }

  const { totalBusinessIncome, totalSalaryIncome, allocationTotals, allocationPercentages, savedData, saveCurrentData, savedTotalBusinessIncome, savedTotalSalaryIncome, resetSavedData } = incomeContext;
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

  const combinedSavedAllocations = {
    tithes: savedData.business.tithe + savedData.salary.tithes,
    expenses: savedData.business.expenses + savedData.salary.expenses,
    saving: savedData.salary.saving,
    businessFund: savedData.business.businessFund,
    educationFund: savedData.business.educationFund + savedData.salary.educationFund,
    funFund: savedData.business.funFund + savedData.salary.funFund,
    wealthFund: savedData.business.wealthFund + savedData.salary.wealthFund,
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

  const pieChartData = [
    {
      title: 'Business Income Saved Data',
      data: {
        tithes: savedData.business.tithe,
        expenses: savedData.business.expenses,
        educationFund: savedData.business.educationFund,
        businessFund: savedData.business.businessFund,
        funFund: savedData.business.funFund,
        wealthFund: savedData.business.wealthFund,
      },
    },
    {
      title: 'Salary Income Saved Data',
      data: {
        tithes: savedData.salary.tithes,
        expenses: savedData.salary.expenses,
        saving: savedData.salary.saving,
        educationFund: savedData.salary.educationFund,
        funFund: savedData.salary.funFund,
        wealthFund: savedData.salary.wealthFund,
      },
    },
    {
      title: 'Combined Saved Data',
      data: combinedSavedAllocations,
    },
  ];

  const renderPieChart = ({ item, index }: { item: { title: string; data: any }; index: number }) => (
    <View
      style={{
        width: Dimensions.get('window').width,
        paddingTop: 20,
      }}
    >
      <ThemedText style={[sharedStyles.subHeader]}>{item.title}</ThemedText>
      <SavedDataPieChart title={item.title} data={item.data} />
    </View>
  );

  const handleResetSavedData = () => {
    Alert.alert(
      'Reset Saved Data',
      'Are you sure you want to reset all saved data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => resetSavedData(),
        },
      ]
    );
  };

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h1>Saved Data Report</h1>
          <h2>Business Income</h2>
          <table>
            <tr><th>Category</th><th>Amount</th></tr>
            <tr><td>Tithe</td><td>${savedData.business.tithe.toFixed(2)}</td></tr>
            <tr><td>Expenses</td><td>${savedData.business.expenses.toFixed(2)}</td></tr>
            <tr><td>Education Fund</td><td>${savedData.business.educationFund.toFixed(2)}</td></tr>
            <tr><td>Business Fund</td><td>${savedData.business.businessFund.toFixed(2)}</td></tr>
            <tr><td>Fun Fund</td><td>${savedData.business.funFund.toFixed(2)}</td></tr>
            <tr><td>Wealth Fund</td><td>${savedData.business.wealthFund.toFixed(2)}</td></tr>
          </table>
          <h2>Salary Income</h2>
          <table>
            <tr><th>Category</th><th>Amount</th></tr>
            <tr><td>Tithe</td><td>${savedData.salary.tithes.toFixed(2)}</td></tr>
            <tr><td>Expenses</td><td>${savedData.salary.expenses.toFixed(2)}</td></tr>
            <tr><td>Saving</td><td>${savedData.salary.saving.toFixed(2)}</td></tr>
            <tr><td>Education Fund</td><td>${savedData.salary.educationFund.toFixed(2)}</td></tr>
            <tr><td>Fun Fund</td><td>${savedData.salary.funFund.toFixed(2)}</td></tr>
            <tr><td>Wealth Fund</td><td>${savedData.salary.wealthFund.toFixed(2)}</td></tr>
          </table>
          <h2>Combined Saved Data</h2>
          <table>
            <tr><th>Category</th><th>Amount</th></tr>
            <tr><td>Tithe</td><td>${combinedSavedAllocations.tithes.toFixed(2)}</td></tr>
            <tr><td>Expenses</td><td>${combinedSavedAllocations.expenses.toFixed(2)}</td></tr>
            <tr><td>Saving</td><td>${combinedSavedAllocations.saving.toFixed(2)}</td></tr>
            <tr><td>Education Fund</td><td>${combinedSavedAllocations.educationFund.toFixed(2)}</td></tr>
            <tr><td>Business Fund</td><td>${combinedSavedAllocations.businessFund.toFixed(2)}</td></tr>
            <tr><td>Fun Fund</td><td>${combinedSavedAllocations.funFund.toFixed(2)}</td></tr>
            <tr><td>Wealth Fund</td><td>${combinedSavedAllocations.wealthFund.toFixed(2)}</td></tr>
          </table>
          <h2>Total Saved Income</h2>
          <p>Business Income: $${savedTotalBusinessIncome.toFixed(2)}</p>
          <p>Salary Income: $${savedTotalSalaryIncome.toFixed(2)}</p>
        </body>
      </html>
    `;

    try {
      // Generate the PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        // Share the PDF file
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Sharing Not Available', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={sharedStyles.container}>
        <ThemedText style={[sharedStyles.header]}>Income Summary Report</ThemedText>
        <ThemedText style={[sharedStyles.subHeader]}>Total Income</ThemedText>
        <ThemedText style={[sharedStyles.total]}>Business Income: ${totalBusinessIncome.toFixed(2)}</ThemedText>
        <ThemedText style={[sharedStyles.total]}>Salary Income: ${totalSalaryIncome.toFixed(2)}</ThemedText>
        <ThemedText style={[sharedStyles.total, { fontWeight: 'bold' }]}>Overall Total Income: ${totalIncome.toFixed(2)}</ThemedText>

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

        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Total Over All Business Income:</ThemedText>
          <ThemedText>${savedTotalBusinessIncome.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={sharedStyles.allocationRow}>
          <ThemedText>Total Over All Salary Income:</ThemedText>
          <ThemedText>${savedTotalSalaryIncome.toFixed(2)}</ThemedText>
        </ThemedView>

        <TouchableOpacity
          onPress={saveCurrentData}
          style={[sharedStyles.button, { backgroundColor: '#006400' }]} // Dark green color
        >
          <ThemedText style={[sharedStyles.buttonText]}>Save All Data</ThemedText>
        </TouchableOpacity>

        <FlatList
          data={pieChartData}
          renderItem={renderPieChart}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />

        <TouchableOpacity
          onPress={generatePDF}
          style={[sharedStyles.button, { backgroundColor: '#0075be' }]} // Blue color for PDF button
        >
          <ThemedText style={[sharedStyles.buttonText]}>Generate Report</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResetSavedData}
          style={[sharedStyles.button, { backgroundColor: '#FF0000' }]} // Red color for reset button
        >
          <ThemedText style={[sharedStyles.buttonText]}>Reset Saved Data</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
};

export default Index;
