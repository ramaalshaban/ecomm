const { ListProductsManager } = require("apiLayer");
const { z } = require("zod");

const ProductCatalogMcpController = require("../../ProductCatalogServiceMcpController");

class ListProductsMcpController extends ProductCatalogMcpController {
  constructor(params) {
    super("listProducts", "listproducts", params);
    this.dataName = "products";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListProductsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        products: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            name: z
              .string()
              .max(255)
              .describe(
                "Product's name, displayed in catalog, used for search and filtering.",
              ),
            description: z
              .string()
              .optional()
              .nullable()
              .describe("Long form product description."),
            category: z
              .string()
              .max(255)
              .describe("Product category for filtering and organization."),
            price: z
              .number()
              .int()
              .describe("Product price in minor currency unit (cents)."),
            images: z.array(
              z.string().max(255).describe("Array of product image URLs."),
            ),
            availability: z
              .boolean()
              .optional()
              .nullable()
              .describe(
                "Derived: true if status == active and inventoryCount > 0. Otherwise, false. Not directly settable; computed.",
              ),
            status: z
              .enum(["active", "discontinued"])
              .describe(
                "Product status; 'active' for available products, 'discontinued' for non-sale.",
              ),
            inventoryCount: z
              .number()
              .int()
              .describe("Number of items in stock; 0 means out of stock."),
            sku: z
              .string()
              .max(255)
              .describe("Stock keeping unit—must be unique across products."),
            tags: z.array(
              z
                .string()
                .max(255)
                .optional()
                .nullable()
                .describe(
                  "Optional array of tags for product search or grouping.",
                ),
            ),
            weight: z
              .number()
              .optional()
              .nullable()
              .describe("Product weight, in grams."),
            dimensions: z
              .object()
              .optional()
              .nullable()
              .describe(
                "Object containing length, width, height (in cm or mm as schema decided by client/frontend).",
              ),
            attributes: z
              .object()
              .optional()
              .nullable()
              .describe(
                "Flexible object for variant/specification key-value pairs (e.g., color, material, custom properties).",
              ),
          })
          .describe(
            "Represents a product listed in the e-commerce catalog, with full searchable and filterable attributes including inventory, status, pricing, and dimensional details.",
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
    name: "listProducts",
    description:
      "List/search products, supports filters (name, category, price, status, tags, availability). Available to all users.",
    parameters: ListProductsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListProductsMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListProductsMcpController.getOutputSchema().parse(result);
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
