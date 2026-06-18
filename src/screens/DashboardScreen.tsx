import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../constants/colors';
import { budgetData } from '../data/mockData';
import { BudgetCard } from '../components/BudgetCard';
import { AccountsSection } from '../components/accounts/AccountsSection';
import { CreditCardSheet } from '../components/bottomsheets/CreditCardSheet';
import { BankSheet } from '../components/bottomsheets/BankSheet';
import { CashSheet } from '../components/bottomsheets/CashSheet';
import { PayableSheet } from '../components/bottomsheets/PayableSheet';
import { ReceivableSheet } from '../components/bottomsheets/ReceivableSheet';

export default function DashboardScreen() {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  
  const ccSheetRef = useRef<any>(null);
  const bankSheetRef = useRef<any>(null);
  const cashSheetRef = useRef<any>(null);
  const payableSheetRef = useRef<any>(null);
  const receivableSheetRef = useRef<any>(null);

  const openSheet = (name: string, ref: React.RefObject<any>) => {
    setActiveSheet(name);
    // Use a small timeout to ensure the sheet is mounted before expanding
    setTimeout(() => {
      ref.current?.expand();
    }, 50);
  };

  const closeSheet = (ref: React.RefObject<any>) => {
    ref.current?.close();
    setTimeout(() => {
      setActiveSheet(null);
    }, 300);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']} style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View className="flex-row justify-between items-center px-5 py-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-blue rounded-full items-center justify-center mr-3 shadow-sm">
            <Text className="text-white font-dm-extrabold text-[18px]">S</Text>
          </View>
          <View>
            <Text className="text-text3 text-[12px] font-dm-medium">Good Morning,</Text>
            <Text className="text-text1 text-[16px] font-dm-bold">Satish</Text>
          </View>
        </View>
        <Pressable className="w-10 h-10 bg-surface border border-border rounded-full items-center justify-center shadow-sm">
          <MaterialCommunityIcons name="bell-outline" size={20} color={Colors.text1} />
        </Pressable>
      </View>

      <ScrollView 
        className="flex-1"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, flexGrow: 1 }}
      >
        <Text className="text-center text-text3 py-2">--- Dashboard Content ---</Text>
        <BudgetCard data={budgetData} />
        
        <AccountsSection
          onCreditCardPress={() => openSheet('cc', ccSheetRef)}
          onBankPress={() => openSheet('bank', bankSheetRef)}
          onCashPress={() => openSheet('cash', cashSheetRef)}
          onPayablePress={() => openSheet('payable', payableSheetRef)}
          onReceivablePress={() => openSheet('receivable', receivableSheetRef)}
        />

        <View className="px-5">
           <Text className="text-[12px] font-dm-bold text-text3 uppercase tracking-[1px] mb-4">
            QUICK ACTIONS
          </Text>
          <View className="flex-row gap-3">
            <Pressable className="flex-1 bg-surface border border-border p-4 rounded-[16px] items-center shadow-sm">
              <View className="w-10 h-10 bg-blueDim rounded-full items-center justify-center mb-2">
                 <MaterialCommunityIcons name="plus" size={24} color={Colors.blue} />
              </View>
              <Text className="text-[12px] font-dm-semibold text-text1">Add Expense</Text>
            </Pressable>
            <Pressable className="flex-1 bg-surface border border-border p-4 rounded-[16px] items-center shadow-sm">
              <View className="w-10 h-10 bg-greenDim rounded-full items-center justify-center mb-2">
                 <MaterialCommunityIcons name="bank-transfer" size={24} color={Colors.green} />
              </View>
              <Text className="text-[12px] font-dm-semibold text-text1">Transfer</Text>
            </Pressable>
            <Pressable className="flex-1 bg-surface border border-border p-4 rounded-[16px] items-center shadow-sm">
              <View className="w-10 h-10 bg-purpleDim rounded-full items-center justify-center mb-2">
                 <MaterialCommunityIcons name="chart-arc" size={24} color={Colors.purple} />
              </View>
              <Text className="text-[12px] font-dm-semibold text-text1">Insights</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sheets - Only render the active one to prevent stacking and ensure initialIndex={-1} behavior */}
      {activeSheet === 'cc' && (
        <CreditCardSheet ref={ccSheetRef} onClose={() => closeSheet(ccSheetRef)} />
      )}
      {activeSheet === 'bank' && (
        <BankSheet ref={bankSheetRef} onClose={() => closeSheet(bankSheetRef)} />
      )}
      {activeSheet === 'cash' && (
        <CashSheet ref={cashSheetRef} onClose={() => closeSheet(cashSheetRef)} />
      )}
      {activeSheet === 'payable' && (
        <PayableSheet ref={payableSheetRef} onClose={() => closeSheet(payableSheetRef)} />
      )}
      {activeSheet === 'receivable' && (
        <ReceivableSheet ref={receivableSheetRef} onClose={() => closeSheet(receivableSheetRef)} />
      )}
    </SafeAreaView>
  );
}
