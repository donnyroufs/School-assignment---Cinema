import Movies from "./Movies";
import Picker from "./Picker";

const _n = document.querySelector(".tickets__container");

if (_n != null) {
  const movieTitle = document.querySelector(".hightlight--movie");
  const urlParams = new URLSearchParams(window.location.search);
  const numbers = JSON.parse(urlParams.get("numbers"));

  let html = "";
  for (const number of numbers) {
    html += `<div class="tickets__card">
                <h2 class="tickets__ticket">
                    ticket number
                </h2>
                <strong class="tickets__number">
                    #${number}
                </strong>
            </div>`;
  }
  _n.innerHTML = html;

  movieTitle.innerHTML = urlParams.get("movieTitle");
}
