/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

// Mock HTML content
const mockCartHtml = `
  <div id="cart"></div>
  <div id="empty-cart"></div>
  <table id="cart-items"></table>
  <span id="cart-total"></span>
`;

const mockSideCartHtml = `
  <div id="cart-sidebar">
    <ul id="cart-items"></ul>
    <span id="total-price"></span>
    <span id="item-count"></span>
    <a id="checkout-link"></a>
  </div>
`;

// Set up the DOM
const dom = new JSDOM(mockCartHtml + mockSideCartHtml);
global.document = dom.window.document;
global.window = dom.window;

// Mock sessionStorage and localStorage
const mockStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'sessionStorage', { value: mockStorage });
Object.defineProperty(window, 'localStorage', { value: mockStorage });

// Mock fetch
global.fetch = jest.fn();

// Import the functions after setting up the DOM
const Cart = require('../Pages/Cart');
const SideCart = require('../Utils/Side-Cart');

describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Reset storage mock
    mockStorage.getItem.mockReturnValue('mock_token');
    
    // Reset fetch mock
    global.fetch.mockReset();

    // Reset DOM
    document.body.innerHTML = mockCartHtml + mockSideCartHtml;
  });

  describe('Cart.js', () => {
    test('fetchCartItems should update cartItems and call updateCart', async () => {
      const mockItems = [
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 20, quantity: 1 }
      ];
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockItems)
      });

      await Cart.fetchCartItems();

      expect(global.fetch).toHaveBeenCalledWith('/items_cart', expect.any(Object));
      expect(Cart.getCartItems()).toEqual(mockItems);
    });

    test('updateCart should update the DOM correctly', () => {
      Cart.setCartItems([
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 20, quantity: 1 }
      ]);

      Cart.updateCart();

      const cartContainer = document.getElementById('cart');
      const emptyCartMessage = document.getElementById('empty-cart');
      const cartItemsTable = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');

      expect(cartContainer.style.display).toBe('block');
      expect(emptyCartMessage.style.display).toBe('none');
      expect(cartItemsTable.children.length).toBe(2);
      expect(cartTotal.textContent).toBe('40.00');
    });

    test('updateQuantity should update item quantity and call updateCart', async () => {
      Cart.setCartItems([{ id: 1, name: 'Item 1', price: 10, quantity: 2 }]);
      global.fetch.mockResolvedValueOnce({ ok: true });

      await Cart.updateQuantity(1, 3);

      expect(global.fetch).toHaveBeenCalledWith('/update_quantity', expect.any(Object));
      expect(Cart.getCartItems()[0].quantity).toBe(3);
    });

    test('removeItem should remove item and refresh cart', async () => {
      Cart.setCartItems([{ id: 1, name: 'Item 1', price: 10, quantity: 2 }]);
      global.fetch.mockResolvedValueOnce({ ok: true });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      });

      await Cart.removeItem(1);

      expect(global.fetch).toHaveBeenCalledWith('/delete_to_cart', expect.any(Object));
      expect(global.fetch).toHaveBeenCalledWith('/items_cart', expect.any(Object));
      expect(Cart.getCartItems()).toEqual([]);
    });
  });

  describe('Side-Cart.js', () => {
    test('fetchCartItems should update cartItems', async () => {
      const mockItems = [
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 20, quantity: 1 }
      ];
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockItems)
      });

      await SideCart.fetchCartItems();

      expect(global.fetch).toHaveBeenCalledWith('/items_cart', expect.any(Object));
      expect(SideCart.getCartItems()).toEqual(mockItems);
    });

    test('addToCart should call API and update cart', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }])
      });

      await SideCart.addToCart(1);

      expect(global.fetch).toHaveBeenCalledWith('/add_to_cart', expect.any(Object));
      expect(global.fetch).toHaveBeenCalledWith('/items_cart', expect.any(Object));
    });

    test('removeFromCart should call API and update cart', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      });

      await SideCart.removeFromCart(1);

      expect(global.fetch).toHaveBeenCalledWith('/delete_to_cart', expect.any(Object));
      expect(global.fetch).toHaveBeenCalledWith('/items_cart', expect.any(Object));
    });

    test('updateCart should update the side cart UI correctly', () => {
      SideCart.setCartItems([
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 20, quantity: 1 }
      ]);

      SideCart.updateCart();

      const cartItemsList = document.getElementById('cart-items');
      const totalPrice = document.getElementById('total-price');
      const itemCount = document.getElementById('item-count');

      expect(cartItemsList.children.length).toBe(2);
      expect(totalPrice.textContent).toBe('$40.00');
      expect(itemCount.textContent).toBe('3');
    });
  });

  describe('Integration', () => {
    test('Cart and Side-Cart should use the same user token', () => {
      expect(Cart.getUserToken()).toBe(SideCart.getUserToken());
    });

    test('Adding item in Side-Cart should be reflected in Cart', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }])
      });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }])
      });

      await SideCart.addToCart(1);
      await Cart.fetchCartItems();

      expect(Cart.getCartItems()).toEqual([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }]);
    });

    test('Removing item in Cart should be reflected in Side-Cart', async () => {
      Cart.setCartItems([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }]);
      SideCart.setCartItems([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }]);

      global.fetch.mockResolvedValueOnce({ ok: true });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      });

      await Cart.removeItem(1);
      await SideCart.fetchCartItems();

      expect(SideCart.getCartItems()).toEqual([]);
    });
  });
});