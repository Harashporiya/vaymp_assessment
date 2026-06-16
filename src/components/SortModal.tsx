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
            {/* Handle */}
            <View style={styles.handle} />

            <Text style={styles.title}>Sort by</Text>

            {SORT_OPTIONS.map((option) => {
              const isSelected = selectedSort === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={() => {
                    onSelectSort(option.id);
                    onClose();
                  }}
                  activeOpacity={0.6}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {option.label}
                  </Text>
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
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  optionRow: {
    paddingVertical: SPACING.md,
  },
  optionText: {
    color: COLORS.text,
    fontSize: FONTS.sizes.lg,
    fontWeight: '400',
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default SortModal;
