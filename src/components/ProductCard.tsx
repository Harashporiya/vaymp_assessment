import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToBag, removeFromBag } from '@/store/bagSlice';
import { Product } from '@/store/bagSlice';
import { COLORS, SPACING, RADIUS, FONTS } from '@/constants/colors';

const { width } = Dimensions.get('window');
const GAP = SPACING.sm;
const H_PAD = SPACING.md;
const CARD_WIDTH = (width - H_PAD * 2 - GAP) / 2;
const IMAGE_HEIGHT = CARD_WIDTH * 1.5;

const BRANDS = ['Vashions', 'Zudio', 'Savana', 'H&M', 'Roadster', 'Mango', 'Only', 'Puma'];

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const bagItems = useAppSelector((state) => state.bag.items);
  const isInBag = bagItems.some((item) => item.id === product.id);

  const handleBagToggle = () => {
    if (isInBag) dispatch(removeFromBag(product.id));
    else dispatch(addToBag(product));
  };

  const brand = BRANDS[product.id % BRANDS.length];
  const priceINR = Math.round(product.price * 83);
  const origINR  = Math.round(priceINR * (1.55 + (product.id % 5) * 0.08));
  const discPct  = Math.round((1 - priceINR / origINR) * 100);

  return (
    <View style={styles.card}>
      
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        <Pressable style={styles.wishBtn}>
          <Text style={[styles.wishIcon, isInBag && styles.wishIconFilled]}>
            {isInBag ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>

      
      <View style={styles.info}>
        
        <Text style={styles.brand}>{brand}</Text>

        
        <Text style={styles.desc} numberOfLines={1}>{product.title}</Text>

        
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{priceINR.toLocaleString('en-IN')}</Text>
          <TouchableOpacity
            style={[styles.tryBtn, isInBag && styles.tryBtnActive]}
            onPress={handleBagToggle}
            activeOpacity={0.8}
          >
            
            <Text style={[styles.tryText, isInBag && styles.tryTextActive]}>
              {'TRY '}
              <Text style={[styles.tryN, isInBag && styles.tryTextActive]}>{'n'}</Text>
              {' BUY'}
            </Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.discRow}>
          <Text style={styles.origPrice}>₹{origINR.toLocaleString('en-IN')}</Text>
          <Text style={styles.discPct}>{discPct}% OFF</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },

  imageWrap: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: COLORS.surfaceLight,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishBtn: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 30,
    height: 30,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishIcon: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  wishIconFilled: {
    color: COLORS.accent,
  },

  info: {
    paddingHorizontal: SPACING.xs + 2,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  brand: {
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
    fontWeight: '800',
    lineHeight: 20,
  },
  desc: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
    marginTop: 1,
    marginBottom: SPACING.xs,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  price: {
    color: COLORS.text,
    fontSize: FONTS.sizes.lg,
    fontWeight: '800',
  },
  tryBtn: {
    paddingHorizontal: 0,
  },
  tryBtnActive: {},
  tryText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tryTextActive: {
    color: COLORS.success,
  },
  tryN: {
    fontStyle: 'italic',
    color: COLORS.primary,
    fontWeight: '900',
  },

  discRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: 2,
  },
  origPrice: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    textDecorationLine: 'line-through',
  },
  discPct: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
});

export default ProductCard;
