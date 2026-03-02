/**
 * Intentional maintainability issues for SonarQube maintainability/code smell testing.
 */

// Code smell: Too many parameters (max typically 7)
function createBooking(userId, userName, userEmail, checkIn, checkOut, guests, roomType, specialRequests, paymentMethod, notes) {
  return { userId, userName, userEmail, checkIn, checkOut, guests, roomType, specialRequests, paymentMethod, notes };
}

// Code smell: Cognitive complexity - deeply nested conditionals
function getDiscountTier(purchases, memberYears, isVIP, hasCoupon, referralCount) {
  if (purchases > 1000) {
    if (memberYears > 5) {
      if (isVIP) {
        return 'platinum';
      } else {
        if (hasCoupon) {
          return 'gold';
        } else {
          if (referralCount > 10) {
            return 'gold';
          } else {
            return 'silver';
          }
        }
      }
    } else {
      if (memberYears > 2) {
        if (hasCoupon) return 'silver';
        return 'bronze';
      }
      return 'bronze';
    }
  } else {
    if (purchases > 500) {
      return memberYears > 3 ? 'bronze' : 'none';
    }
    return 'none';
  }
}

// Code smell: Long function / too many statements
function processOrder(order) {
  const a = order.items.length;
  const b = order.shippingAddress;
  const c = order.payment;
  const d = order.customerId;
  const e = order.couponCode;
  const f = order.timestamp;
  const g = order.metadata;
  const h = order.source;
  const i = order.priority;
  const j = order.notes;
  const k = a * 2;
  const l = b ? 1 : 0;
  const m = c ? 1 : 0;
  const n = d || 'guest';
  const o = e || null;
  const p = f || Date.now();
  const q = g || {};
  const r = h || 'web';
  const s = i || 'normal';
  const t = j || '';
  return { k, l, m, n, o, p, q, r, s, t };
}

// Bug: Empty catch block
function safeParse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // intentionally empty for Sonar test
  }
  return null;
}

// Code smell: Duplicate string literal
function getErrorMessage(code) {
  if (code === 404) return 'Resource not found';
  if (code === 500) return 'Internal server error';
  if (code === 403) return 'Forbidden';
  return 'Unknown error';
}

function getHttpStatusText(code) {
  if (code === 404) return 'Resource not found';
  if (code === 500) return 'Internal server error';
  return 'OK';
}

// Code smell: Boolean complexity
function shouldShowPromo(isLoggedIn, hasPurchased, isNewUser, hasDiscount, country) {
  return (isLoggedIn && hasPurchased) || (isNewUser && !hasDiscount) || (country === 'US' && isLoggedIn) || (!hasPurchased && isNewUser);
}

module.exports = {
  createBooking,
  getDiscountTier,
  processOrder,
  safeParse,
  getErrorMessage,
  getHttpStatusText,
  shouldShowPromo
};
