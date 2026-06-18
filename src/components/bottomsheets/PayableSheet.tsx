import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomSheet, BottomSheetScrollView } from '@expo/ui/community/bottom-sheet';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../constants/colors';
import { formatINR } from '../../utils/format';
import { parties, accountSummary } from '../../data/mockData';

export const PayableSheet = forwardRef<any, { onClose: () => void }>((props, ref) => {
  const payableParties = parties.filter(p => p.netBalance < 0);
  const { total } = accountSummary.payable;

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['85%']}
      initialIndex={-1}
      handleIndicatorStyle={{ backgroundColor: Colors.surface2, width: 36, height: 4 }}
      backgroundStyle={{ backgroundColor: Colors.bg }}
    >
      <View className="px-4 pt-2 pb-2 flex-row justify-between items-center">
        <Text className="text-[17px] font-[700] text-text1">Payable</Text>
        <Pressable onPress={props.onClose} className="p-1">
          <MaterialCommunityIcons name="close" size={24} color={Colors.text2} />
        </Pressable>
      </View>

      <View className="px-4 mb-4">
        <Text className="text-[12px] font-[500] text-text3 uppercase mb-1">Total You Owe</Text>
        <Text className="text-[22px] font-[800] text-red">{formatINR(total)}</Text>
      </View>

      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        <Text className="text-[10px] font-[700] text-text3 uppercase mb-3 tracking-[1px]">
          PARTIES
        </Text>

        {payableParties.map((party) => {
          const isOverdue = party.badgeType === 'overdue';
          const isSoon = party.badgeType === 'soon';
          
          return (
            <View key={party.id} className="bg-surface border border-border rounded-[14px] p-4 mb-3 shadow-sm">
              <View className="flex-row items-center mb-4">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: party.avatarColor }}
                >
                  <Text className="text-white text-[16px] font-[700]">{party.avatarInitial}</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[15px] font-[600] text-text1">{party.name}</Text>
                    <Text className="text-[15px] font-[800] text-red">{formatINR(Math.abs(party.netBalance))}</Text>
                  </View>
                  <View className="flex-row items-center mt-0.5">
                    <Text className="text-[12px] font-[500] text-text3">{party.meta}</Text>
                    <View className={`ml-2 px-1.5 py-0.5 rounded-[4px] ${isOverdue ? 'bg-redDim' : isSoon ? 'bg-amberDim' : 'bg-greenDim'}`}>
                      <Text className={`text-[9px] font-[700] uppercase ${isOverdue ? 'text-red' : isSoon ? 'text-amber' : 'text-green'}`}>
                        {party.badgeLabel}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-2">
                <Pressable className="flex-1 bg-blue h-10 rounded-[8px] items-center justify-center">
                  <Text className="text-[14px] font-[600] text-white">Record Payment</Text>
                </Pressable>
                <Pressable className="flex-1 bg-surface2 h-10 rounded-[8px] items-center justify-center">
                  <Text className="text-[14px] font-[600] text-text1">View History</Text>
                </Pressable>
              </View>
            </View>
          );
        })}

        <Pressable className="mt-2 h-[56px] border border-dashed border-border bg-surface2 rounded-[12px] items-center justify-center">
          <Text className="text-[15px] font-[600] text-blue">+ Add Payable</Text>
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
