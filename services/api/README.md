# API service

NestJS composition root. HTTP controllers and websocket gateway are transport adapters only; application use cases own business workflows. All routes pass through authentication, input validation, rate limiting and centralized authorization. Websocket connections revalidate authorization on subscription and sensitive event delivery.
