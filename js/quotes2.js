const loadQuotes = () =>{
    fetch('https://api.kanye.rest/')
    .then(res => res.json())
    .then(data => displayQuotes(data))
}

const displayQuotes = quote => {
    const quoteField = document.getElementById('quotes');
    quoteField.innerHTML = quote.quote;
}

loadQuotes();