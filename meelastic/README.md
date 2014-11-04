# Meelastic = Meetup + Elastic

This project connects the live WebSocket stream from [Meetup.com](http://meetup.com) 
together with [ElasticSearch](http://www.elasticsearch.org) database.

A simple Angular+Bootstrap user interface lets you search, view live data see data visualizations.

The real background for the project is to learn more about ElasticSearch, WebSockets, Node, Angular, Bootstrap and data visualization.

## Prerequisites

We assume following is installed and running at your localhost:

* ElasticSearch running at localhost:9200 (default config)
* Node and Npm
* Bower

## Install Dependencies

Install backend dependencies using npm:

```
cd backend
npm install
```

Install frontend dependencies using bower:

```
cd frontend
bower install
```

## Run the Application

Start the server from the `meelastic/bin`directory:

```
cd bin
node server
```

The server should connect to Meetup API, start receiving live events, and storing these into the ElasticSearch database.
Now browse to the app at `http://localhost:3000`

## Some final config...

If you want the "Top list" page to work correctly, you need to issue the following command:

```
curl -d '{"meelastic" : { "properties" : { "group" : { "properties": { "group_city": { "type" : "multi_field", "fields" : { "group_city" : {"type" : "string", "index" : "analyzed"}, "raw" : {"type" : "string", "index" : "not_analyzed"} } } } } } } }' http://localhost:9200/lekegrind/meelastic/_mapping
curl -d '{"meelastic" : { "properties" : { "group" : { "properties": { "group_name": { "type" : "multi_field", "fields" : { "group_name" : {"type" : "string", "index" : "analyzed"}, "raw" : {"type" : "string", "index" : "not_analyzed"} } } } } } } }' http://localhost:9200/lekegrind/meelastic/_mapping
curl -d '{"meelastic" : { "properties" : { "event" : { "properties": { "event_name": { "type" : "multi_field", "fields" : { "event_name" : {"type" : "string", "index" : "analyzed"}, "raw" : {"type" : "string", "index" : "not_analyzed"} } } } } } } }' http://localhost:9200/lekegrind/meelastic/_mapping
```