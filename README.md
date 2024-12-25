# Web Application for Construction and Renovation Company

This project is a modern web application designed for a construction and renovation company. It is built using the Fresh framework, leveraging cutting-edge web technologies to deliver a fast and user-friendly experience. The application connects seamlessly with a separate API, **smlynski-api**, for data management and integration.

## Technologies Used

- **Fresh Framework**: For building dynamic, server-rendered web applications using Deno and Preact.
- **Deno**: A secure and modern runtime for JavaScript and TypeScript.
- **Preact**: A lightweight alternative to React, offering fast rendering and a modern API.
- **Tailwind CSS**: A utility-first CSS framework that simplifies responsive and modern styling.

## Features

- **Dynamic Content**: The application dynamically fetches and displays data from **smlynski-api**.
- **Responsive Design**: Styled with Tailwind CSS to ensure compatibility with various devices.
- **Server-Side Rendering (SSR)**: Ensures fast loading and optimized SEO.
- **Modern User Interface**: Utilizes Preact for a sleek and responsive UI.

## Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

2. ***Install Deno:***

   Download and install Deno from [deno.com](https://deno.com/).

3. ***Set Environment Variables:*** 

    Create a .env file and provide necessary configuration. Use .env.example as a template.

4. ***Run the Development Server:*** 

   Start the server using the provided Deno task:

  ```bash
  deno run --allow-net --allow-read --unstable --watch server.ts
  ```