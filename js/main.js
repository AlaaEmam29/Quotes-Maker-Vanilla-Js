"use strict";
const quoteDOM = document.querySelector(".quote");
const authorDOM = document.querySelector(".author");
const twitterBtn = document.querySelector(".twitter-btn");
const quoteBtn = document.querySelector(".quote-btn");
const visitLink = document.querySelector(".visit-link");
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
const proxyUrl = "https://shrouded-river-12412.herokuapp.com/";

const URL = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
function showLoadingSpinner() {
  loader.hidden = false;
  container.hidden = true;
}
function hideLoadingSpinner() {
  if (!loader.hidden) {
    container.hidden = false;
    loader.hidden = true;
  }
}

const fetchApi = async () => {
  showLoadingSpinner();
  try {
    const response = await fetch(proxyUrl + URL);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
const displayQuote = async () => {
  const { quoteAuthor, quoteText, quoteLink } = await fetchApi();

  authorDOM.textContent = `${quoteAuthor === "" ? "UnKnown" : quoteAuthor}`;
  quoteDOM.textContent = quoteText;
  visitLink.setAttribute("href", quoteLink);
  hideLoadingSpinner();
};
function tweetQuote() {
  const quote = `"${quoteDOM.innerText}"`;
  const author = authorDOM.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  open(twitterUrl, "_blank");
}

window.addEventListener("DOMContentLoaded", displayQuote);
quoteBtn.addEventListener("click", displayQuote);
twitterBtn.addEventListener("click", tweetQuote);
