# User Management System 

## Feature 
- A simple system where users details can be added, modified and deleted.

## Backend
- Node.js, Express.js, MongoDB

## Frontend
- React.js, CSS

## Challenges

- ID number of users:
Id numbering of users was bit challenging at first. Default Id was fetching which consists long digits and looks dull.
Solution: I used another counter schema and implemented to track users order wise.

- Pagination:
Challenge: Implementing pagination was tricky, especially when dealing with large datasets. Ensuring that users were correctly divided into pages and that only the appropriate records were shown required additional logic to handle both the display and navigation between pages.
Solution: I implemented the logic using the currentPage and usersPerPage states, dynamically adjusting the displayed users using slice.

- Challenge: Integrating the frontend with the backend API was a bit challenging, especially when ensuring the right data was fetched and properly updated. Handling asynchronous operations like fetching, adding, editing, and deleting users often resulted in inconsistent states when the data wasn't refreshed as expected.
Solution: I used axios to handle requests and ensured that the state was properly updated after each operation (e.g., refreshing the user list after adding, editing, or deleting users).

Note: 
1) To run this application fork this and install node_modules.
2) In the config.js file in backend, please change link of mongoDB connection link, as I tested it in localhost.
3) change the localhost port number accordingly.
