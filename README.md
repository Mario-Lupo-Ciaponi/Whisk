# 🐾 Whisk — Lost Pet Reunification Platform

> Connecting compassionate communities with pet owners in their time of need.

Whisk is a full-stack social platform dedicated to one purpose: **helping lost pets find their way home**. It brings together pet owners, volunteers, and shelters in a single, intuitive space where they can coordinate, communicate, and collaborate — because every pet deserves to come home.

---

## ✨ Overview

Losing a pet is a stressful, heartbreaking experience. Whisk was built to ease that burden by providing a structured, community-driven tool that makes it easy to report a missing animal, share sightings, and stay informed in real time.

Whether you're a pet owner raising the alarm, a volunteer keeping an eye out in your neighbourhood, or a shelter ready to offer support — Whisk is designed for you.

---

## 🚀 Key Features

### 🐕 Lost Pet Posts
Users can publish detailed posts about their missing pets, including a title, description, photo, and the city where the pet was last seen. Posts can be marked as **Found** once the pet is reunited with its owner, closing the loop for the community.

### 📍 Community Location Reporting
Any registered user can drop a **location pin** on an interactive map to report a sighting. Each pin captures precise GPS coordinates and, via reverse geocoding through the **LocationIQ API**, automatically resolves the coordinates into a human-readable street address. Post authors can validate sightings to flag the most reliable ones.

### 👥 City Groups
Users can create or join **city-based community groups** to organise local search efforts. Groups have owners and members, with support for admin roles within each group. This makes it easy to coordinate large-scale community searches at a local level.

### 🔔 Smart Notifications
Whisk keeps post authors in the loop automatically. Whenever another user comments on or reports a location for a post, the author receives an **in-app notification** and a **notification email** — both dispatched asynchronously so the experience stays fast. The notification badge in the navigation bar refreshes on a 30-second polling interval.

### 👤 User Profiles
Each user has a customisable profile with a profile photo (hosted on **Cloudinary**), a bio, a city, and an account type — one of **Pet Owner**, **Volunteer**, or **Shelter**. This helps community members understand who they're connecting with at a glance.

### 💬 Comments
Users can leave comments on posts to share tips, encouragement, or direct contact information. The comment system is tied to the notification pipeline, ensuring authors never miss a message.

### 🔖 Saved Posts
Users can bookmark posts and access them later from a dedicated **Saved Posts** page — ideal for volunteers who are actively tracking multiple missing pets at once.

### 🔍 User Search
A search feature lets users find and connect with other members of the Whisk community, fostering a tighter network.

### 📬 Contact Form
A built-in contact form allows anyone — authenticated or not — to get in touch with the Whisk team directly, with emails dispatched via **Mailgun** through `django-anymail`.

### 🌐 Internationalisation (i18n)
The frontend is fully internationalised using **i18next**, with automatic browser language detection and support for multiple locales (currently English and Bulgarian).

### 🛡️ Profanity Filtering
Content submitted through the platform is automatically screened for inappropriate language using **alt-profanity-check**, keeping the community safe and respectful.

---

## 🏗️ Architecture

Whisk is structured as a monorepo containing two independent applications:

```
Whisk/
├── backend/    # Django REST Framework API
└── frontend/   # React (Vite) SPA
```

### Backend
The backend is a RESTful API built with **Django 6** and **Django REST Framework**. It is split into focused Django apps:

| App | Responsibility |
|---|---|
| `accounts` | Custom user model (`WhiskUser`), profiles, authentication |
| `posts` | Posts, pet location pins, comments, saved posts |
| `groups` | City groups and membership management |
| `common` | Notifications, country & city lookups, contact form, signals |
| `config` | Project-wide settings, URL routing |

Authentication is handled via **JWT** using `djangorestframework-simplejwt`. Cross-origin requests are managed by `django-cors-headers`.

### Frontend
The frontend is a single-page application (SPA) built with **React 19** and bundled with **Vite**. Navigation is handled by **React Router v7**, and API communication is done through **Axios**. Interactive maps are powered by **Leaflet** and **react-leaflet**.

---

## 🧰 Technology Stack

### Backend
| Technology | Purpose |
|---|---|
| Python / Django 6 | Core web framework |
| Django REST Framework | RESTful API layer |
| PostgreSQL | Primary relational database |
| JWT (SimpleJWT) | Stateless authentication |
| Cloudinary | Media (image) hosting |
| LocationIQ API | Reverse geocoding for pet sightings |
| django-anymail / Mailgun | Transactional email delivery |
| django-cities-light | Country & city data |
| django-filter | API-level filtering |
| alt-profanity-check | Content moderation |
| Gunicorn | WSGI production server |
| Whitenoise | Static file serving |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool and dev server |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| Leaflet / React Leaflet | Interactive maps |
| i18next | Internationalisation |
| react-hot-toast | User-facing notifications |
| Font Awesome | Icon library |
| Day.js | Date formatting |

---

## 🗺️ Application Pages

| Page | Description |
|---|---|
| **Home** | Browse all active lost pet posts |
| **Post** | View a single post, its map pins, and comments |
| **Create Post** | Submit a new missing pet report |
| **Saved Posts** | Bookmarked posts for the authenticated user |
| **Groups** | Browse and join city-based community groups |
| **Create Group** | Start a new city group |
| **Profile** | View and edit personal profile information |
| **Search** | Search for other platform users |
| **Notifications** | View the full notification history |
| **Auth** | Login and registration |
| **Contact** | Send a message to the Whisk team |
| **About** | Learn more about the platform and its mission |

---

## 🔔 Notification System

The notification system is event-driven and operates at the signal level:

- When a **location pin** is added by a user who is not the post author → the author receives an in-app notification and an email.
- When a **comment** is posted by a user who is not the post author → the author receives an in-app notification and an email.

Emails are sent on background threads to keep API response times unaffected. In the UI, unread notifications are polled every **30 seconds** and surfaced as a badge count in the navbar.

---

## 👤 Account Types

Users self-identify with one of the following account types, which helps the community understand each member's role:

| Type | Description |
|---|---|
| **Pet Owner** | Individuals who have lost or are searching for a pet |
| **Volunteer** | Community members who actively assist in searches |
| **Shelter** | Animal shelters offering resources and rehoming support |

---

## ✅ Testing

The backend includes automated tests written with Django's `APITestCase`, covering:

- The contact form API (valid data, invalid email, missing fields)
- The unread notifications API (unauthenticated access, empty state, read/unread filtering, user isolation)

Frontend utility functions are tested using **Jest**.

---

## 📄 Licensing

© All rights reserved. Whisk is a proprietary platform. Unauthorised copying, distribution, or modification of any part of this codebase is strictly prohibited.
