// IncomeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for the income allocations

export type BusinessAllocation = {
  tithe: number;
  expenses: number;
  educationFund: number;
  businessFund: number;
  funFund: number;
  wealthFund: number;
};

export type SalaryAllocation = {
  tithes: number;
  expenses: number;
  saving: number;
  educationFund: number;
  funFund: number;
  wealthFund: number;
};

type AllocationTotals = {
  business: BusinessAllocation;
  salary: SalaryAllocation;
};

type AllocationPercentages = {
  business: BusinessAllocation;
  salary: SalaryAllocation;
};

type IncomeContextType = {
  totalBusinessIncome: number;
  setTotalBusinessIncome: React.Dispatch<React.SetStateAction<number>>;
  totalSalaryIncome: number;
  setTotalSalaryIncome: React.Dispatch<React.SetStateAction<number>>;
  allocationTotals: AllocationTotals;
  setAllocationTotals: React.Dispatch<React.SetStateAction<AllocationTotals>>;
  allocationPercentages: AllocationPercentages;
  setAllocationPercentages: React.Dispatch<React.SetStateAction<AllocationPercentages>>;
  savedData: AllocationTotals;
  savedTotalBusinessIncome: number;
  savedTotalSalaryIncome: number;
  saveCurrentData: () => void;
  resetData: () => void;
  addBusinessIncome: (income: number) => void;
  addSalaryIncome: (income: number) => void;
};

// Initialize the context with undefined to enforce provider usage
export const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

type IncomeProviderProps = {
  children: ReactNode;
};

export const IncomeProvider: React.FC<IncomeProviderProps> = ({ children }) => {
  const [totalBusinessIncome, setTotalBusinessIncome] = useState<number>(0);
  const [totalSalaryIncome, setTotalSalaryIncome] = useState<number>(0);
  const [newBusinessIncome, setNewBusinessIncome] = useState<number>(0); // Track new business income
  const [newSalaryIncome, setNewSalaryIncome] = useState<number>(0); // Track new salary income
  const [allocationTotals, setAllocationTotals] = useState<AllocationTotals>({
    business: { tithe: 0, expenses: 0, educationFund: 0, businessFund: 0, funFund: 0, wealthFund: 0 },
    salary: { tithes: 0, expenses: 0, saving: 0, educationFund: 0, funFund: 0, wealthFund: 0 },
  });
  const [allocationPercentages, setAllocationPercentages] = useState<AllocationPercentages>({
    business: { tithe: 10, expenses: 10, educationFund: 10, businessFund: 10, funFund: 10, wealthFund: 10 },
    salary: { tithes: 10, expenses: 70, saving: 5, educationFund: 5, funFund: 5, wealthFund: 5 },
  });
  const [savedData, setSavedData] = useState<AllocationTotals>({
    business: { tithe: 0, expenses: 0, educationFund: 0, businessFund: 0, funFund: 0, wealthFund: 0 },
    salary: { tithes: 0, expenses: 0, saving: 0, educationFund: 0, funFund: 0, wealthFund: 0 },
  });
  const [savedTotalBusinessIncome, setSavedTotalBusinessIncome] = useState<number>(0);
  const [savedTotalSalaryIncome, setSavedTotalSalaryIncome] = useState<number>(0);
  const [isBusinessDataSaved, setIsBusinessDataSaved] = useState(false);
  const [isSalaryDataSaved, setIsSalaryDataSaved] = useState(false);

  const saveCurrentData = () => {
    setSavedData((prevSavedData) => ({
      business: {
        tithe: prevSavedData.business.tithe + newBusinessIncome * (allocationPercentages.business.tithe / 100),
        expenses: prevSavedData.business.expenses + newBusinessIncome * (allocationPercentages.business.expenses / 100),
        educationFund: prevSavedData.business.educationFund + newBusinessIncome * (allocationPercentages.business.educationFund / 100),
        businessFund: prevSavedData.business.businessFund + newBusinessIncome * (allocationPercentages.business.businessFund / 100),
        funFund: prevSavedData.business.funFund + newBusinessIncome * (allocationPercentages.business.funFund / 100),
        wealthFund: prevSavedData.business.wealthFund + newBusinessIncome * (allocationPercentages.business.wealthFund / 100),
      },
      salary: {
        tithes: prevSavedData.salary.tithes + newSalaryIncome * (allocationPercentages.salary.tithes / 100),
        expenses: prevSavedData.salary.expenses + newSalaryIncome * (allocationPercentages.salary.expenses / 100),
        saving: prevSavedData.salary.saving + newSalaryIncome * (allocationPercentages.salary.saving / 100),
        educationFund: prevSavedData.salary.educationFund + newSalaryIncome * (allocationPercentages.salary.educationFund / 100),
        funFund: prevSavedData.salary.funFund + newSalaryIncome * (allocationPercentages.salary.funFund / 100),
        wealthFund: prevSavedData.salary.wealthFund + newSalaryIncome * (allocationPercentages.salary.wealthFund / 100),
      },
    }));

    setSavedTotalBusinessIncome((prev) => prev + newBusinessIncome); // Add only the new business income
    setSavedTotalSalaryIncome((prev) => prev + newSalaryIncome); // Add only the new salary income

    setNewBusinessIncome(0); // Reset new business income
    setNewSalaryIncome(0); // Reset new salary income
  };

  const addBusinessIncome = (income: number) => {
    setTotalBusinessIncome((prev) => prev + income);
    setNewBusinessIncome((prev) => prev + income); // Track new business income
    setAllocationTotals((prevTotals) => ({
      ...prevTotals,
      business: {
        tithe: prevTotals.business.tithe + income * (allocationPercentages.business.tithe / 100),
        expenses: prevTotals.business.expenses + income * (allocationPercentages.business.expenses / 100),
        educationFund: prevTotals.business.educationFund + income * (allocationPercentages.business.educationFund / 100),
        businessFund: prevTotals.business.businessFund + income * (allocationPercentages.business.businessFund / 100),
        funFund: prevTotals.business.funFund + income * (allocationPercentages.business.funFund / 100),
        wealthFund: prevTotals.business.wealthFund + income * (allocationPercentages.business.wealthFund / 100),
      },
    }));
    setIsBusinessDataSaved(false); // Allow saving new business data
  };

  const addSalaryIncome = (income: number) => {
    setTotalSalaryIncome((prev) => prev + income);
    setNewSalaryIncome((prev) => prev + income); // Track new salary income
    setAllocationTotals((prevTotals) => ({
      ...prevTotals,
      salary: {
        tithes: prevTotals.salary.tithes + income * (allocationPercentages.salary.tithes / 100),
        expenses: prevTotals.salary.expenses + income * (allocationPercentages.salary.expenses / 100),
        saving: prevTotals.salary.saving + income * (allocationPercentages.salary.saving / 100),
        educationFund: prevTotals.salary.educationFund + income * (allocationPercentages.salary.educationFund / 100),
        funFund: prevTotals.salary.funFund + income * (allocationPercentages.salary.funFund / 100),
        wealthFund: prevTotals.salary.wealthFund + income * (allocationPercentages.salary.wealthFund / 100),
      },
    }));
    setIsSalaryDataSaved(false); // Allow saving new salary data
  };

  const resetData = () => {
    setTotalBusinessIncome(0);
    setTotalSalaryIncome(0);
    setAllocationTotals({
      business: { tithe: 0, expenses: 0, educationFund: 0, businessFund: 0, funFund: 0, wealthFund: 0 },
      salary: { tithes: 0, expenses: 0, saving: 0, educationFund: 0, funFund: 0, wealthFund: 0 },
    });
    setIsBusinessDataSaved(false); // Allow saving new data after reset
    setIsSalaryDataSaved(false); // Allow saving new data after reset
  };

  // Load data from AsyncStorage on app startup
  useEffect(() => {
    const loadData = async () => {
      try {
        const businessIncome = await AsyncStorage.getItem('totalBusinessIncome');
        const salaryIncome = await AsyncStorage.getItem('totalSalaryIncome');
        const allocations = await AsyncStorage.getItem('allocationTotals');

        if (businessIncome) setTotalBusinessIncome(parseFloat(businessIncome));
        if (salaryIncome) setTotalSalaryIncome(parseFloat(salaryIncome));
        if (allocations) {
          const parsedAllocations = JSON.parse(allocations);
          // Ensure parsedAllocations has business and salary with all necessary properties
          setAllocationTotals({
            business: {
              tithe: parsedAllocations.business?.tithe ?? 0,
              expenses: parsedAllocations.business?.expenses ?? 0,
              educationFund: parsedAllocations.business?.educationFund ?? 0,
              businessFund: parsedAllocations.business?.businessFund ?? 0,
              funFund: parsedAllocations.business?.funFund ?? 0,
              wealthFund: parsedAllocations.business?.wealthFund ?? 0,
            },
            salary: {
              tithes: parsedAllocations.salary?.tithes ?? 0,
              expenses: parsedAllocations.salary?.expenses ?? 0,
              saving: parsedAllocations.salary?.saving ?? 0,
              educationFund: parsedAllocations.salary?.educationFund ?? 0,
              funFund: parsedAllocations.salary?.funFund ?? 0,
              wealthFund: parsedAllocations.salary?.wealthFund ?? 0,
            },
          });
        }
      } catch (error) {
        console.error("Error loading data from storage", error);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('totalBusinessIncome', totalBusinessIncome.toString());
        await AsyncStorage.setItem('totalSalaryIncome', totalSalaryIncome.toString());
        await AsyncStorage.setItem('allocationTotals', JSON.stringify(allocationTotals));
      } catch (error) {
        console.error("Error saving data to storage", error);
      }
    };
    saveData();
  }, [totalBusinessIncome, totalSalaryIncome, allocationTotals]);

  return (
    <IncomeContext.Provider
      value={{
        totalBusinessIncome,
        setTotalBusinessIncome,
        totalSalaryIncome,
        setTotalSalaryIncome,
        allocationTotals,
        setAllocationTotals,
        allocationPercentages,
        setAllocationPercentages,
        savedData,
        savedTotalBusinessIncome,
        savedTotalSalaryIncome,
        saveCurrentData,
        resetData,
        addBusinessIncome,
        addSalaryIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};


