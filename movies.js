const apikey = "6d00cb20b886ea99bfa735531d9979e8"

document.querySelector("#search_btn")
.addEventListener('click', searchMovies)

function searchMovies(event) {
  const nameMovie = document.querySelector('#search_input').value
  document.querySelector("#loader").className="row"
  
  if(!nameMovie) {
    alert('Ingrese un nombre de pelicula')
    return false
  }

  const xhr = new XMLHttpRequest()
  const url = `https://api.themoviedb.org/3/search/movie?language=es&api_key=${apikey}&query=${nameMovie}`
  xhr.open('GET', url)
  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText)

      document.querySelector("#loader").className="row hide"
      console.log(response)
      
      if(response.total_results == 0) {
        alert("Sin resultados")
        return false;
      }

      response.results.forEach(element => {
        addRow(element.poster_path, element.original_title, element.overview)
      });
      


    } else {
      console.error('Error al cargar los datos')
    }
  }
  xhr.send()
}


function addRow(poster, title, description) {
  var table = document.getElementById("search_result");

  var row = table.insertRow(-1);

  var posterCell = row.insertCell(0);
  var titleCell = row.insertCell(1);
  var descriptionCell = row.insertCell(2);

  posterCell.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${poster}" width="50px"/>`;
  titleCell.innerHTML = title;
  descriptionCell.innerHTML = description;
}