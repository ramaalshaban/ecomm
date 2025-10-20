const { CreateAdminNotificationConfigManager } = require("apiLayer");
const { z } = require("zod");

const NotificationPreferencesMcpController = require("../../NotificationPreferencesServiceMcpController");

class CreateAdminNotificationConfigMcpController extends NotificationPreferencesMcpController {
  constructor(params) {
    super(
      "createAdminNotificationConfig",
      "createadminnotificationconfig",
      params,
    );
    this.dataName = "adminNotificationConfig";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateAdminNotificationConfigManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        adminNotificationConfig: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            adminId: z
              .string()
              .uuid()
              .describe(
                "Admin owner of this notification config (must be an admin role user).",
              ),
            triggerEvents: z.array(
              z
                .string()
                .max(255)
                .describe(
                  "Array of event code strings (e.g. orderPlaced, paymentFailed) that trigger admin notification.",
                ),
            ),
            notifyBy: z.array(
              z
                .string()
                .max(255)
                .describe(
                  "Array of preferred notification channels (e.g., email, inApp).",
                ),
            ),
            enabled: z
              .boolean()
              .describe(
                "If false, no notifications will be sent; acts as a master enable/disable flag.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Stores notification configuration for administrators, specifying which system events should trigger notifications, preferred delivery channels, and enablement status.",
          ),
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
      triggerEvents: z
        .string()
        .max(255)
        .describe(
          "Array of event code strings (e.g. orderPlaced, paymentFailed) that trigger admin notification.",
        ),

      notifyBy: z
        .string()
        .max(255)
        .describe(
          "Array of preferred notification channels (e.g., email, inApp).",
        ),

      enabled: z
        .boolean()
        .describe(
          "If false, no notifications will be sent; acts as a master enable/disable flag.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createAdminNotificationConfig",
    description:
      "Create notification config settings for current admin. Only one config per adminId.",
    parameters: CreateAdminNotificationConfigMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new CreateAdminNotificationConfigMcpController(
        mcpParams,
      );
      try {
        const result = await controller.processRequest();
        //return CreateAdminNotificationConfigMcpController.getOutputSchema().parse(result);
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
