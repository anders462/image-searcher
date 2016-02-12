# Image Search Abstraction Layer

Uses: API: Node.js/Express.js: Example Client Implementation: jQuery, Javascript, Bootstrap, HTML, CSS

1. User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

2. User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

3. User Story: I can get a list of the most recently submitted search strings.


Example API usage:
Image search: https://image-searcher.herokuapp.com/api/search/cats%20funny

Pagination: https://image-searcher.herokuapp.com/api/search/lolcats%20funny/5

Latest Searches: https://image-searcher.herokuapp.com/api/latest/

Example output in JSON:

Search: [ { "context": "http://bonuscats.com/funny-cats", "thumbnail": "http://ts3.mm.bing.net/th?id=OIP.M51588078331fb12f8ea48f6152131e52o0&pid=15.1", "snippet": "Funny cats → Check out this funny cat Tuesday (07)", "url": "http://bonuscats.com/images/funnycats-55630.jpg" }, ..... ]

Latest: [ { "term": "cat funny", "date": "2016-01-13T20:30:00.196Z" }, .... ]


Live URL: https://image-searcher.herokuapp.com/
