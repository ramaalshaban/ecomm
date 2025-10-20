const { UpdateCartManager } = require("apiLayer");
const { z } = require("zod");

const CartMcpController = require("../../CartServiceMcpController");

class UpdateCartMcpController extends CartMcpController {
  constructor(params) {
    super("updateCart", "updatecart", params);
    this.dataName = "cart";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateCartManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        cart: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            userId: z.string().uuid().describe("User that owns the cart."),
            items: z.array(
              z
                .object()
                .describe(
                  "List of items (cartItem) in the cart. Each represents a product selection at time of add.",
                ),
            ),
            lastModified: z
              .string()
              .describe(
                "Last time the cart was modified (any change to items).",
              ),
            yuy: z.object().describe("null"),
            OI: z.boolean().describe("null"),
            frf: z.number().int().describe("null"),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a single user's shopping cart containing selected product items, their quantities, and state as of last update.",
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
      cartId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      items: z
        .object({})
        .optional()
        .describe(
          "List of items (cartItem) in the cart. Each represents a product selection at time of add.",
        ),

      yuy: z.object({}).optional().describe(""),

      OI: z.boolean().optional().describe(""),

      frf: z.number().int().optional().describe(""),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateCart",
    description:
      "Updates the user&#39;s cart contents, replacing items array and updating lastModified. Validates all items.",
    parameters: UpdateCartMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new UpdateCartMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return UpdateCartMcpController.getOutputSchema().parse(result);
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
