import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { sharedStyles } from './sharedStyles';

type IncomeInputProps = {
  placeholder: string;
  onSubmit: (income: number) => void;
  onReset: () => void;
};

const IncomeInput: React.FC<IncomeInputProps> = ({ placeholder, onSubmit, onReset }) => {
  const [income, setIncome] = useState('');

  const handleIncomeSubmit = () => {
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue)) {
      onSubmit(incomeValue);
      setIncome(''); // Clear input
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number for income.');
    }
  };

  return (
    <>
      <TextInput
        style={sharedStyles.input}
        placeholder={placeholder}
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />
      <TouchableOpacity style={sharedStyles.button} onPress={handleIncomeSubmit}>
        <ThemedText style={sharedStyles.buttonText}>Add Income</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={sharedStyles.button} onPress={onReset}>
        <ThemedText style={sharedStyles.buttonText}>Reset Data</ThemedText>
      </TouchableOpacity>
    </>
  );
};

export default IncomeInput;
