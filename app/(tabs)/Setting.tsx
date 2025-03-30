import React, { useEffect, useState, useContext } from 'react';
import { Alert, BackHandler, Platform, TextInput, ScrollView, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sharedStyles } from '../../components/sharedStyles';
import { IncomeContext, BusinessAllocation, SalaryAllocation } from '../IncomeContext';

const Settings = () => {
  const [hasData, setHasData] = useState(false);

  const incomeContext = useContext(IncomeContext);
  if (!incomeContext) throw new Error('Settings must be used within an IncomeProvider');
  const { allocationPercentages, setAllocationPercentages } = incomeContext;

  const [businessAllocations, setBusinessAllocations] = useState<BusinessAllocation>(allocationPercentages.business);
  const [salaryAllocations, setSalaryAllocations] = useState<SalaryAllocation>(allocationPercentages.salary);

  // Fetch data from AsyncStorage
  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('incomeData');
      setHasData(!!data);  // Set state based on data existence
    } catch (error) {
      console.error("Error fetching previous data:", error);
    }
  };

  // Run the fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle clearing of the data
  const handleClearData = async () => {
    try {
      // Reset state immediately to reflect cleared data
      setHasData(false);

      // Clear AsyncStorage asynchronously
      await AsyncStorage.clear();

      // Optionally, you can re-fetch the data (it should be empty now)
      await fetchData();

      Alert.alert("Data Reset", "All data has been cleared. Please exit and open app to start fresh!");
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  // Handle app exit for Android
  const handleExitApp = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Alert.alert("Exit App", "This feature is only available on Android.");
    }
  };

  const handlePercentageChange = (type: 'business' | 'salary', field: keyof BusinessAllocation | keyof SalaryAllocation, value: string) => {
    const newValue = value === '' ? 0 : parseFloat(value);
    if (!isNaN(newValue)) {
      if (type === 'business') {
        setBusinessAllocations((prev) => ({
          ...prev,
          [field]: newValue,
        }));
      } else {
        setSalaryAllocations((prev) => ({
          ...prev,
          [field]: newValue,
        }));
      }
    }
  };

  const handleSubmit = () => {
    setAllocationPercentages({
      business: businessAllocations,
      salary: salaryAllocations,
    });
    Alert.alert("Success", "Allocation percentages have been updated.");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={sharedStyles.container}>
        <ThemedText style={sharedStyles.header}>Settings</ThemedText>
        
        <TouchableOpacity style={sharedStyles.button} onPress={handleClearData}>
          <ThemedText style={sharedStyles.buttonText}>Clear All Data</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={sharedStyles.button} onPress={handleExitApp}>
          <ThemedText style={sharedStyles.buttonText}>Exit App</ThemedText>
        </TouchableOpacity>

        <ThemedText style={sharedStyles.header}>Allocation Percentages</ThemedText>
        <ThemedText style={sharedStyles.subHeader}>Business</ThemedText>
        {Object.keys(businessAllocations).map((key) => (
          <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ThemedText style={{ flex: 1 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</ThemedText>
            <TextInput
              style={[sharedStyles.input, { flex: 0.5, textAlign: 'right' }]} // Adjust flex to make the input smaller
             
              keyboardType="numeric"
              value={businessAllocations[key as keyof BusinessAllocation].toString()}
              onChangeText={(value) => handlePercentageChange('business', key as keyof BusinessAllocation, value)}
            />
          </View>
        ))}
        <ThemedText style={sharedStyles.subHeader}>Salary</ThemedText>
        {Object.keys(salaryAllocations).map((key) => (
          <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ThemedText style={{ flex: 1 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</ThemedText>
            <TextInput
              style={[sharedStyles.input, { flex: 0.5, textAlign: 'right' }]} // Adjust flex to make the input smaller
             
              keyboardType="numeric"
              value={salaryAllocations[key as keyof SalaryAllocation].toString()}
              onChangeText={(value) => handlePercentageChange('salary', key as keyof SalaryAllocation, value)}
            />
          </View>
        ))}
        <TouchableOpacity style={sharedStyles.button} onPress={handleSubmit}>
          <ThemedText style={sharedStyles.buttonText}>Submit</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
};

export default Settings;
