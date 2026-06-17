document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const loader = document.getElementById('loader');
    const notesContainer = document.getElementById('notes-container');
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');
    const retryBtn = document.getElementById('retry-btn');

    const fetchNotes = async () => {
        // UI States
        refreshBtn.classList.add('loading');
        refreshBtn.disabled = true;
        loader.classList.remove('hidden');
        notesContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
        notesContainer.innerHTML = '';

        try {
            const response = await fetch('/api/notes');
            const data = await response.json();

            if (!response.ok || data.status === 'error') {
                throw new Error(data.message || 'Failed to fetch release notes.');
            }

            renderNotes(data.notes);
            
            loader.classList.add('hidden');
            notesContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching notes:', error);
            errorMessage.textContent = error.message;
            loader.classList.add('hidden');
            errorContainer.classList.remove('hidden');
        } finally {
            refreshBtn.classList.remove('loading');
            refreshBtn.disabled = false;
        }
    };

    const renderNotes = (notes) => {
        if (notes.length === 0) {
            notesContainer.innerHTML = '<div class="note-card"><p>No release notes found.</p></div>';
            return;
        }

        notes.forEach(note => {
            const card = document.createElement('div');
            card.className = 'note-card';

            // Clean up content for tweet text
            // Parse HTML to text
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = note.content;
            let plainText = tempDiv.textContent || tempDiv.innerText || "";
            plainText = plainText.trim().replace(/\s+/g, ' ');
            
            // Truncate for tweet
            let tweetContent = `BigQuery Update (${note.title}): ${plainText}`;
            if (tweetContent.length > 200) {
                tweetContent = tweetContent.substring(0, 197) + '...';
            }
            tweetContent += `\n\nRead more: ${note.link}`;
            
            const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;

            card.innerHTML = `
                <div class="note-header">
                    <div class="note-date">${note.title}</div>
                </div>
                <div class="note-content">
                    ${note.content}
                </div>
                <div class="note-actions">
                    <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" class="tweet-btn">
                        <i class="fab fa-twitter"></i> Tweet
                    </a>
                </div>
            `;
            notesContainer.appendChild(card);
        });
    };

    refreshBtn.addEventListener('click', fetchNotes);
    retryBtn.addEventListener('click', fetchNotes);

    // Initial fetch
    fetchNotes();
});
