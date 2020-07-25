const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

const getQuoteFromAPI = async () => {
  const API_URL = 'http://localhost:3050/magic';
  try {
    const resp = await fetch(API_URL);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const updateQuote = async () => {
  showLoadingSpinner();
  try {
    data = await getQuoteFromAPI();

    quoteText.innerText = data.quoteText;
    authorText.innerText =
      data.quoteAuthor !== '' ? data.quoteAuthor : 'Unknown';

    if (data.quoteText.length > 50) {
      quoteText.classList.add('quote-text-long');
    } else {
      quoteText.classList.remove('quote-text-long');
    }
  } catch (error) {
  } finally {
    removeLoadingSpinner();
  }
};

const tweetQuote = () => {
  const TWEET_URL = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;

  const quote = quoteText.innerText;
  const author = authorText.innerText;
  window.open(TWEET_URL, '_blank');
};

//event listener
newQuoteBtn.addEventListener('click', updateQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
updateQuote();