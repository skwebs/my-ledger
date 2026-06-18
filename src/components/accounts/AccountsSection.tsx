import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { formatINR } from '../../utils/format';
import { accountSummary } from '../../data/mockData';
import { AccountRow } from './AccountRow';

interface AccountsSectionProps {
  onCreditCardPress: () => void;
  onBankPress: () => void;
  onCashPress: () => void;
  onPayablePress: () => void;
  onReceivablePress: () => void;
}

export const AccountsSection: React.FC<AccountsSectionProps> = ({
  onCreditCardPress,
  onBankPress,
  onCashPress,
  onPayablePress,
  onReceivablePress,
}) => {
  const { creditCards, banks, cash, payable, receivable } = accountSummary;
  const netWorth = banks.totalBalance + cash.balance + receivable.total - payable.total;

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center px-5 pb-3">
        <Text className="text-[12px] font-dm-bold text-text3 uppercase tracking-[1px]">
          ACCOUNTS
        </Text>
        <Text className="text-[12px] font-dm-bold text-text2 uppercase">
          Net Worth: {formatINR(netWorth)}
        </Text>
      </View>

      <AccountRow
        iconName="credit-card-outline"
        iconBgColor={Colors.blueDim}
        iconColor={Colors.blue}
        title="Credit Cards"
        rightLabel={`${creditCards.count} cards`}
        meta1={`Recent ${formatINR(creditCards.recentSpend)}  •  Due ${formatINR(creditCards.totalDue)}`}
        meta2={creditCards.urgentLabel || undefined}
        badgeText={creditCards.hasUrgent ? 'Urgent' : undefined}
        badgeType={creditCards.hasUrgent ? 'overdue' : undefined}
        onPress={onCreditCardPress}
      />

      <AccountRow
        iconName="bank-outline"
        iconBgColor={Colors.greenDim}
        iconColor={Colors.green}
        title="Bank Accounts"
        rightLabel={formatINR(banks.totalBalance)}
        rightColor={Colors.green}
        meta1={`${banks.count} accounts  •  +${formatINR(banks.monthlyInflow)} this month`}
        onPress={onBankPress}
      />

      <AccountRow
        iconName="cash"
        iconBgColor={Colors.amberDim}
        iconColor={Colors.amber}
        title="Cash"
        rightLabel={formatINR(cash.balance)}
        rightColor={Colors.amber}
        meta1={`Updated ${cash.lastUpdated}`}
        onPress={onCashPress}
      />

      <AccountRow
        iconName="arrow-up-circle-outline"
        iconBgColor={Colors.redDim}
        iconColor={Colors.red}
        title="Payable"
        rightLabel={formatINR(payable.total)}
        rightColor={Colors.red}
        meta1={`${payable.count} parties`}
        badgeText={payable.hasOverdue ? '⚠ Overdue' : undefined}
        badgeType={payable.hasOverdue ? 'overdue' : undefined}
        onPress={onPayablePress}
      />

      <AccountRow
        iconName="arrow-down-circle-outline"
        iconBgColor={Colors.greenDim}
        iconColor={Colors.green}
        title="Receivable"
        rightLabel={formatINR(receivable.total)}
        rightColor={Colors.green}
        meta1={`${receivable.count} people`}
        badgeText={receivable.hasSoon ? 'Due soon' : undefined}
        badgeType={receivable.hasSoon ? 'soon' : undefined}
        onPress={onReceivablePress}
      />
    </View>
  );
};
