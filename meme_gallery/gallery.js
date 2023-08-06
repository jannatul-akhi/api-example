// console.log('gallery meme')

const loadMeme = () =>{
    const url = "https://meme-api.com/gimme/20";
    fetch(url)
    .then(res => res.json())
    .then(data => showMeme(data.memes))
    .catch(error => console.log(error))
}

const showMeme = memes => {
    memes.slice(0, 20).forEach(meme => {
        console.log(meme.url)
        const memeContainer = document.getElementById('section');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-full glass shadow-2xl">
        <figure><img class="w-full h-64" src="${meme.url}" alt="car!"/></figure>
        </div>
        `;
        memeContainer.appendChild(div);
    });
}

loadMeme();