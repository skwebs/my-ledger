import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomSheet } from '@expo/ui/community/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../constants/colors';
import { formatINR } from '../../utils/format';
import { cashData } from '../../data/mockData';

export const CashSheet = forwardRef<any, { onClose: () => void }>((props, ref) => {
  return (
    <BottomSheet
      ref={ref}
      snapPoints={['55%']}
      initialIndex={-1}
      handleIndicatorStyle={{ backgroundColor: Colors.surface2, width: 36, height: 4 }}
      backgroundStyle={{ backgroundColor: Colors.bg }}
    >
      <View className="px-4 pt-2 pb-4 flex-row justify-between items-center">
        <Text className="text-[17px] font-[700] text-text1">Cash Account</Text>
        <Pressable onPress={props.onClose} className="p-1">
          <MaterialCommunityIcons name="close" size={24} color={Colors.text2} />
        </Pressable>
      </View>

      <View className="px-4 mb-6">
        <LinearGradient
          colors={Colors.cashGrad}
          className="rounded-[16px] p-5 h-[120px] justify-between shadow-md"
        >
          <View>
            <Text className="text-[14px] font-[600] text-white opacity-80 uppercase tracking-[1px]">
              Physical Cash
            </Text>
            <Text className="text-[20px] font-[800] text-white mt-1">
              Cash in Hand
            </Text>
          </View>
          <Text className="text-[12px] font-[500] text-white opacity-70">
            Last updated: {cashData.lastUpdated}
          </Text>
        </LinearGradient>
      </View>

      <View className="px-6 mb-6">
        <View className="flex-row justify-between items-end mb-6">
          <View>
            <Text className="text-[14px] font-[500] text-text3 mb-1">Cash in Hand</Text>
            <Text className="text-[32px] font-[800] text-amber">{formatINR(cashData.balance)}</Text>
          </View>
          <MaterialCommunityIcons name="cash-multiple" size={40} color={Colors.amber} style={{ opacity: 0.2 }} />
        </View>

        <Text className="text-[10px] font-[700] text-text3 uppercase mb-4 tracking-[1px]">
          June 2026 Flow
        </Text>

        <View className="flex-row justify-between bg-surface p-4 rounded-[14px] border border-border shadow-sm">
          <View className="items-center flex-1 border-r border-border">
            <Text className="text-[10px] font-[600] text-text3 mb-1">Cash In</Text>
            <Text className="text-[16px] font-[700] text-green">+{formatINR(cashData.monthlyIn)}</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-[10px] font-[600] text-text3 mb-1">Cash Out</Text>
            <Text className="text-[16px] font-[700] text-red">-{formatINR(cashData.monthlyOut)}</Text>
          </View>
        </View>
      </View>

      <View className="px-4 mt-auto pb-10">
        <Pressable className="bg-blue h-[56px] rounded-[14px] items-center justify-center shadow-md">
          <Text className="text-[16px] font-[700] text-white">Update Balance</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
});
