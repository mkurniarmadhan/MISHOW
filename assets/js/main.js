const container = document.querySelector('#movie');
const api_url = 'https://api.themoviedb.org/3/trending/all/week?api_key=a1562da6ae4198d18bf88a214565cddf';
const poster_url = 'https://image.tmdb.org/t/p/original/';

fetch(api_url)
  .then((response) => response.json())
  .then((data) => getmovie(data['results']));

function getmovie(data) {
  let out = '';
  data.forEach(({ title, name, poster_path }) => {
    out += `
    <div class="box">
      <img src="${poster_url + poster_path}" alt="${title ? title : name}" class="img_file" />
      <p>${title ? title : name}</p>
    </div>
    `;
  });
  container.innerHTML = out;
}

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('img_file')) {
    let preview = document.querySelector('.preview');
    preview.querySelector('img').src = evt.target.src; //getting the clicked image and inserting it into the box
    preview.querySelector('p').innerHTML = evt.target.alt;
    preview.classList.toggle('active');
    document.querySelector('body').classList.toggle('active');
  } else if (evt.target.classList.contains('preview_cont')) {
    let preview = document.querySelector('.preview');
    preview.classList.toggle('active');
    document.querySelector('body').classList.toggle('active');
  }
});
