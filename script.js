const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
function apiSearch(event){
    event.preventDefault();

    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=7c035f2bd7fc3fdfc6bdead0a550e006&language=en-US&include_adult=false&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){
    const request = new XMLHttpRequest();
    request.open(method,url,true);
    request.send();
    request.addEventListener('readystatechange', ()=>{
        if(request.readyState !== 4) return;
        if (request.status !== 200){
            console.log('error:' + request.status);
            return;
        }
        const output = JSON.parse(request.responseText);
        let inner = '';
        output.results.forEach(function(item){
            let nameItem = item.name || item.title;
            let dataItem = item.first_air_date || item.release_date;
            
            inner += '<div class="col-6">' + nameItem + '</div>' + '<div class="col-6">' + dataItem + '</div>'; //
        });
        movie.innerHTML = inner;
        console.log(output);

    });
}
