<!-- ABOUT THE PROJECT -->

## About The Project

This is a cryptocurrency metrics API that can get single metrics and aggregate metrics for any type of crypto asset. This uses [Messari's](https://messari.io/) backend API for requests. This project also caches aggregate metrics for quick response time

Features Include

- Getting all available tags and sectors.
- Getting single asset metrics and the latest news stories for that asset.
- Aggregate metrics about single or multiple sectors or tags.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Messari API](https://messari.io/api/docs)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nitro-neal/messari-crytpo-metrics-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Star the service
   ```sh
   npm start
   ```

<!-- USAGE EXAMPLES -->

## Usage

_For information on where the base information comes from examples, please refer to the [Messari Documentation](https://messari.io/api/docs)_

List all available sectors: `http://localhost3000/api/sectors`

List all available tags `http://localhost:${port}/api/tags`

Single asset metrics example: `http://localhost:${port}/api/asset/ltc`

Aggregate metrics example: `http://localhost:${port}/api/aggregate/?sectors=stablecoins,gaming`

- Aggregate metrics which takes in as query parameter for tags or sectors. If you use drop the s and use sector it will still work
- As examples ?sectors=gaming or ?tags=defi,oracle
- You can define multiple tags or sectors to aggregate.
- marketcap_dominance_vs_global_percent is the percent of your aggregate query marketcap compared to the entire crypto market
- volume_dominance_vs_global_percentis the percent of your aggregate query volume compared to the entire crypto market

<!-- CONTACT -->

## Contact

Your Name - [@NitroNeal](https://twitter.com/NitroNeal)

Project Link: [https://github.com/nitro-neal/messari-crytpo-metrics-api](https://github.com/nitro-neal/messari-crytpo-metrics-api)
