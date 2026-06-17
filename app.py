from flask import Flask, render_template, jsonify
import feedparser
import requests

app = Flask(__name__)

FEED_URL = "https://docs.cloud.google.com/feeds/bigquery-release-notes.xml"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/notes')
def get_notes():
    try:
        response = requests.get(FEED_URL)
        response.raise_for_status()
        feed = feedparser.parse(response.content)
        
        notes = []
        for entry in feed.entries:
            notes.append({
                'title': entry.title,
                'link': entry.link,
                'updated': entry.updated,
                'content': entry.content[0].value if 'content' in entry else entry.summary
            })
        return jsonify({'status': 'success', 'notes': notes})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
