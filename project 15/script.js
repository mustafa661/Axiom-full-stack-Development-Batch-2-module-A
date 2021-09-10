// Get DOM elements
// get the search form 
const form = document.getElementById('form');
// get the input text field
const search = document.getElementById('search');
// get the results container
const results = document.getElementById('results');
// get the pagination container
const pagination = document.getElementById('pagination');

// base URL for API fetch
const api = 'https://api.lyrics.ovh';

// functions
// 1. function to search song title and artist
async function searchSongs(term) {
    const res = await fetch(`${api}/suggest/${term}`);
    const data = await res.json();
    
    console.log(data);
    showData(data);
}

// 2. function to display data from search in the DOM
function showData(data) {
    // display the first set of songs in the DOM 
    results.innerHTML = `
        <ul class="songs">
            ${data.data.map( 
                    song => `
                        <li>
                            <span>${song.artist.name} - ${song.title}</span>
                            <button class="btn" data-artist="${song.artist.name}" data-title${song.title}>Get Lyrics</button>

                        </li>
                    `
                ).join('')
            }
        </ul>
    `;

    // add pagination if required
    if ( data.prev || data.next ) {
        pagination.innerHTML = `
            ${ data.prev ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>` : '' }
            ${ data.next ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>` : '' }
        `;
    } else {
        pagination.innerHTML = '';
    }
} 

// 3. function to get the previous or next songs
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    
    showData(data);
}

// 4. function to get the lyrics of a song
async function getLyrics(artist, title) {
    const res = await fetch(`${api}/v1/${artist}/${title}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '</br>');

    results.innerHTML = `
        <h2>${artist} - ${title}</h2>
        <p>${lyrics}</p>
    `;

    pagination.innerHTML = '';
}

// event listeners
// 1. event listener for search form
form.addEventListener('submit', e => {
    // prevent the reload of page on submit
    e.preventDefault();
    // Get the search term from the input field
    const searchTerm = search.value.trim();
    // check if search term is valid
    if (searchTerm) {
        searchSongs(searchTerm);
    } else {
        alert('Please enter a valid search')
    }
})

// 2. event listener to get lyrics to a song on click a button
results.addEventListener('click', e => {
    // find out what was clicked 
    const clickedElement = e.target;
    // check if clicked element is a button
    if ( clickedElement.tagName === 'BUTTON') {
        // get artist and song title from html5 custom properties on button
        const artist = clickedElement.getAttribute('data-artist');
        const title = clickedElement.getAttribute('data-title');
        // now fetch the lyrics
        getLyrics(artist, title);
    }
})