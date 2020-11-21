(async () => {

    let URL1 = 'https://restcountries.eu/rest/v2/all';
    let countries = await fetch(URL1);
    countries = await countries.json();

    let URL2 = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    let rates = await fetch(URL2);
    rates = await rates.json();

    console.log(rates);
 
    for(let item of countries){

        let cc = item.currencies[0].code;

        for(let oneRate of rates){
            if(oneRate.cc == cc){
                item.rate = oneRate.rate;
                item.exchangedate = oneRate.exchangedate;
                item.txt = oneRate.txt
                break;
            }
        }
    }

    console.log(countries);
    countries = countries.filter(item => item.rate).map( field => `
    
        <div class="alert alert-primary" role="alert">
            
            <div class="col-md-4">
                <img src="${field.flag}" class="card-img" alt="Flag of ${field.name}">
            </div>
        
            <div class="text">
                <h4>${field.name} (${field.currencies[0].code} — ${field.txt}) </h4> 
                <p>Курс: ${field.rate} на ${field.exchangedate}</p>
            </div>
        </div>
    
    `);


    let countryCard = document.querySelector('#special');
    countryCard.innerHTML = countries.join(' ');

})()
