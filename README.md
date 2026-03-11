# Flight Review Tool

A reviewer experience for M365 Copilot App feature flights that supports ship decisions, built with React, TypeScript, and Fluent UI v9.

![Flight Dashboard](https://github.com/user-attachments/assets/66220f31-ee75-40c1-af51-c558e70641b9)

## How to Run

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Feature Overview

The Flight Review Tool provides a three-pane dashboard for reviewing M365 Copilot App feature flights and making ship decisions.

### Three-Pane Layout
- **Left pane** — Navigation menu (Dashboard, My Reviews, Settings)
- **Center/Main** — Dashboard content area with flight table and summary cards
- **Right pane** — Filter controls and Metrics column selector

### Dashboard Page

- **Summary cards** showing Total Flights, Running, Completed, and Pending Review counts
- **Searchable flight table** — search by Flight ID, Flight Name, or Experimentation ID
- **Sortable columns** — click any column header to sort ascending/descending
- **Clickable flight names** — navigate to the Flight Detail page

### Right Pane Controls

#### Filters
Filter the flight table by:
- **Status** — Running, Completed, Paused, Pending Review
- **Product Area** — Excel, OneDrive, Outlook, SharePoint, Teams, Word
- **Team** — specific team names within each product area

#### Metrics Selector
Toggle which metric columns appear in the flight table:
- Crash Rate *(default on)*
- Error Rate *(default on)*
- Latency P50 *(default on)*
- Latency P99
- DAU *(default on)*
- Retention
- NPS
- Feature Adoption Rate

### Flight Detail Page

![Flight Detail Page](https://github.com/user-attachments/assets/e37edc6f-97a0-4086-a36e-259d46161d12)

- **Breadcrumb** navigation back to the dashboard
- **Flight ID** is a clickable external link to the actual flight URL
- **Comprehensive flight info** in a structured 2-column grid (ID, Owner, Product Area, Team, Status, Dates)
- **Description** section
- **All metrics** displayed in a card grid
- **Reviewer feedback** section with:
  - Free-text feedback input
  - Review decision with four options:
    - Don't Ship
    - Need More Info
    - Ship with Exception
    - Ship

## Key Interactions

| Interaction | Behavior |
|---|---|
| Type in search box | Filters table by Flight ID, Name, or Experimentation ID |
| Click column header | Sorts table by that column (click again to reverse) |
| Check Status/Product Area/Team filter | Narrows visible flights |
| Check/uncheck metric in right pane | Adds/removes that metric column from the table |
| Click flight name | Navigates to Flight Detail page |
| Click Flight ID on detail page | Opens actual flight URL in new tab |
| Click breadcrumb | Returns to dashboard |
| Select decision + enter feedback + Submit | Saves review decision and feedback |

## Project Structure

```
src/
├── types/
│   └── Flight.ts           # TypeScript interfaces
├── data/
│   └── mockData.ts         # 12 realistic sample flights
├── components/
│   ├── AppShell.tsx        # Three-pane layout wrapper
│   ├── LeftNav.tsx         # Vertical navigation
│   ├── RightPane.tsx       # Filter + Metrics host
│   ├── FilterPanel.tsx     # Status/Area/Team checkboxes
│   ├── MetricsSelector.tsx # Metric column toggles
│   ├── SummaryCards.tsx    # Overview stat cards
│   ├── SearchBar.tsx       # Flight search input
│   ├── FlightTable.tsx     # Sortable data table
│   └── ReviewForm.tsx      # Decision + feedback form
├── pages/
│   ├── Dashboard.tsx       # Main dashboard page
│   └── FlightDetail.tsx    # Flight detail page
├── App.tsx                 # React Router setup
└── main.tsx                # Entry point
```
