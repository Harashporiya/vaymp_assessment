import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increaseQuantity, decreaseQuantity, removeFromBag, clearBag } from '@/store/bagSlice';
import { COLORS, SPACING, RADIUS, FONTS } from '@/constants/colors';

export default function BagScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const bagItems = useAppSelector((state) => state.bag.items);

  const EmptyBag = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.oopsTitle}>OOPS ☹</Text>
      <Text style={styles.emptyTitle}>Your bag is empty.</Text>
      
      <Image 
        source={require('../../assets/images/empty_bag.png')} 
        style={styles.emptyBagImage} 
        resizeMode="contain" 
      />
      
      <Text style={styles.emptySubtitle}>Add items to your bag now</Text>
      <TouchableOpacity style={styles.shopBtn} onPress={() => router.back()} activeOpacity={0.85}>
        <Text style={styles.shopBtnText}>Start shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const FilledBag = () => (
    <View style={styles.filledContainer}>
      <View style={styles.deliveryBanner}>
        <Text style={styles.deliveryEmoji}>🛵</Text>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.deliveryTitle}>Delivering in just 60 min</Text>
          <Text style={styles.deliverySubtitle} numberOfLines={1}>
            Full address - 29 Aparna Complex, Gurgaon...
          </Text>
        </View>
        <Feather name="chevron-down" size={20} color={COLORS.textSecondary} />
      </View>

      <View style={styles.freeDeliveryBanner}>
        <View style={styles.freeDeliveryBadge}>
          <Feather name="check" size={12} color="#FFFFFF" />
        </View>
        <Text style={styles.freeDeliveryText}>
          Yayy! Your order is eligible for FREE delivery.
        </Text>
      </View>

      <TouchableOpacity style={styles.selectAllBtn} onPress={() => dispatch(clearBag())}>
        <Text style={styles.selectAllText}>Deselect all items</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.itemsList}>
        {bagItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            
            <View style={styles.itemImageWrapper}>
              <View style={styles.checkbox}>
                <Feather name="check" size={12} color="#FFFFFF" />
              </View>
              <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
            </View>
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
              
              <View style={styles.priceRow}>
                <Text style={styles.itemPrice}>₹{item.price.toFixed(0)}</Text>
                <Text style={styles.itemOriginalPrice}>₹{(item.price * 1.4).toFixed(0)}</Text>
              </View>
              
              <Text style={styles.tryBuyText}>
                TRY <Text style={styles.tryBuyIcon}>И</Text> BUY
              </Text>

              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => item.quantity > 1 ? dispatch(decreaseQuantity(item.id)) : dispatch(removeFromBag(item.id))}
                  activeOpacity={0.7}>
                  {item.quantity === 1 ? (
                    <Feather name="trash-2" size={14} color="#000" />
                  ) : (
                    <Feather name="minus" size={14} color="#000" />
                  )}
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => dispatch(increaseQuantity(item.id))}
                  activeOpacity={0.7}>
                  <Feather name="plus" size={14} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
          <Text style={styles.checkoutBtnText}>Proceed to pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F3F4F6' }]} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="chevron-left" size={24} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Bag</Text>
        <Pressable style={styles.wishlistBtn}>
          <Feather name="heart" size={20} color={COLORS.text} />
        </Pressable>
      </View>

      {bagItems.length === 0 ? <EmptyBag /> : <FilledBag />}
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: '#F3F4F6',
  },
  backBtn: {
    padding: SPACING.xs,
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 30,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  wishlistBtn: {
    padding: SPACING.xs,
  },
  wishlistIcon: {
    fontSize: 22,
    color: COLORS.text,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    backgroundColor: '#FFFFFF',
  },
  oopsTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  emptyTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 40,
  },
  emptyBagImage: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  emptySubtitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  shopBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    width: '80%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  shopBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },

  filledContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  deliveryEmoji: {
    fontSize: 28,
  },
  deliveryTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  deliverySubtitle: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  freeDeliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 12,
    gap: 8,
  },
  freeDeliveryBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeDeliveryText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  selectAllBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 4,
  },
  selectAllText: {
    color: COLORS.primary,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  itemsList: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  itemCard: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 16,
  },
  itemImageWrapper: {
    width: 100,
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
    position: 'relative',
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemDesc: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  itemPrice: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '800',
  },
  itemOriginalPrice: {
    color: '#9CA3AF',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  tryBuyText: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 8,
  },
  tryBuyIcon: {
    color: COLORS.primary,
    fontStyle: 'italic',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    width: 80,
    height: 32,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  qtyBtn: {
    padding: 4,
  },
  qtyValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
