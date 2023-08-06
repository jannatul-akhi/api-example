const searchAllData = (id) => {
    const inputElement = document.getElementById('search value');
    document.getElementById('single-player-details').innerHTML = '';
    document.getElementById('male').classList.add('d-none');
    document.getElementById('female').classList.add('d-none');
    const inputValue = inputElement.value;
    document.getElementById('spinner').classList.remove('d-none')

    const searchId = id || inputValue;

    const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
          document.getElementById('spinner').classList.add('d-none')
          showPlayerData(data.player)
        })
}

const showPlayerData = (players) => {
    document.getElementById('search value').value = "";
    const container = document.getElementById('player-info');
    container.innerHTML = '';
    players.forEach(player => {
        // console.log(player.strPlayer);
        const {strThumb, strPlayer, strNationality, idPlayer} = player;
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div class="card">
            <img src="${strThumb ? strThumb : "https://picsum.photos/500/300?random=3"}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${strPlayer}</h5>
                <p class="card-text">Nationality: ${strNationality}</p>
            </div>
            <div class="p-4">
            <button onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-danger">Details</button>
            <button type="button" class="btn btn-primary">Delete</button>
            </div>
        </div> 
        `;
        container.appendChild(div);
    });

    
}

const singlePlayer = id =>{
    // console.log(id)
    const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => showSinglePlayer(data.players[0]))
}

const showSinglePlayer = (data) =>{
    console.log(data);
    const {strThumb, strPlayer, strDescriptionEN, strGender} = data;
    const container = document.getElementById('single-player-details');
    
    const div = document.createElement('div');
    
    if(strGender === 'Male'){
      const element = document.getElementById('male');
      element.classList.remove('d-none');
    }
    else{
      const element = document.getElementById('female');
      element.classList.remove('d-none');
    }
    
    div.innerHTML = `
    <div class="card mb-3 w-100 h-100">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${strPlayer}</h5>
          <p class="card-text">${strDescriptionEN.slice(0, 100) + "...."}</p>
          <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
    </div>
    `;
    container.appendChild(div);
}

searchAllData("messi");