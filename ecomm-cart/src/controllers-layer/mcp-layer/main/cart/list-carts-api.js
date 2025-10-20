const { ListCartsManager } = require("apiLayer");
const { z } = require("zod");

const CartMcpController = require("../../CartServiceMcpController");

class ListCartsMcpController extends CartMcpController {
  constructor(params) {
    super("listCarts", "listcarts", params);
    this.dataName = "carts";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListCartsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        carts: z
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
    name: "listCarts",
    description:
      "Admin: List all user carts (for analytics or support). Restricted to admin.",
    parameters: ListCartsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListCartsMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListCartsMcpController.getOutputSchema().parse(result);
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
