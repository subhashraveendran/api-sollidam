# Sollidam API

A serverless geocoding system for Tamil Nadu. Converts GPS coordinates to unique 3-word codes (and vice versa) using a transparent, offline-ready algorithm.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [API Usage](#api-usage)
- [Deployment](#deployment)
- [License](#license)
- [Author](#author)

---

## Overview

Sollidam API provides a simple way to encode and decode geographic coordinates into memorable three-word codes, specifically designed for Tamil Nadu. It's built for reliability, transparency, and offline readiness.

---

## Features

- **GPS to Code Conversion:** Transform latitude and longitude into unique 3-word codes.
- **Code to GPS Conversion:** Reverse lookup for getting GPS coordinates from codes.
- **Offline Algorithm:** Works without external dependencies or internet.
- **Transparent Logic:** Open-source and auditable conversion algorithm.
- **Serverless Deployment:** Easily deploy on Vercel for scalability.

---

## Technology Stack

- **JavaScript** (Node.js)
- **Serverless Functions** (Vercel)
- **RESTful API endpoints**

---

## Getting Started

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/subhashraveendran/api-sollidam.git
    cd api-sollidam
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run locally**
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:3000`.

---

### API Usage

#### Encode GPS to 3-word Code

- **Endpoint:** `/api/encode`
- **Method:** `GET`
- **Params:** `lat`, `lng`
- **Example:**  
    ```
    /api/encode?lat=12.9716&lng=77.5946
    ```
- **Response:**  
    ```json
    { "code": "word1.word2.word3" }
    ```

#### Decode 3-word Code to GPS

- **Endpoint:** `/api/decode`
- **Method:** `GET`
- **Params:** `code`
- **Example:**  
    ```
    /api/decode?code=word1.word2.word3
    ```
- **Response:**  
    ```json
    { "lat": 12.9716, "lng": 77.5946 }
    ```

---

## Deployment

You can easily deploy this API to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/subhashraveendran/api-sollidam)

---

## License

This project is open-source. Please refer to the repository for license details.

---

## Author

Maintained by [Subhash Raveendran](https://github.com/subhashraveendran).

\#NenjeEzhu
