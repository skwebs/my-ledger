import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { formatINR } from '../utils/format';
import { budgetData } from '../data/mockData';

interface BudgetCardProps {
  data: typeof budgetData;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ data }) => {
  const usedPercent = Math.round((data.spent / data.total) * 100);
  const left = data.total - data.spent;

  return (
    <View className="bg-surface border border-border rounded-[16px] p-4 mx-4 mb-5 shadow-sm">
      <Text className="text-[10px] font-dm-bold tracking-[1px] text-text3 uppercase mb-2">
        {data.month} BUDGET
      </Text>
      
      <View className="flex-row items-baseline mb-3">
        <Text className="text-[20px] font-dm-extrabold tracking-[-0.5px] text-red">
          {formatINR(data.spent)}
        </Text>
        <Text className="text-[14px] font-dm-semibold text-text3 mx-1">/</Text>
        <Text className="text-[14px] font-dm-semibold text-teal">
          {formatINR(data.total)}
        </Text>
      </View>

      <View className="h-2 bg-surface2 rounded-full overflow-hidden mb-2">
        <LinearGradient
          colors={['#DC2626', '#F97316']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: '100%', width: `${usedPercent}%` }}
        />
      </View>

      <View className="flex-row justify-between mb-4">
        <Text className="text-[11px] font-dm-semibold text-red">
          {usedPercent}% used
        </Text>
        <Text className="text-[11px] font-dm-semibold text-teal">
          {formatINR(left)} left
        </Text>
      </View>

      <View className="h-[1px] bg-border mb-4" />

      <View className="flex-row">
        <View className="flex-1 items-center border-r border-border">
          <Text className="text-[10px] font-dm-bold text-text3 uppercase mb-1">Income</Text>
          <Text className="text-[14px] font-dm-bold text-green">{formatINR(data.income)}</Text>
        </View>
        <View className="flex-1 items-center border-r border-border">
          <Text className="text-[10px] font-dm-bold text-text3 uppercase mb-1">Spent</Text>
          <Text className="text-[14px] font-dm-bold text-red">{formatINR(data.spent)}</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-[10px] font-dm-bold text-text3 uppercase mb-1">Saved</Text>
          <Text className="text-[14px] font-dm-bold text-blue">{formatINR(data.savings)}</Text>
        </View>
      </View>
    </View>
  );
};
