import { useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CollectionSection } from './components/CollectionSection';
import { FabricStandardsSection } from './components/FabricStandardsSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OrderLookupModal } from './components/OrderLookupModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import {
  FREE_DELIVERY_THRESHOLD,
  PRODUCTS,
  STANDARD_DELIVERY_FEE,
} from './data/products';
import {
  CartItem,
  FabricCategory,
  OrderFormData,
  OrderRecord,
  Product,
} from './types/store';

const CART_STORAGE_KEY = 'khan_fabrics_cart_v1';
const ORDERS_STORAGE_KEY = 'khan_fabrics_orders_v1';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<FabricCategory>('All');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartInitialStep, setCartInitialStep] = useState<'bag' | 'checkout'>('bag');
  const [orderLookupOpen, setOrderLookupOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = window.localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as OrderRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  const totalBagItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    setActiveProduct(null);
    setCartInitialStep('checkout');
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(10, quantity) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handlePlaceOrder = (formData: OrderFormData): OrderRecord => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const deliveryFee =
      subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    const randomCode = Math.floor(10000 + Math.random() * 89999);
    const newOrder: OrderRecord = {
      orderId: `KF-${randomCode}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed — Preparing Dispatch',
      customer: formData,
      items: cart.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity,
      })),
      subtotal,
      deliveryFee,
      total,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#1C1917]">
      <Header
        cartCount={totalBagItems}
        onOpenCart={() => {
          setCartInitialStep('bag');
          setCartOpen(true);
        }}
        onOpenOrderLookup={() => setOrderLookupOpen(true)}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1">
        <Hero
          onExploreClick={() => scrollToSection('collection')}
          onFabricGuideClick={() => scrollToSection('fabric-standards')}
        />

        <CollectionSection
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenProduct={setActiveProduct}
          onQuickAdd={(product) => addToCart(product, 1)}
        />

        <FabricStandardsSection />
      </main>

      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenOrderLookup={() => setOrderLookupOpen(true)}
      />

      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
        initialStep={cartInitialStep}
      />

      <OrderLookupModal
        isOpen={orderLookupOpen}
        onClose={() => setOrderLookupOpen(false)}
        orders={orders}
      />
    </div>
  );
}
