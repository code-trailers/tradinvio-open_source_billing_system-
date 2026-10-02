# TradInvio - Restaurant Billing System 🍽️

**TradInvio** is a lightweight, responsive, and intuitive Point of Sale (POS) & Restaurant Billing System built using **HTML5, CSS3, and Vanilla JavaScript**. It enables restaurant staff and managers to quickly manage orders, filter menu items by category or live search, track item quantities, calculate taxes (5% GST), and generate & print professional, thermal-printer-friendly customer receipts.

---

## ✨ Features

- **Categorized Menu Catalog**: Organized under Starters, Main Course, Beverages, and Desserts with veg/non-veg tags and pricing.
- **Instant Search & Filter**: Real-time search by dish name or ingredients with category tabs.
- **Interactive Order Cart**:
  - Add menu items with one click.
  - Increment/decrement item quantities.
  - Remove individual items or clear the entire order.
- **Customer & Table Details**: Input customer name and table number with validation.
- **Automated Billing Calculations**:
  - Itemized Subtotal calculation.
  - Automated 5% GST computation (2.5% CGST + 2.5% SGST).
  - Grand Total display updated in real-time.
- **Professional Bill & Receipt Modal**: Generates a clean, itemized invoice with date, time, and unique invoice ID.
- **Print Receipt**: One-click browser printing configured for standard paper and receipt printers via custom `@media print` CSS.
- **Zero Dependencies**: Pure HTML, CSS, and Vanilla JavaScript—no external libraries, frameworks, or backend needed.

---

## 📁 File Structure

```
tradinvio/
│
├── index.html        # Main semantic markup and receipt modal structure
├── style.css         # Modern, responsive POS styling & print stylesheet
├── script.js         # Menu data, cart state management & bill calculations
└── README.md         # Project documentation and guide
```

---

## 🚀 Getting Started

### Prerequisites

All you need is any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Brave).

### Running Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/code-trailers/tradinvio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tradinvio
   ```
3. Open `index.html` directly in your browser:
   - Double-click `index.html` in your file explorer, OR
   - Right-click `index.html` and choose **Open with... -> Browser**, OR
   - Run a simple local HTTP server (optional):
     ```bash
     npx serve .
     # or
     python -m http.server 8000
     ```

---

## 📄 License

This project is open-source and free to use for personal and educational purposes.
