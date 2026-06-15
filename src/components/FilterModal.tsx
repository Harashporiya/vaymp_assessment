import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '@/constants/colors';

const { height } = Dimensions.get('window');

const TABS = [
  { id: 'suggested', label: 'Suggested filters' },
  { id: 'new_arrivals', label: 'New arrivals' },
  { id: 'gender', label: 'Gender' },
  { id: 'price', label: 'Price' },
  { id: 'brand', label: 'Brand' },
  { id: 'fabric', label: 'Fabric' },
  { id: 'fit', label: 'Fit' },
  { id: 'size', label: 'Size' },
  { id: 'color', label: 'Color' },
  { id: 'discounts', label: 'Discounts' },
  { id: 'delivery', label: 'Delivery time' },
];

const SUGGESTED_CHIPS = ['2 days delivery', 'Brown', 'Under ₹700', '50% off'];
const GENDER_OPTIONS = ['Men', 'Women', 'Unisex'];
const PRICE_OPTIONS = ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹1500', 'Over ₹1500'];
const BRAND_OPTIONS = ['Vashions', 'Zudio', 'Savana', 'H&M', 'Roadster'];
const FABRIC_OPTIONS = ['Cotton', 'Polyester', 'Linen', 'Denim'];
const FIT_OPTIONS = ['Slim Fit', 'Regular Fit', 'Oversized'];
const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLOR_OPTIONS = ['Black', 'White', 'Blue', 'Brown', 'Red', 'Grey'];
const DISCOUNT_OPTIONS = ['10% off', '20% off', '30% off', '50% off'];
const DELIVERY_OPTIONS = ['Fast Delivery', '7 days delivery', 'Frozen'];

interface FilterProps {
  visible: boolean;
  onClose: () => void;
  selectedCategory: string | null;
  onApplyFilter: (filters: { category: string | null }) => void;
  onClearFilter: () => void;
}

const FilterModal: React.FC<FilterProps> = ({
  visible,
  onClose,
  selectedCategory,
  onApplyFilter,
  onClearFilter,
}) => {
  const [activeTab, setActiveTab] = useState('suggested');

  const [tempCategory, setTempCategory] = useState<string | null>(selectedCategory);
  const [selectedGender, setSelectedGender] = useState<string | null>(
    selectedCategory === "men's clothing" ? 'Men' : selectedCategory === "women's clothing" ? 'Women' : null
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [selectedFit, setSelectedFit] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [selectedSuggested, setSelectedSuggested] = useState<string[]>([]);

  const handleApply = () => {

    let categoryToApply = tempCategory;
    if (selectedGender === 'Men') {
      categoryToApply = "men's clothing";
    } else if (selectedGender === 'Women') {
      categoryToApply = "women's clothing";
    }
    
    onApplyFilter({ category: categoryToApply });
    onClose();
  };

  const handleClear = () => {
    setTempCategory(null);
    setSelectedGender(null);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPrice(null);
    setSelectedBrand(null);
    setSelectedFabric(null);
    setSelectedFit(null);
    setSelectedDiscount(null);
    setSelectedDelivery(null);
    setSelectedSuggested([]);
    onClearFilter();
    onClose();
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSuggested = (chip: string) => {
    setSelectedSuggested((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const renderRightContent = () => {
    switch (activeTab) {
      case 'suggested':
        return (
          <View>
            <Text style={styles.contentHeading}>Choose from the mostly used filters</Text>
            <View style={styles.chipRow}>
              {SUGGESTED_CHIPS.map((chip) => {
                const isSelected = selectedSuggested.includes(chip);
                return (
                  <TouchableOpacity
                    key={chip}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => toggleSuggested(chip)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {chip}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'new_arrivals':
        return (
          <View>
            <Text style={styles.contentHeading}>New Arrivals</Text>
            <Text style={styles.placeholderText}>No new arrivals filters available.</Text>
          </View>
        );
      case 'gender':
        return (
          <View>
            <Text style={styles.contentHeading}>Select gender</Text>
            <View style={styles.chipRow}>
              {GENDER_OPTIONS.map((g) => {
                const isSelected = selectedGender === g;
                return (
                  <TouchableOpacity
                    key={g}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedGender(isSelected ? null : g)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {g}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'price':
        return (
          <View>
            <Text style={styles.contentHeading}>Select price range</Text>
            <View style={styles.chipRow}>
              {PRICE_OPTIONS.map((p) => {
                const isSelected = selectedPrice === p;
                return (
                  <TouchableOpacity
                    key={p}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedPrice(isSelected ? null : p)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'brand':
        return (
          <View>
            <Text style={styles.contentHeading}>Select Brand</Text>
            <View style={styles.chipRow}>
              {BRAND_OPTIONS.map((b) => {
                const isSelected = selectedBrand === b;
                return (
                  <TouchableOpacity
                    key={b}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedBrand(isSelected ? null : b)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {b}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'fabric':
        return (
          <View>
            <Text style={styles.contentHeading}>Select Fabric</Text>
            <View style={styles.chipRow}>
              {FABRIC_OPTIONS.map((f) => {
                const isSelected = selectedFabric === f;
                return (
                  <TouchableOpacity
                    key={f}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedFabric(isSelected ? null : f)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {f}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'fit':
        return (
          <View>
            <Text style={styles.contentHeading}>Select Fit</Text>
            <View style={styles.chipRow}>
              {FIT_OPTIONS.map((fit) => {
                const isSelected = selectedFit === fit;
                return (
                  <TouchableOpacity
                    key={fit}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedFit(isSelected ? null : fit)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {fit}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'size':
        return (
          <View>
            <Text style={styles.contentHeading}>Select Size</Text>
            <View style={styles.chipRow}>
              {SIZE_OPTIONS.map((s) => {
                const isSelected = selectedSizes.includes(s);
                return (
                  <TouchableOpacity
                    key={s}
                    style={[styles.sizeChip, isSelected && styles.chipActive]}
                    onPress={() => toggleSize(s)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'color':
        return (
          <View>
            <Text style={styles.contentHeading}>Select Color</Text>
            <View style={styles.chipRow}>
              {COLOR_OPTIONS.map((c) => {
                const isSelected = selectedColors.includes(c);
                return (
                  <TouchableOpacity
                    key={c}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => toggleColor(c)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'discounts':
        return (
          <View>
            <Text style={styles.contentHeading}>Select Discount</Text>
            <View style={styles.chipRow}>
              {DISCOUNT_OPTIONS.map((d) => {
                const isSelected = selectedDiscount === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedDiscount(isSelected ? null : d)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {d}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'delivery':
        return (
          <View>
            <Text style={styles.contentHeading}>Select Delivery Time</Text>
            <View style={styles.chipRow}>
              {DELIVERY_OPTIONS.map((del) => {
                const isSelected = selectedDelivery === del;
                return (
                  <TouchableOpacity
                    key={del}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => setSelectedDelivery(isSelected ? null : del)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                      {del}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContentContainer} onPress={() => {}}>
          <View style={styles.sheet}>
            <View style={styles.header}>
              <Text style={styles.title}>Filters</Text>
            </View>

            
            <View style={styles.mainContainer}>
              
              <View style={styles.sidebar}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <TouchableOpacity
                        key={tab.id}
                        style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                        onPress={() => setActiveTab(tab.id)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.sidebarText, isActive && styles.sidebarTextActive]}>
                          {tab.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              
              <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                  {renderRightContent()}
                </ScrollView>
              </View>
            </View>

            
            <View style={styles.actions}>
              <TouchableOpacity style={styles.clearBtn} onPress={handleClear} activeOpacity={0.8}>
                <Text style={styles.clearBtnText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.8}>
                <Text style={styles.applyBtnText}>Apply filter</Text>
              </TouchableOpacity>
            </View>
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
  modalContentContainer: {
    width: '100%',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingBottom: SPACING.xl,
    height: height * 0.75, 
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
  },
  title: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  sidebar: {
    width: 135,
    backgroundColor: '#F5F6F8',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  sidebarItem: {
    paddingVertical: SPACING.md - 1,
    paddingHorizontal: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F5F6F8',
  },
  sidebarItemActive: {
    backgroundColor: '#E8EEFF', 
    borderLeftColor: COLORS.primary, 
  },
  sidebarText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  sidebarTextActive: {
    color: COLORS.primary, 
    fontWeight: '700',
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  contentHeading: {
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontStyle: 'italic',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sizeChip: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#E8EEFF',
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.text,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  chipTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  clearBtn: {
    flex: 1,
    paddingVertical: SPACING.md - 2,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  clearBtnText: {
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  applyBtn: {
    flex: 1,
    paddingVertical: SPACING.md - 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  applyBtnText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
});

export default FilterModal;
