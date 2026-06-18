import React, { forwardRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomSheet, BottomSheetScrollView, BottomSheetView } from '@expo/ui/community/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../constants/colors';
import { formatINR } from '../../utils/format';
import { creditCards } from '../../data/mockData';

export const CreditCardSheet = forwardRef<any, { onClose: () => void }>((props, ref) => {
  const [activeTab, setActiveTab] = useState<'billed' | 'recent'>('billed');

  const billedCards = creditCards.filter(c => c.statement !== null);

  const renderCardItem = (card: typeof creditCards[0]) => {
    if (activeTab === 'billed') {
      const statement = card.statement!;
      const isUrgent = statement.dueStatus === 'urgent' || statement.dueStatus === 'overdue';
      
      return (
        <View key={card.id} className="bg-surface border border-border rounded-[14px] p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-4">
            <LinearGradient
              colors={card.gradientColors}
              className="w-9 h-9 rounded-[8px] mr-3"
            />
            <View>
              <Text className="text-[15px] font-[600] text-text1">{card.name}</Text>
              <Text className="text-[12px] font-[500] text-text3">{card.bank}</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[14px] font-[500] text-text2">Billed</Text>
            <View className="flex-row items-center">
              <Text className="text-[15px] font-[800] text-text1">{formatINR(statement.billedAmount)}</Text>
              {isUrgent && (
                <View className={`ml-2 px-1.5 py-0.5 rounded-[4px] ${statement.dueStatus === 'overdue' ? 'bg-redDim' : 'bg-amberDim'}`}>
                  <Text className={`text-[9px] font-[700] uppercase ${statement.dueStatus === 'overdue' ? 'text-red' : 'text-amber'}`}>
                    {statement.dueDateLabel}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[14px] font-[500] text-text2">Min Payment</Text>
            <Text className="text-[14px] font-[600] text-text1">{formatINR(statement.minPayment)}</Text>
          </View>

          {!isUrgent && statement.dueDateLabel && (
             <Text className="text-[12px] font-[500] text-text2 mb-4">{statement.dueDateLabel}</Text>
          )}

          <View className="flex-row gap-2">
            <Pressable className="flex-1 bg-surface2 h-10 rounded-[8px] items-center justify-center">
              <Text className="text-[14px] font-[600] text-text1">Transactions</Text>
            </Pressable>
            <Pressable className="flex-1 bg-blue h-10 rounded-[8px] items-center justify-center">
              <Text className="text-[14px] font-[600] text-white">Pay Now</Text>
            </Pressable>
          </View>
        </View>
      );
    } else {
      const daysColor = card.billingDaysRemaining <= 5 ? 'text-red' : card.billingDaysRemaining <= 10 ? 'text-amber' : 'text-text2';
      
      return (
        <View key={card.id} className="bg-surface border border-border rounded-[14px] p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-4">
            <LinearGradient
              colors={card.gradientColors}
              className="w-9 h-9 rounded-[8px] mr-3"
            />
            <View>
              <Text className="text-[15px] font-[600] text-text1">{card.name}</Text>
              <Text className="text-[12px] font-[500] text-text3">{card.bank}</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[14px] font-[500] text-text2">Spent this cycle</Text>
            <Text className="text-[15px] font-[800] text-text1">{formatINR(card.currentSpend)}</Text>
          </View>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[14px] font-[500] text-text2">Billing cycle</Text>
            <Text className="text-[14px] font-[600] text-text1">{card.cycleStartDay}th – {card.cycleEndDay}th</Text>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[14px] font-[500] text-text2">Days remaining</Text>
            <Text className={`text-[14px] font-[600] ${daysColor}`}>{card.billingDaysRemaining} days</Text>
          </View>

          <View className="flex-row gap-2">
            <Pressable className="flex-1 bg-surface2 h-10 rounded-[8px] items-center justify-center">
              <Text className="text-[14px] font-[600] text-text1">Transactions</Text>
            </Pressable>
            <Pressable className="flex-1 border border-blue h-10 rounded-[8px] items-center justify-center">
              <Text className="text-[14px] font-[600] text-blue">Add Expense</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['85%']}
      initialIndex={-1}
      handleIndicatorStyle={{ backgroundColor: Colors.surface2, width: 36, height: 4 }}
      backgroundStyle={{ backgroundColor: Colors.bg }}
    >
      <View className="px-4 pt-2 pb-4 flex-row justify-between items-center">
        <Text className="text-[17px] font-[700] text-text1">Credit Cards</Text>
        <Pressable onPress={props.onClose} className="p-1">
          <MaterialCommunityIcons name="close" size={24} color={Colors.text2} />
        </Pressable>
      </View>

      <View className="px-4 mb-4">
        <View className="bg-surface2 rounded-[10px] p-[3px] flex-row h-[44px]">
          <Pressable 
            onPress={() => setActiveTab('billed')}
            className={`flex-1 items-center justify-center rounded-[8px] ${activeTab === 'billed' ? 'bg-surface shadow-sm' : ''}`}
          >
            <Text className={`text-[14px] ${activeTab === 'billed' ? 'font-[700] text-text1' : 'font-[500] text-text3'}`}>
              Billed
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => setActiveTab('recent')}
            className={`flex-1 items-center justify-center rounded-[8px] ${activeTab === 'recent' ? 'bg-surface shadow-sm' : ''}`}
          >
            <Text className={`text-[14px] ${activeTab === 'recent' ? 'font-[700] text-text1' : 'font-[500] text-text3'}`}>
              Recent
            </Text>
          </Pressable>
        </View>
      </View>

      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        {activeTab === 'billed' ? (
          billedCards.length > 0 ? (
            billedCards.map(renderCardItem)
          ) : (
            <Text className="text-center text-text3 text-[14px] mt-10">No bills generated yet.</Text>
          )
        ) : (
          creditCards.map(renderCardItem)
        )}

        <Pressable className="mt-2 h-[56px] border border-dashed border-border bg-surface2 rounded-[12px] items-center justify-center">
          <Text className="text-[15px] font-[600] text-blue">+ Add Credit Card</Text>
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
