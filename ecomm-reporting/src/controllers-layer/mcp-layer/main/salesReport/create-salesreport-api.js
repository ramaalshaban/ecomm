const { CreateSalesReportManager } = require("apiLayer");
const { z } = require("zod");

const ReportingMcpController = require("../../ReportingServiceMcpController");

class CreateSalesReportMcpController extends ReportingMcpController {
  constructor(params) {
    super("createSalesReport", "createsalesreport", params);
    this.dataName = "salesReport";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateSalesReportManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        salesReport: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            dateRange: z
              .object()
              .describe("Reporting interval: {start, end} Date fields."),
            totalRevenue: z
              .number()
              .describe(
                "Sum of totalAmount for paid/completed orders in range.",
              ),
            orderCount: z
              .number()
              .int()
              .describe("Number of completed orders in the date range."),
            productCount: z
              .number()
              .int()
              .describe(
                "Unique products ordered in period (based on sold counts in orders).",
              ),
            bestsellers: z.array(
              z
                .object()
                .describe(
                  "Array of bestseller products in range: {productId, productName, soldCount}.",
                ),
            ),
            refundsTotal: z
              .number()
              .describe(
                "Sum of all refunded order amounts (in minor unit) in date range.",
              ),
            exportJobId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                "Optional link: the export job this report is attached to (if exported/snapshotted).",
              ),
          })
          .describe(
            "Aggregated business/sales analytics snapshot for defined date range (on-demand for reporting/dashboard).",
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
      dateRange: z
        .object({})
        .describe("Reporting interval: {start, end} Date fields."),

      totalRevenue: z
        .number()
        .describe("Sum of totalAmount for paid/completed orders in range."),

      orderCount: z
        .number()
        .int()
        .describe("Number of completed orders in the date range."),

      productCount: z
        .number()
        .int()
        .describe(
          "Unique products ordered in period (based on sold counts in orders).",
        ),

      bestsellers: z
        .object({})
        .describe(
          "Array of bestseller products in range: {productId, productName, soldCount}.",
        ),

      refundsTotal: z
        .number()
        .describe(
          "Sum of all refunded order amounts (in minor unit) in date range.",
        ),

      exportJobId: z
        .string()
        .uuid()
        .optional()
        .describe(
          "Optional link: the export job this report is attached to (if exported/snapshotted).",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createSalesReport",
    description:
      "On-demand aggregate sales/business analytics for given date range. Not persistent: this is a report query, not true create.",
    parameters: CreateSalesReportMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new CreateSalesReportMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return CreateSalesReportMcpController.getOutputSchema().parse(result);
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
