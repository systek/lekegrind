# Backend

## MongoDB

Make sure you have MongoDB running. 
To import test-data from a JSON file:

    mongoimport -d lekegrind -c users users-1k.json

The command above will create a database "lekegrind" and a collection "users" containing data from the "users-1k.json" file.

