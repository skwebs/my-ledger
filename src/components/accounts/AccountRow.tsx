import React from 'react';
import { View, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../constants/colors';

interface AccountRowProps {
  iconName: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  rightLabel: string;
  rightColor?: string;
  meta1: string;
  meta2?: string;
  badgeText?: string;
  badgeType?: 'overdue' | 'soon' | 'ok';
  onPress: () => void;
}

export const AccountRow: React.FC<AccountRowProps> = ({
  iconName,
  iconBgColor,
  iconColor,
  title,
  rightLabel,
  rightColor,
  meta1,
  meta2,
  badgeText,
  badgeType,
  onPress,
}) => {
  const getBadgeStyles = () => {
    switch (badgeType) {
      case 'overdue':
        return { bg: 'bg-redDim', text: 'text-red' };
      case 'soon':
        return { bg: 'bg-amberDim', text: 'text-amber' };
      case 'ok':
        return { bg: 'bg-greenDim', text: 'text-green' };
      default:
        return { bg: 'bg-surface2', text: 'text-text2' };
    }
  };

  const badgeStyles = getBadgeStyles();

  return (
    <Pressable
      onPress={onPress}
      className="bg-surface rounded-[14px] p-[14px] mx-4 mb-2 flex-row items-center shadow-sm"
      style={({ pressed }) => pressed && { opacity: 0.75 }}
    >
      <View 
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: iconBgColor }}
      >
        <MaterialCommunityIcons name={iconName as any} size={20} color={iconColor} />
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-0.5">
          <Text className="text-[15px] font-dm-semibold text-text1">{title}</Text>
          <Text 
            className="text-[15px] font-dm-extrabold"
            style={{ color: rightColor || Colors.text1 }}
          >
            {rightLabel}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-[12px] font-dm-medium text-text3">{meta1}</Text>
          {badgeText && (
            <View className={`ml-2 px-1.5 py-0.5 rounded-[4px] ${badgeStyles.bg}`}>
              <Text className={`text-[9px] font-dm-bold uppercase ${badgeStyles.text}`}>
                {badgeText}
              </Text>
            </View>
          )}
        </View>

        {meta2 && (
          <Text className="text-[12px] font-dm-medium text-text2 mt-0.5">{meta2}</Text>
        )}
      </View>

      <View className="ml-2">
        <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.text3} />
      </View>
    </Pressable>
  );
};
