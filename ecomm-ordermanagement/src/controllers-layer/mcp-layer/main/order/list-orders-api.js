const { ListOrdersManager } = require("apiLayer");
const { z } = require("zod");

const OrderManagementMcpController = require("../../OrderManagementServiceMcpController");

class ListOrdersMcpController extends OrderManagementMcpController {
  constructor(params) {
    super("listOrders", "listorders", params);
    this.dataName = "orders";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListOrdersManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        orders: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            userId: z.string().uuid().describe("User placing the order."),
            items: z.array(
              z
                .object()
                .describe(
                  "Array of order items purchased (snapshot at time of order).",
                ),
            ),
            shippingAddress: z
              .object()
              .describe(
                "Shipping address for the order (recipientName, addressLine1, addressLine2, city, region, postalCode, country, phone).",
              ),
            totalAmount: z
              .number()
              .int()
              .describe(
                "Total price (in cents) for all items + shipping, used for payment charging (stripeAmount).",
              ),
            currency: z
              .string()
              .max(255)
              .describe(
                "Currency code (ISO 4217, e.g., USD, EUR) for payment/stripe.",
              ),
            status: z
              .enum([
                "pending",
                "paid",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
                "refunded",
              ])
              .describe(
                "Order lifecycle status. 0: pending, 1: paid, 2: processing, 3: shipped, 4: delivered, 5: cancelled, 6: refunded.",
              ),
            paymentStatus: z
              .enum(["unpaid", "paid", "refunded", "failed"])
              .describe(
                "Payment status for Stripe: 0: unpaid, 1: paid, 2: refunded, 3: failed.",
              ),
            placedAt: z
              .string()
              .describe(
                "Timestamp when order was placed/created (for sorting/history).",
              ),
            stripePaymentIntentId: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Reference to Stripe payment intent for this order. Used to track payment lifecycle and reconciliation.",
              ),
            refundRequested: z
              .boolean()
              .optional()
              .nullable()
              .describe(
                "Indicates customer/admin has requested a refund for this order.",
              ),
            refundAmount: z
              .number()
              .int()
              .optional()
              .nullable()
              .describe(
                "Amount to refund (in cents). Present if refund is requested/processed. Optional - null if not used/full refund.",
              ),
            adminNotes: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Notes about the order (visible/editable by admins only).",
              ),
            orderHistory: z.array(
              z
                .object()
                .optional()
                .nullable()
                .describe(
                  "Event log of status/payment/history changes: array of {event:String, date:Date, note:String} for order audit trail.",
                ),
            ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "A purchase order placed by a user, containing selected products, shipping info, total, and payment/lifecycle status. Integrated with Stripe for payment and refunds. Immutable after placed except for admin status/notes/stripe events.",
          )
          .array(),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      accessToken: z
        .string()
        .optional()
        .describe(
          "The access token which is returned from a login request or given by user. This access token will override if there is any bearer or OAuth token in the mcp client. If not given the request will be made with the system (bearer or OAuth) token. For public routes you dont need to deifne any access token.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "listOrders",
    description:
      "List/search orders (customer: own orders; admin: all). Filter by status, placedAt, userId.",
    parameters: ListOrdersMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListOrdersMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListOrdersMcpController.getOutputSchema().parse(result);
        console.log("Mcp Response Ready", JSON.stringify(result));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        console.log("Mcp Error Occured", err.message);
        //**errorLog
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: ${err.message}`,
            },
          ],
        };
      }
    },
  };
};
