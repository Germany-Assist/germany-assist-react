# Project Overview

This is a React frontend application with real-time notifications, filtering system, and user role management.

The system integrates with a REST API backend and uses WebSockets for live updates.

---

# Tech Stack

- React (Functional Components)
- React Hooks
- React Router (search params)
- Context API
- Tailwind CSS
- WebSockets (socket.io or similar)
- REST API

---

# Core Architecture

## State Management
- Local state for UI (modals, dropdowns, selections)
- Context API for global state (profile, socket)
- URL search params as source of truth for filters

## API Rules
- All API calls must be inside /api folder
- No direct fetch/axios inside components
- Always handle errors centrally

## Real-time Updates
- Use socket events for notifications
- Always cleanup listeners in useEffect

---

# Notifications System

- Supports read/unread state
- Supports bulk actions (mark as read/unread)
- Supports filtering via URL params
- Maintains unread counter in ProfileContext

Rules:
- New notification must be added instantly
- Optimistic UI updates must be used
- Profile unread counter must always sync

---

# Filtering System

Filters:
- readStatus (all / read / unread)
- isAdmin (true / false)

Rules:
- Filters must sync with URL (useSearchParams)
- Pagination resets on filter change
- URL is the source of truth

---

# UI Rules

- Use TailwindCSS only
- Use lucide-react for icons
- Keep components reusable
- Avoid logic inside JSX

---

# OpenCode Behavior Rules

When modifying this project:

- Always respect URL-driven filter system
- Never break socket listeners
- Always maintain optimistic UI logic
- Do not remove profile unread sync
- Keep API layer separated from UI
- Avoid unnecessary state duplication

---

# Performance Rules

- Avoid unnecessary re-renders
- Use useCallback for API functions
- Do not refetch unless filters change
- Clean socket listeners properly