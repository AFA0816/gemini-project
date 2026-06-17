# BigQuery Release Notes App

A modern, responsive web application that fetches and displays the latest [Google Cloud BigQuery Release Notes](https://docs.cloud.google.com/feeds/bigquery-release-notes.xml). 

This project was built as part of exploring the capabilities of Antigravity CLI, demonstrating an end-to-end flow from an idea to a fully functioning Flask and Vanilla JS/CSS application.

## Features

- **Live Data Fetching**: Retrieves real-time release notes directly from the official BigQuery Atom XML feed.
- **Modern UI/UX**: Designed with a sleek Dark Mode, Glassmorphism elements, and smooth micro-animations.
- **Responsive Grid**: Display notes in a grid system that adapts seamlessly across desktop and mobile devices.
- **One-Click Tweet**: Easily share any specific release note on Twitter (X) with pre-filled content and a direct link.
- **Dynamic Refresh**: Refresh the feed with a click of a button featuring an interactive spinner.

## Tech Stack

- **Backend**: Python 3.12, Flask, Feedparser, Requests
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Typography & Icons**: Google Fonts (Outfit), FontAwesome

## Getting Started

### Prerequisites

- Python 3.7+ installed on your system.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/YourUsername/gemini-project.git
   cd gemini-project
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   
   # On Windows
   .\venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask application**:
   ```bash
   python app.py
   ```

5. **Open your browser** and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## Project Structure

```text
.
├── app.py                  # Main Flask application and API endpoint
├── requirements.txt        # Python dependencies
├── .gitignore              # Git ignore file
├── static/
│   ├── css/
│   │   └── style.css       # Core styling, variables, animations
│   └── js/
│       └── script.js       # Logic for fetching API, UI states, Tweet builder
└── templates/
    └── index.html          # Main HTML structure
```

## Future Enhancements

- Implementing "Copy to clipboard" for note contents.
- Adding an "Export to CSV" functionality.
- Including a light/dark mode toggle switch.
