const { GetPaymentCustomerByUserIdManager } = require("apiLayer");
const { z } = require("zod");

const OrderManagementMcpController = require("../../OrderManagementServiceMcpController");

class GetPaymentCustomerByUserIdMcpController extends OrderManagementMcpController {
  constructor(params) {
    super("getPaymentCustomerByUserId", "getpaymentcustomerbyuserid", params);
    this.dataName = "sys_paymentCustomer";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetPaymentCustomerByUserIdManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        sys_paymentCustomer: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            userId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                " An ID value to represent the user who is created as a stripe customer",
              ),
            customerId: z
              .string()
              .max(255)
              .describe(
                "A string value to represent the customer id which is generated on the Stripe gateway. This id is used to represent the customer in the Stripe gateway",
              ),
            platform: z
              .string()
              .max(255)
              .describe(
                "A String value to represent payment platform which is used to make the payment. It is stripe as default. It will be used to distinguesh the payment gateways in the future.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "A payment storage object to store the customer values of the payment platform",
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
    };
  }
}

module.exports = (headers) => {
  return {
    name: "getPaymentCustomerByUserId",
    description:
      "This route is used to get the payment customer information by user id.",
    parameters: GetPaymentCustomerByUserIdMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new GetPaymentCustomerByUserIdMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return GetPaymentCustomerByUserIdMcpController.getOutputSchema().parse(result);
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
