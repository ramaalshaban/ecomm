ReferenceError: /app/src/bff/docs/event-guide.ejs:33
31| ### Kafka Event Listener: <%= dataView.mainObject %>-created
32|

> > 33| **Event Topic**: `elastic-index-<%= project.codename %>_<%= dataView.mainObject %>-created`

    34|
    35| When a `<%= dataView.mainObject %>` is created in the ElasticSearch index, this listener is triggered. It parses the event payload, extracts the entity ID, and invokes the `<%= dataView.name %>AggregateData` function to enrich and store the final document in the related index.
    36|

project is not defined
