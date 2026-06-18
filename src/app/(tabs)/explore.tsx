import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg" style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-text1 text-[20px] font-dm-bold mb-2">Explore</Text>
        <Text className="text-text3 text-[14px] text-center font-dm-medium">
          Detailed insights and exploration features will be available here soon.
        </Text>
      </View>
    </SafeAreaView>
  );
}
