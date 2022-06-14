# Feed Watcher Frontend

## Frontend (PORT 3001)

### Stack

* TypeScript
* NextJS
* React
* React Bootstrap

### Installation

```
yarn install
yarn run dev
```

### Overview

The Frontend client is implemented with React, NextJS and React Bootstrap. This client is separate from the GraphQL app.

* There is no custom CSS and few base HTML components used. Most components are React Bootstrap.
* Relative/entry paths available:
    * / (landing page, with a link to the actual pagination page)
    * /objects/{pageNumber} (the pagination page)
* Dynamic Routing in NextJS was used to make the pagination page easy to implement and maintain.
    * Upon accessing the pagination route/URL, and loading the React page component, the page number is available via
      the `useRouter` hook, when `isReady = true`, then, an HTTP POST request is sent to the GraphQL endpoint, replacing
      only the page filter field in the GraphQL query.
    * This GraphQL query on top of the file `[page].tsx` has all the filter and sort fields required by the technical
      exercise.
    * After the response from the GraphQL endpoint is retrieved the results are immediately displayed on the pagination
      table.
    * Because the GraphQL response already returns pagination information in the `info` section of the `objects` response there is almost no
      calculations in displaying the pagination widget on the top and bottom of the pagination page.

### Areas to improve

* Fix lint issues.
* More meaningful tests/mocks.
* Move the GraphQL query constant to an enum class file or into specific query files (not code).
* Automatic GraphQL endpoint change between `dev` and `production`, apparently not easy to implement in NextJS.
* Implement the pagination table with React Bootstrap wrapper components.
* Move smaller functions out of the `objects` page. That would make it easier to simply support more entity pages in the
  future.
* Find a way to make backend GraphQL endpoint responses and frontend TypeScript Types interchangeable and reusable
  without code duplication.
* Add better page number validation/feedback.

### Vercel

This app is live at Vercel (`https://feed-watcher-frontend.vercel.app/objects/9`)

### Running tests

```
yarn test
```