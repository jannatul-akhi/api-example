const loadData = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => showAllData(data.slice(0, 3)))
}

const showAllData = (countries) =>{
    // console.log(countries)
    const countryContainer = document.getElementById('countries-info');
    countryContainer.innerHTML = '';
    countries.forEach(country => {
        // console.log(country.population)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-full h-96 bg-base-100 shadow-2xl">
            <figure class="px-10 pt-10">
                <img src="${country.flags.png}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${country.name.common}</h2>
                <p>Population: ${country.population}</p>
                <div class="card-actions">
                    <label onclick="showSingleCountry('${country.cca2}')" class="btn btn-primary" for="my_modal_6" class="btn">show details</label>
                </div>
            </div>
        </div>
        `;
        countryContainer.appendChild(div)
    });
}

const showAllDataTogether = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => showAllData(data))
}

loadData();



const showSingleCountry = (id) =>{
    // console.log(id);
    const URL = `https://restcountries.com/v3.1/alpha/${id}`
    fetch(URL)
    .then(res => res.json())
    .then(data => showSingleCountryDataModal(data[0]))
}

const showSingleCountryDataModal = (value) =>{
    console.log(Object.keys(value.currencies)[0]);

    const existingModals = document.querySelectorAll(".modal");
    existingModals.forEach(modal => modal.remove())

    
    const container = document.getElementById('modal-info');
    
    const div = document.createElement('div')
    div.classList.add('modal');
    div.innerHTML=`
        
        <div class="modal-box">
            <img src="${value.flags.png}" alt="">
            <h3 class="font-bold text-lg">${value.name.common}</h3>
            <p class="py-4">Population: ${value.population}</p>
            <p class="py-2">Currency: ${Object.keys(value.currencies)[0]}</p>
            <div class="modal-action">
                <label for="my_modal_6" class="btn">Close!</label>
            </div>
        </div>
        
    `;
    container.appendChild(div);
    
}