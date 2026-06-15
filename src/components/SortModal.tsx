import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '@/constants/colors';

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest arrivals' },
  { id: 'price_low', label: 'Price - low to high' },
  { id: 'price_high', label: 'Price - high to low' },
  { id: 'offers', label: 'Offers and discounts' },
  { id: 'best_seller', label: 'Best sellers' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
}

const SortModal: React.FC<Props> = ({ visible, onClose, selectedSort, onSelectSort }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.sheet}>
            
            <Text style={styles.title}>Sort by</Text>

            
            {SORT_OPTIONS.map((option, index) => {
              const isSelected = selectedSort === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionRow,
                    index === SORT_OPTIONS.length - 1 && styles.optionRowLast,
                  ]}
                  onPress={() => {
                    onSelectSort(option.id);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.optionInner, isSelected && styles.optionInnerSelected]}>
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {option.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  title: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  optionRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionRowLast: {
    borderBottomWidth: 0,
  },
  optionInner: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    borderRadius: RADIUS.xs,
  },
  optionInnerSelected: {
    borderWidth: 1.5,
    borderColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    marginVertical: 3,
    borderRadius: RADIUS.xs,
  },
  optionText: {
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
    fontWeight: '400',
  },
  optionTextSelected: {
    color: COLORS.text,
    fontWeight: '500',
  },
});

export default SortModal;
