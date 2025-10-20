const { ListUserNotificationPreferencesManager } = require("apiLayer");
const { z } = require("zod");

const NotificationPreferencesMcpController = require("../../NotificationPreferencesServiceMcpController");

class ListUserNotificationPreferencesMcpController extends NotificationPreferencesMcpController {
  constructor(params) {
    super(
      "listUserNotificationPreferences",
      "listusernotificationpreferences",
      params,
    );
    this.dataName = "userNotificationPreferencess";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListUserNotificationPreferencesManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        userNotificationPreferencess: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            userId: z
              .string()
              .uuid()
              .describe("User owner of these notification preferences."),
            orderUpdates: z
              .boolean()
              .describe("Receive notifications for order status changes."),
            shippingUpdates: z
              .boolean()
              .describe("Receive notifications for shipping/tracking events."),
            promoOptIn: z
              .boolean()
              .describe(
                "Opt-in for receiving promotional or marketing notifications/emails.",
              ),
            paymentEvents: z
              .boolean()
              .describe(
                "Receive notifications for payment events (e.g. payment received, failed).",
              ),
            systemEvents: z
              .boolean()
              .optional()
              .nullable()
              .describe(
                "(Admin Only) Receive system/platform-level notifications. Ignored for regular users.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Stores notification preferences for a user, indicating which event types (order, shipping, promo, payment, system) they wish to receive notifications for.",
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
    name: "listUserNotificationPreferences",
    description: "Admin: List all user notification preference objects.",
    parameters: ListUserNotificationPreferencesMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListUserNotificationPreferencesMcpController(
        mcpParams,
      );
      try {
        const result = await controller.processRequest();
        //return ListUserNotificationPreferencesMcpController.getOutputSchema().parse(result);
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
