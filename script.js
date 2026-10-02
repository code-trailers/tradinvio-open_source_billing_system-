/**
 * TradInvio - Restaurant Billing System
 * Pure Vanilla JavaScript implementation
 */

// ==========================================
// 1. Menu Dataset
// ==========================================
const MENU_DATA = [
  // Starters
  {
    id: 1,
    name: "Paneer Tikka",
    category: "Starters",
    price: 240,
    desc: "Cottage cheese cubes marinated in tandoori spices and grilled.",
    icon: "🍢",
    veg: true
  },
  {
    id: 2,
    name: "Crispy Chilli Corn",
    category: "Starters",
    price: 180,
    desc: "Golden fried sweet corn tossed with bell peppers and green chillies.",
    icon: "🌽",
    veg: true
  },
  {
    id: 3,
    name: "BBQ Chicken Wings",
    category: "Starters",
    price: 280,
    desc: "Crispy chicken wings glazed in smokey hickory BBQ sauce.",
    icon: "🍗",
    veg: false
  },
  {
    id: 4,
    name: "Spring Rolls",
    category: "Starters",
    price: 160,
    desc: "Crispy pastry rolls filled with shredded seasonal vegetables.",
    icon: "🌯",
    veg: true
  },
  {
    id: 5,
    name: "Cheesy Garlic Bread",
    category: "Starters",
    price: 150,
    desc: "Toasted baguette topped with garlic herb butter and melted mozzarella.",
    icon: "🥖",
    veg: true
  },

  // Main Course
  {
    id: 6,
    name: "Butter Chicken",
    category: "Main Course",
    price: 340,
    desc: "Tender chicken cooked in rich and velvety makhani gravy.",
    icon: "🍛",
    veg: false
  },
  {
    id: 7,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 290,
    desc: "Fresh paneer simmered in creamy tomato and cashew nut gravy.",
    icon: "🍲",
    veg: true
  },
  {
    id: 8,
    name: "Dal Makhani",
    category: "Main Course",
    price: 230,
    desc: "Slow-cooked black lentils simmered with butter and aromatic cream.",
    icon: "🥣",
    veg: true
  },
  {
    id: 9,
    name: "Chicken Dum Biryani",
    category: "Main Course",
    price: 320,
    desc: "Fragrant basmati rice layered with spiced marinated chicken.",
    icon: "🍚",
    veg: false
  },
  {
    id: 10,
    name: "Veg Hyderabadi Biryani",
    category: "Main Course",
    price: 260,
    desc: "Aromatic basmati rice cooked with garden veggies and saffron.",
    icon: "🥘",
    veg: true
  },
  {
    id: 11,
    name: "Creamy Alfredo Pasta",
    category: "Main Course",
    price: 270,
    desc: "Penne pasta tossed in garlic parmesan white sauce with herbs.",
    icon: "🍝",
    veg: true
  },

  // Beverages
  {
    id: 12,
    name: "Fresh Lime Soda",
    category: "Beverages",
    price: 90,
    desc: "Refreshing lime juice with fizzy club soda (Sweet / Salted).",
    icon: "🥤",
    veg: true
  },
  {
    id: 13,
    name: "Iced Cold Coffee",
    category: "Beverages",
    price: 130,
    desc: "Chilled espresso blended with thick milk and vanilla ice cream.",
    icon: "🧋",
    veg: true
  },
  {
    id: 14,
    name: "Mango Lassi",
    category: "Beverages",
    price: 110,
    desc: "Traditional sweetened yogurt smoothie made with Alphonso mangoes.",
    icon: "🥛",
    veg: true
  },
  {
    id: 15,
    name: "Masala Chai",
    category: "Beverages",
    price: 60,
    desc: "Classic Indian spiced tea brewed with ginger and cardamom.",
    icon: "☕",
    veg: true
  },

  // Desserts
  {
    id: 16,
    name: "Gulab Jamun with Ice Cream",
    category: "Desserts",
    price: 140,
    desc: "Warm syrup-soaked milk dumplings served with vanilla bean ice cream.",
    icon: "🍨",
    veg: true
  },
  {
    id: 17,
    name: "Sizzling Chocolate Brownie",
    category: "Desserts",
    price: 190,
    desc: "Rich fudge brownie on hot sizzler plate with warm chocolate sauce.",
    icon: "🍫",
    veg: true
  },
  {
    id: 18,
    name: "Classic Tiramisu",
    category: "Desserts",
    price: 210,
    desc: "Italian dessert with coffee-soaked ladyfingers and mascarpone cream.",
    icon: "🍰",
    veg: true
  }
];

// ==========================================
// 2. State Variables
// ==========================================
let currentCategory = "all";
let searchQuery = "";
let currentOrder = []; // Array of { id, name, price, qty }

// ==========================================
// 3. DOM Elements
// ==========================================
const menuGrid = document.getElementById("menuGrid");
const categoryTabs = document.getElementById("categoryTabs");
const menuSearch = document.getElementById("menuSearch");
const orderItemsList = document.getElementById("orderItemsList");
const subtotalVal = document.getElementById("subtotalVal");
const discountInput = document.getElementById("discountInput");
const discountVal = document.getElementById("discountVal");
const gstVal = document.getElementById("gstVal");
const grandTotalVal = document.getElementById("grandTotalVal");
const generateBillBtn = document.getElementById("generateBillBtn");
const resetOrderBtn = document.getElementById("resetOrderBtn");
const customerNameInput = document.getElementById("customerName");
const tableNumberInput = document.getElementById("tableNumber");
const liveClock = document.getElementById("liveClock");

// Modal Elements
const billModal = document.getElementById("billModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const printBillBtn = document.getElementById("printBillBtn");
const recInvoiceNo = document.getElementById("recInvoiceNo");
const recDateTime = document.getElementById("recDateTime");
const recCustName = document.getElementById("recCustName");
const recTableNo = document.getElementById("recTableNo");
const recItemsBody = document.getElementById("recItemsBody");
const recSubtotal = document.getElementById("recSubtotal");
const recDiscountPercent = document.getElementById("recDiscountPercent");
const recDiscount = document.getElementById("recDiscount");
const recCgst = document.getElementById("recCgst");
const recSgst = document.getElementById("recSgst");
const recGrandTotal = document.getElementById("recGrandTotal");

// ==========================================
// 4. Live Clock
// ==========================================
function updateLiveClock() {
  const now = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  if (liveClock) {
    liveClock.textContent = now.toLocaleDateString("en-IN", options);
  }
}
setInterval(updateLiveClock, 1000);
updateLiveClock();

// ==========================================
// 5. Render Menu Items
// ==========================================
function renderMenu() {
  const filtered = MENU_DATA.filter((item) => {
    const matchesCategory =
      currentCategory === "all" || item.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    menuGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: #94a3b8;">
        <p style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</p>
        <p style="font-weight: 600; font-size: 1.1rem; color: #475569;">No dishes found</p>
        <p style="font-size: 0.85rem;">Try adjusting your category or search term.</p>
      </div>
    `;
    return;
  }

  menuGrid.innerHTML = filtered
    .map(
      (item) => `
      <div class="menu-card" data-id="${item.id}">
        <div>
          <div class="menu-card-top">
            <div class="item-icon">${item.icon}</div>
            <span class="item-badge ${item.veg ? "badge-veg" : "badge-non-veg"}">
              ${item.veg ? "Veg" : "Non-Veg"}
            </span>
          </div>
          <h3 class="item-title">${item.name}</h3>
          <p class="item-desc">${item.desc}</p>
        </div>
        <div class="menu-card-bottom">
          <span class="item-price">₹${item.price}</span>
          <button class="btn-add-item" onclick="addToOrder(${item.id})">
            <span>+ Add</span>
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

// ==========================================
// 6. Order Management
// ==========================================
function addToOrder(itemId) {
  const item = MENU_DATA.find((m) => m.id === itemId);
  if (!item) return;

  const existing = currentOrder.find((o) => o.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    currentOrder.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1
    });
  }

  updateOrderUI();
}

function updateQuantity(itemId, delta) {
  const item = currentOrder.find((o) => o.id === itemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    currentOrder = currentOrder.filter((o) => o.id !== itemId);
  }

  updateOrderUI();
}

function removeFromOrder(itemId) {
  currentOrder = currentOrder.filter((o) => o.id !== itemId);
  updateOrderUI();
}

function clearOrder() {
  if (currentOrder.length === 0) return;
  if (confirm("Are you sure you want to clear the entire order?")) {
    currentOrder = [];
    customerNameInput.value = "";
    tableNumberInput.value = "";
    if (discountInput) discountInput.value = "0";
    updateOrderUI();
  }
}

// ==========================================
// 7. Calculate Totals & Update Order UI
// ==========================================
function updateOrderUI() {
  const discountPercent = discountInput ? Math.min(100, Math.max(0, parseFloat(discountInput.value) || 0)) : 0;

  if (currentOrder.length === 0) {
    orderItemsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <p style="font-weight: 600; color: #475569;">No items added yet</p>
        <p style="font-size: 0.78rem;">Select dishes from the menu to start your order</p>
      </div>
    `;
    subtotalVal.textContent = "₹0.00";
    if (discountVal) discountVal.textContent = "₹0.00";
    gstVal.textContent = "₹0.00";
    grandTotalVal.textContent = "₹0.00";
    generateBillBtn.disabled = true;
    return;
  }

  // Render items
  orderItemsList.innerHTML = currentOrder
    .map(
      (item) => `
      <div class="order-row">
        <span class="order-item-name" title="${item.name}">${item.name}</span>
        <div class="text-center">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <span class="text-right">₹${item.price}</span>
        <span class="text-right" style="font-weight: 700;">₹${item.price * item.qty}</span>
        <div class="text-center">
          <button class="btn-remove-row" onclick="removeFromOrder(${item.id})" title="Remove item">🗑️</button>
        </div>
      </div>
    `
    )
    .join("");

  // Calculate Totals
  const subtotal = currentOrder.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const gst = taxableAmount * 0.05; // 5% GST after discount
  const grandTotal = taxableAmount + gst;

  subtotalVal.textContent = `₹${subtotal.toFixed(2)}`;
  if (discountVal) discountVal.textContent = `₹${discountAmount.toFixed(2)}`;
  gstVal.textContent = `₹${gst.toFixed(2)}`;
  grandTotalVal.textContent = `₹${grandTotal.toFixed(2)}`;

  generateBillBtn.disabled = false;
}

// ==========================================
// 8. Bill Generation & Modal
// ==========================================
function generateBill() {
  const custName = customerNameInput.value.trim();
  const tableNo = tableNumberInput.value.trim();

  if (!custName) {
    alert("Please enter Customer Name before generating the bill.");
    customerNameInput.focus();
    return;
  }

  if (!tableNo) {
    alert("Please enter Table Number before generating the bill.");
    tableNumberInput.focus();
    return;
  }

  if (currentOrder.length === 0) {
    alert("Please add at least one item to the order.");
    return;
  }

  // Populate Bill Details
  const now = new Date();
  const invoiceId = "INV-" + Math.floor(1000 + Math.random() * 9000);
  
  recInvoiceNo.textContent = invoiceId;
  recDateTime.textContent = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  recCustName.textContent = custName;
  recTableNo.textContent = tableNo;

  // Render receipt items
  recItemsBody.innerHTML = currentOrder
    .map(
      (item) => `
      <tr>
        <td class="text-left">${item.name}</td>
        <td class="text-center">${item.qty}</td>
        <td class="text-right">₹${item.price.toFixed(2)}</td>
        <td class="text-right">₹${(item.price * item.qty).toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  const discountPercent = discountInput ? Math.min(100, Math.max(0, parseFloat(discountInput.value) || 0)) : 0;
  const subtotal = currentOrder.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const cgst = taxableAmount * 0.025; // 2.5% CGST
  const sgst = taxableAmount * 0.025; // 2.5% SGST
  const grandTotal = taxableAmount + cgst + sgst;

  recSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  if (recDiscountPercent) recDiscountPercent.textContent = discountPercent;
  if (recDiscount) recDiscount.textContent = `₹${discountAmount.toFixed(2)}`;
  recCgst.textContent = `₹${cgst.toFixed(2)}`;
  recSgst.textContent = `₹${sgst.toFixed(2)}`;
  recGrandTotal.textContent = `₹${grandTotal.toFixed(2)}`;

  // Show Modal
  billModal.classList.add("active");
}

function closeModal() {
  billModal.classList.remove("active");
}

function printBill() {
  window.print();
}

// ==========================================
// 9. Event Listeners
// ==========================================
categoryTabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab-btn")) {
    document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    currentCategory = e.target.dataset.category;
    renderMenu();
  }
});

menuSearch.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderMenu();
});

if (discountInput) {
  discountInput.addEventListener("input", updateOrderUI);
}

generateBillBtn.addEventListener("click", generateBill);
resetOrderBtn.addEventListener("click", clearOrder);
closeModalBtn.addEventListener("click", closeModal);
printBillBtn.addEventListener("click", printBill);

// Close modal when clicking outside card or pressing Escape
billModal.addEventListener("click", (e) => {
  if (e.target === billModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && billModal.classList.contains("active")) {
    closeModal();
  }
});

// Initialize on page load
renderMenu();
updateOrderUI();
