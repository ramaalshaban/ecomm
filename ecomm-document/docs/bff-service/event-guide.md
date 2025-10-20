# EVENT API GUIDE

## BFF SERVICE

The BFF service is a microservice that acts as a bridge between the client and backend services. It provides a unified API for the client to interact with multiple backend services, simplifying the communication process and improving performance.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to.  
For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

**Email**:

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

## Documentation Scope

Welcome to the official documentation for the BFF Service Event Listeners. This guide details the Kafka-based event listeners responsible for reacting to ElasticSearch index events. It describes listener responsibilities, the topics they subscribe to, and expected payloads.

**Intended Audience**  
This documentation is intended for developers, architects, and system administrators involved in the design, implementation, and maintenance of the BFF Service. It assumes familiarity with microservices architecture, the Kafka messaging system, and ElasticSearch.

**Overview**  
Each ElasticSearch index operation (create, update, delete) emits a corresponding event to Kafka. These events are consumed by listeners responsible for executing aggregate functions to ensure index- and system-level consistency.

## Kafka Event Listeners

  

### Kafka Event Listener: order-created

**Event Topic**: `elastic-index-ecomm_order-created`

When a `order` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `CustomerOrderListViewAggregateData` function to enrich and store the final document in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: order-updated

**Event Topic**: `elastic-index-ecomm_order-updated`

When a `order` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `CustomerOrderListViewAggregateData` function to update the enriched document in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: order-deleted

**Event Topic**: `elastic-index-ecomm_order-deleted`

When a `order` is deleted in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `CustomerOrderListViewAggregateData` function to handle removal or cleanup in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```


### Kafka Event Listener: orderitem-created

**Event Topic**: `elastic-index-orderitem-created`

When a `orderitem` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `itemsReCustomerOrderListView` function to update dependent documents in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: orderitem-updated

**Event Topic**: `elastic-index-ecomm_orderitem-updated`

When a `orderitem` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `itemsReCustomerOrderListView` function to re-enrich dependent data in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: orderitem-deleted

**Event Topic**: `elastic-index-ecomm_orderitem-deleted`

When a `orderitem` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `itemsReCustomerOrderListView` function to handle dependent data cleanup or updates.

**Expected Payload**:
```json
{
  "id": "String"
}
```


### Kafka Event Listener: user-created

**Event Topic**: `elastic-index-user-created`

When a `user` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `userReCustomerOrderListView` function to update dependent documents in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-updated

**Event Topic**: `elastic-index-ecomm_user-updated`

When a `user` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `userReCustomerOrderListView` function to re-enrich dependent data in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-deleted

**Event Topic**: `elastic-index-ecomm_user-deleted`

When a `user` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `userReCustomerOrderListView` function to handle dependent data cleanup or updates.

**Expected Payload**:
```json
{
  "id": "String"
}
```



  
  
  

### Kafka Event Listener: product-created

**Event Topic**: `elastic-index-ecomm_product-created`

When a `product` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `ProductListViewAggregateData` function to enrich and store the final document in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: product-updated

**Event Topic**: `elastic-index-ecomm_product-updated`

When a `product` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `ProductListViewAggregateData` function to update the enriched document in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: product-deleted

**Event Topic**: `elastic-index-ecomm_product-deleted`

When a `product` is deleted in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `ProductListViewAggregateData` function to handle removal or cleanup in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```



  

### Kafka Event Listener: salesreport-created

**Event Topic**: `elastic-index-ecomm_salesreport-created`

When a `salesreport` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `SalesDashboardViewAggregateData` function to enrich and store the final document in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: salesreport-updated

**Event Topic**: `elastic-index-ecomm_salesreport-updated`

When a `salesreport` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `SalesDashboardViewAggregateData` function to update the enriched document in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: salesreport-deleted

**Event Topic**: `elastic-index-ecomm_salesreport-deleted`

When a `salesreport` is deleted in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `SalesDashboardViewAggregateData` function to handle removal or cleanup in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```


### Kafka Event Listener: salesreport-created

**Event Topic**: `elastic-index-salesreport-created`

When a `salesreport` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `bestsellersReSalesDashboardView` function to update dependent documents in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: salesreport-updated

**Event Topic**: `elastic-index-ecomm_salesreport-updated`

When a `salesreport` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `bestsellersReSalesDashboardView` function to re-enrich dependent data in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: salesreport-deleted

**Event Topic**: `elastic-index-ecomm_salesreport-deleted`

When a `salesreport` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `bestsellersReSalesDashboardView` function to handle dependent data cleanup or updates.

**Expected Payload**:
```json
{
  "id": "String"
}
```


### Kafka Event Listener: exportjob-created

**Event Topic**: `elastic-index-exportjob-created`

When a `exportjob` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `exportJobReSalesDashboardView` function to update dependent documents in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: exportjob-updated

**Event Topic**: `elastic-index-ecomm_exportjob-updated`

When a `exportjob` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `exportJobReSalesDashboardView` function to re-enrich dependent data in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: exportjob-deleted

**Event Topic**: `elastic-index-ecomm_exportjob-deleted`

When a `exportjob` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `exportJobReSalesDashboardView` function to handle dependent data cleanup or updates.

**Expected Payload**:
```json
{
  "id": "String"
}
```


### Kafka Event Listener: user-created

**Event Topic**: `elastic-index-user-created`

When a `user` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `adminReSalesDashboardView` function to update dependent documents in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-updated

**Event Topic**: `elastic-index-ecomm_user-updated`

When a `user` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `adminReSalesDashboardView` function to re-enrich dependent data in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-deleted

**Event Topic**: `elastic-index-ecomm_user-deleted`

When a `user` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `adminReSalesDashboardView` function to handle dependent data cleanup or updates.

**Expected Payload**:
```json
{
  "id": "String"
}
```



  
  
  
  
  

### Kafka Event Listener: salesreport-created

**Event Topic**: `elastic-index-ecomm_salesreport-created`

When a `salesreport` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `SalesReportDashboardViewAggregateData` function to enrich and store the final document in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: salesreport-updated

**Event Topic**: `elastic-index-ecomm_salesreport-updated`

When a `salesreport` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `SalesReportDashboardViewAggregateData` function to update the enriched document in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: salesreport-deleted

**Event Topic**: `elastic-index-ecomm_salesreport-deleted`

When a `salesreport` is deleted in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `SalesReportDashboardViewAggregateData` function to handle removal or cleanup in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```


### Kafka Event Listener: exportjob-created

**Event Topic**: `elastic-index-exportjob-created`

When a `exportjob` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `exportJobReSalesReportDashboardView` function to update dependent documents in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: exportjob-updated

**Event Topic**: `elastic-index-ecomm_exportjob-updated`

When a `exportjob` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `exportJobReSalesReportDashboardView` function to re-enrich dependent data in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: exportjob-deleted

**Event Topic**: `elastic-index-ecomm_exportjob-deleted`

When a `exportjob` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `exportJobReSalesReportDashboardView` function to handle dependent data cleanup or updates.

**Expected Payload**:
```json
{
  "id": "String"
}
```


### Kafka Event Listener: user-created

**Event Topic**: `elastic-index-user-created`

When a `user` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `requestedByUserReSalesReportDashboardView` function to update dependent documents in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-updated

**Event Topic**: `elastic-index-ecomm_user-updated`

When a `user` is updated in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `requestedByUserReSalesReportDashboardView` function to re-enrich dependent data in the related index.

**Expected Payload**:
```json
{
  "id": "String"
}
```

### Kafka Event Listener: user-deleted

**Event Topic**: `elastic-index-ecomm_user-deleted`

When a `user` is deleted from the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `requestedByUserReSalesReportDashboardView` function to handle dependent data cleanup or updates.

**Expected Payload**:
```json
{
  "id": "String"
}
```



  
  
  
  


