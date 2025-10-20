const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//A purchase order placed by a user, containing selected products, shipping info, total, and payment/lifecycle status. Integrated with Stripe for payment and refunds. Immutable after placed except for admin status/notes/stripe events.
const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      // User placing the order.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    items: {
      // Array of order items purchased (snapshot at time of order).
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
    },
    shippingAddress: {
      // Shipping address for the order (recipientName, addressLine1, addressLine2, city, region, postalCode, country, phone).
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    totalAmount: {
      // Total price (in cents) for all items + shipping, used for payment charging (stripeAmount).
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      // Currency code (ISO 4217, e.g., USD, EUR) for payment/stripe.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    status: {
      // Order lifecycle status. 0: pending, 1: paid, 2: processing, 3: shipped, 4: delivered, 5: cancelled, 6: refunded.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    paymentStatus: {
      // Payment status for Stripe: 0: unpaid, 1: paid, 2: refunded, 3: failed.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "unpaid",
    },
    placedAt: {
      // Timestamp when order was placed/created (for sorting/history).
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    stripePaymentIntentId: {
      // Reference to Stripe payment intent for this order. Used to track payment lifecycle and reconciliation.
      type: DataTypes.STRING,
      allowNull: true,
    },
    refundRequested: {
      // Indicates customer/admin has requested a refund for this order.
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    refundAmount: {
      // Amount to refund (in cents). Present if refund is requested/processed. Optional - null if not used/full refund.
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    adminNotes: {
      // Notes about the order (visible/editable by admins only).
      type: DataTypes.STRING,
      allowNull: true,
    },
    orderHistory: {
      // Event log of status/payment/history changes: array of {event:String, date:Date, note:String} for order audit trail.
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    isActive: {
      // isActive property will be set to false when deleted
      // so that the document will be archived
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["userId"],
      },
      {
        unique: false,
        fields: ["status"],
      },
      {
        unique: false,
        fields: ["placedAt"],
      },
      {
        unique: false,
        fields: ["stripePaymentIntentId"],
      },
      {
        unique: false,
        fields: ["refundRequested"],
      },

      {
        unique: true,
        fields: ["userId", "placedAt"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Order;
