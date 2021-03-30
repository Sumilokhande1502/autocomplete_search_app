const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//Search db,json and filter
const findstates = async searchText => {
    const res = await fetch('../data/db.json');
    const data = await res.json();
    
    //Get mayches to typed Text
    let matches = data.filter(state => {
        const regex = new RegExp(`^${searchText}`,`gi`);
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
        matchList.innerHTML = '';
    }


    showData(matches);
};

//Print data in html page

const showData = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class="mb-1 card card-body">
                <h4>${match.name} (${match.abbr}) <span class="text-info">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `).join('');
    
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', ()=> findstates(search.value));