Feature: Get User

@mytag
Scenario: read existing user profile
	When http get api/User/1 is called
	Then the service should return
	    |User|
	    |{"id":1,"firstName":"Mary","lastName":"Tucker","address":{"street":"1 Swallow Place","zip":"52124-8204","city":"Copiague","country":"United States"},"email":"mtucker0@va.gov","ipAddress":"81.107.186.88","username":"mtucker0","password":"T64keMpZCqSh","ssn":"589-85-4341","language":"Portuguese","regDate":"16.10.2013","location":{"lat":"40.68149","lon":"-73.39984"}}|
