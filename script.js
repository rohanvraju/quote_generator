let apiQuotes = [];
let localSource = false;

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const toggleBtn = document.getElementById('toggle');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loader
function completeLoading(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

function newQuote(){
    //radomly pick quote
    let quote = '';
    if(!localSource){
        quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    } else {
        quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    }

    loading();

    console.log(quote);

    //if author field is empty, author = "unknown"
    if(quote.author === ''){
        authorText.innerText = 'Unknown'
    } else{
        authorText.innerText = quote.author;
    }

    //Squidward name easter egg
    if(authorText.innerText === 'Squidward Tentacles'){
        let squidChance = Math.random() * 100;
        if(squidChance > 75){
            authorText.innerText = 'Squidward Tennisballs'
        }
        if(squidChance > 87){
            authorText.innerText = 'Squidward Tortellini'
        }
    }

    
    //reduce font size for long quotes
    if(quote.text.length > 120){
        quoteText.classList.add("long-quote");
    } else{
        quoteText.classList.remove("long-quote");
    }

    //get quote text
    quoteText.innerText = quote.text

    completeLoading();
}

//tweet functionality
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
toggleBtn.addEventListener('click', toggleQuoteSource);

//Get quote from API
async function getQuote(){
    const apiUrl = 'https://type.fit/api/quotes';

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch(error){
        //getQuote();
        console.log('No quote', error);
    }
}

//toggle source of quotes b/w local and API
function toggleQuoteSource(){
    localSource = !localSource;
}

//On load
getQuote();
//newQuote();