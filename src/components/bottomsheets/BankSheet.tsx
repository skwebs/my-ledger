import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomSheet, BottomSheetScrollView } from '@expo/ui/community/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../constants/colors';
import { formatINR } from '../../utils/format';
import { bankAccounts, accountSummary } from '../../data/mockData';

export const BankSheet = forwardRef<any, { onClose: () => void }>((props, ref) => {
  const { totalBalance } = accountSummary.banks;

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['85%']}
      initialIndex={-1}
      handleIndicatorStyle={{ backgroundColor: Colors.surface2, width: 36, height: 4 }}
      backgroundStyle={{ backgroundColor: Colors.bg }}
    >
      <View className="px-4 pt-2 pb-2 flex-row justify-between items-center">
        <Text className="text-[17px] font-[700] text-text1">Bank Accounts</Text>
        <Pressable onPress={props.onClose} className="p-1">
          <MaterialCommunityIcons name="close" size={24} color={Colors.text2} />
        </Pressable>
      </View>
      
      <View className="px-4 mb-4">
        <Text className="text-[12px] font-[500] text-text3 uppercase mb-1">Total Balance</Text>
        <Text className="text-[22px] font-[800] text-green">{formatINR(totalBalance)}</Text>
      </View>

      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        {bankAccounts.map((bank) => (
          <View key={bank.id} className="bg-surface border border-border rounded-[14px] overflow-hidden mb-4 shadow-sm">
            <LinearGradient
              colors={bank.gradientColors}
              className="p-4 h-[88px] justify-between"
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-[12px] font-[600] text-white opacity-70 uppercase tracking-[0.5px]">
                    {bank.bank}
                  </Text>
                  <Text className="text-[18px] font-[800] text-white mt-1">
                    {bank.name}
                  </Text>
                </View>
                <MaterialCommunityIcons name="bank" size={24} color="white" style={{ opacity: 0.5 }} />
              </View>
              <Text className="text-[13px] font-[500] text-white opacity-65 tracking-[2px]">
                {bank.maskedNumber}
              </Text>
            </LinearGradient>

            <View className="p-4">
              <View className="mb-4">
                <Text className="text-[12px] font-[500] text-text3 mb-1">Current Balance</Text>
                <Text className="text-[22px] font-[800] text-green">{formatINR(bank.balance)}</Text>
              </View>

              <View className="h-[1px] bg-border mb-4" />

              <Text className="text-[10px] font-[700] text-text3 uppercase mb-3 tracking-[1px]">
                June 2026 Flow
              </Text>
              
              <View className="flex-row justify-between mb-4">
                <View>
                  <Text className="text-[10px] font-[600] text-text3 mb-1">Income</Text>
                  <Text className="text-[14px] font-[700] text-green">+{formatINR(bank.monthlyInflow)}</Text>
                </View>
                <View>
                  <Text className="text-[10px] font-[600] text-text3 mb-1">Expenses</Text>
                  <Text className="text-[14px] font-[700] text-red">-{formatINR(bank.monthlyOutflow)}</Text>
                </View>
                <View>
                  <Text className="text-[10px] font-[600] text-text3 mb-1">Net</Text>
                  <Text className={`text-[14px] font-[700] ${bank.monthlyInflow >= bank.monthlyOutflow ? 'text-green' : 'text-red'}`}>
                    {bank.monthlyInflow >= bank.monthlyOutflow ? '+' : ''}{formatINR(bank.monthlyInflow - bank.monthlyOutflow)}
                  </Text>
                </View>
              </View>

              <View className="h-[1px] bg-border mb-4" />

              <View className="flex-row justify-between items-center py-2 border-b border-border">
                <Text className="text-[13px] font-[500] text-text2">Account Type</Text>
                <Text className="text-[13px] font-[600] text-text1">{bank.accountType}</Text>
              </View>
              <View className="flex-row justify-between items-center py-2 border-b border-border mb-4">
                <Text className="text-[13px] font-[500] text-text2">IFSC Code</Text>
                <Text className="text-[13px] font-[600] text-text1 uppercase">{bank.ifsc}</Text>
              </View>

              <View className="flex-row gap-2">
                <Pressable className="flex-1 bg-blue h-10 rounded-[8px] items-center justify-center">
                  <Text className="text-[14px] font-[600] text-white">Transfer</Text>
                </Pressable>
                <Pressable className="flex-1 bg-surface2 h-10 rounded-[8px] items-center justify-center">
                  <Text className="text-[14px] font-[600] text-text1">View Transactions</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        <Pressable className="mt-2 h-[56px] border border-dashed border-border bg-surface2 rounded-[12px] items-center justify-center">
          <Text className="text-[15px] font-[600] text-blue">+ Add Bank Account</Text>
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
