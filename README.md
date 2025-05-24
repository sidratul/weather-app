# Angular 19 Weather App

This project is a weather application built with Angular 19. It retrieves weather data using the OpenWeatherMap API.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later is recommended)
- [Angular CLI](https://angular.io/cli) (version 19)

To install Angular CLI globally:

```bash
npm install -g @angular/cli@19
```

## Installation

1. Clone this repository:

```bash
git clone https://github.com/sidratul/weather-app.git
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the root directory with the following content:

```
WEATHER_API_KEY=your_openweathermap_api_key_here
```

> ⚠️ **Do not commit the `.env` file to version control.**  
> Make sure your Angular app is configured to load environment variables from `.env`. You can use libraries like [`ngx-env`](https://www.npmjs.com/package/@ngx-env/builder) or a custom setup.

## Running the Application

To start the development server:

```bash
ng serve
```

Then open your browser and navigate to:

```
http://localhost:4200
```

## Running Tests

To execute unit tests using Karma:

```bash
ng test
```

## Building for Production

To build the application for production:

```bash
ng build --configuration production
```
