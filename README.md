# Event Management System

A full-stack Event Management System built with Django REST Framework and React. The platform allows organizers to create and manage events while users can browse, register for, and manage their event registrations.

## Features

### Authentication

* JWT-based authentication using SimpleJWT
* Secure login system
* Protected API endpoints
* Role-based access control

### Event Management

* Create events
* View all events
* View event details
* Update event information
* Delete events
* Search events

### Registration Management

* Register for events
* View personal registrations
* Cancel registrations
* Registration deadline validation
* Capacity tracking

### Organizer Dashboard

* View created events
* Track registration counts
* Edit event details
* Delete events

## Tech Stack

### Backend

* Python
* Django
* Django REST Framework
* SimpleJWT Authentication
* SQLite Database

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Bootstrap

## Project Structure

EventManagementSystem/

├── config/

├── events/

├── users/

├── manage.py

└── event-frontend/

```
├── src/

├── public/

└── package.json
```

## API Endpoints

### Authentication

POST /api/token/

POST /api/token/refresh/

### Events

GET /api/events/

POST /api/events/

GET /api/events/<id>/

PUT /api/events/<id>/update/

DELETE /api/events/<id>/delete/

### Registrations

POST /api/events/<id>/register/

GET /api/my-registrations/

DELETE /api/registrations/<id>/cancel/

### Organizer

GET /api/my-events/

## Installation

### Backend Setup

1. Clone the repository

git clone <repository-url>

2. Create virtual environment

python -m venv venv

3. Activate virtual environment

Windows:

venv\Scripts\activate

4. Install dependencies

pip install -r requirements.txt

5. Run migrations

python manage.py migrate

6. Start server

python manage.py runserver

Backend runs on:

http://127.0.0.1:8000/

### Frontend Setup

1. Navigate to frontend folder

cd event-frontend

2. Install dependencies

npm install

3. Start frontend

npm run dev

Frontend runs on:

http://localhost:5173/

## Future Improvements

* Email notifications
* QR-code event tickets
* Event categories
* Event image uploads
* Attendance tracking
* Analytics dashboard
* Deployment with Docker

## Author

Aishwarya

## License

This project is for educational and portfolio purposes.
