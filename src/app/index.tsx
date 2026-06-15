import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  TextInput, ActivityIndicator, StatusBar, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import ProductCard from '@/components/ProductCard';
import SortModal from '@/components/SortModal';
import FilterModal from '@/components/FilterModal';
import { COLORS, SPACING, RADIUS, FONTS } from '@/constants/colors';
import { useAppSelector } from '@/store/hooks';
import { Product } from '@/store/bagSlice';


export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const bagItems = useAppSelector((state) => state.bag.items);
  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, searchQuery, selectedSort, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Network error');
      const data: Product[] = await res.json();
      setProducts(data);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = useCallback(() => {
    let result = [...products];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    switch (selectedSort) {
      case 'price_low': result.sort((a, b) => a.price - b.price); break;
      case 'price_high': result.sort((a, b) => b.price - a.price); break;
      case 'rating_high': result.sort((a, b) => b.rating.rate - a.rating.rate); break;
      default: result.sort((a, b) => b.id - a.id); break;
    }
    setFilteredProducts(result);
  }, [products, searchQuery, selectedSort, selectedCategory]);

  const handleApplyFilter = ({ category }: { category: string | null }) => setSelectedCategory(category);
  const handleClearFilter = () => setSelectedCategory(null);



  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>Try adjusting your filters or search</Text>
      <TouchableOpacity style={styles.retryBtn} onPress={() => { handleClearFilter(); setSearchQuery(''); }}>
        <Text style={styles.retryText}>Clear All Filters</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      
      <View style={styles.header}>
        <Pressable style={styles.backBtn}>
          <Feather name="chevron-left" size={24} color={COLORS.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          
          <Feather name="shopping-cart" size={20} color={COLORS.primary} />
          <Text style={styles.headerTitle}>T-shirts</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerBtn}>
            <Feather name="search" size={20} color={COLORS.text} />
          </Pressable>
          <Pressable style={styles.headerBtn}>
            <Feather name="heart" size={20} color={COLORS.text} />
          </Pressable>

          <Pressable style={styles.headerBtn} onPress={() => router.push('/bag' as any)}>
            <Feather name="shopping-bag" size={20} color={COLORS.text} />
            {bagCount > 0 && (
              <View style={styles.badge}><Text style={styles.badgeText}>{bagCount}</Text></View>
            )}
          </Pressable>
        </View>
      </View>

      
      <View style={styles.subtitleRow}>
        <Text style={styles.subtitleText}>
          {'Showing '}
          <Text style={styles.subtitleCount}>{filteredProducts.length} results</Text>
          {' for '}
          {selectedCategory
            ? <Text style={styles.subtitleTag}>"{selectedCategory}"</Text>
            : (
              <Text>
                <Text style={styles.subtitleTag}>Slim Fit </Text>
                <Text style={styles.subtitleTag}>XL </Text>
                <Text style={styles.subtitleTag}>Men's </Text>
                <Text style={styles.subtitleText}>T-shirts</Text>
              </Text>
            )
          }
        </Text>
      </View>

      
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchProducts}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
        />
      )}

      
      <View style={styles.floatingBar} pointerEvents="box-none">
        <TouchableOpacity style={styles.floatingBtn} onPress={() => setSortVisible(true)} activeOpacity={0.85}>
          <Text style={styles.floatingBtnIcon}>↕</Text>
          <Text style={styles.floatingBtnText}> Sort by</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.floatingBtn, selectedCategory && styles.floatingBtnActive]}
          onPress={() => setFilterVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={[styles.floatingBtnIcon, selectedCategory && styles.floatingBtnIconActive]}>≡</Text>
          <Text style={[styles.floatingBtnText, selectedCategory && styles.floatingBtnTextActive]}>
            {' '}Filters{selectedCategory ? ' •' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <SortModal visible={sortVisible} onClose={() => setSortVisible(false)} selectedSort={selectedSort} onSelectSort={setSelectedSort} />
      <FilterModal visible={filterVisible} onClose={() => setFilterVisible(false)} selectedCategory={selectedCategory} onApplyFilter={handleApplyFilter} onClearFilter={handleClearFilter} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: SPACING.xs,
    width: 36,
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '300',
    lineHeight: 28,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '900',
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  headerBtn: {
    position: 'relative',
    padding: SPACING.xs,
  },
  headerBtnIcon: {
    fontSize: 20,
    color: COLORS.text,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '800',
  },
  subtitleRow: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  subtitleText: {
    color: COLORS.text,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
  },
  subtitleCount: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  subtitleTag: {
    color: COLORS.text,
    textDecorationLine: 'underline',
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 120,
  },
  row: {
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    padding: SPACING.xl,
  },
  errorIcon: {
    fontSize: 48,
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 56,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
  },
  retryText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
  floatingBar: {
    position: 'absolute',
    bottom: 28,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
    pointerEvents: 'box-none',
  },
  floatingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.text,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  floatingBtnActive: {
    backgroundColor: COLORS.primary,
  },
  floatingBtnIcon: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  floatingBtnIconActive: {
    color: COLORS.white,
  },
  floatingBtnText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  floatingBtnTextActive: {
    color: COLORS.white,
  },
});
