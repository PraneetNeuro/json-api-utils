# Why Japi?
1. You can see the JSON response structure
2. You can validate the JSON response with the one that you expect
3. You can see if the JSON response has an error property
4. Export file with JSON response structures for a given array of APIs 

# How to use Japi?
1. responseStructure(url) returns the structure of the JSON response
2. validate(url, structureExpected) returns if the json response received matches the one expected
3. hasError(json) returns if the the json has an error property
4. exportAllJSON(urls) creates a file with the structure of JSON responses for each api
