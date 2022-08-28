// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const likeButton = document.querySelectorAll(".like-glyph");
const modal = document.querySelector("#modal");

likeButton.forEach((buttonLike) =>
  buttonLike.addEventListener("click", buttonLikeHandler)
);

function buttonLikeHandler(event) {
  const { target } = event;


  if (target.classList.contains("activated-heart")) {
    mimicServerCall()
      .then((resp) => {
        target.classList.remove("activated-heart");
        target.textContent = EMPTY_HEART;
      })
      .catch((error) => {
        //when the server fails, unhide the modal and show the message from server in the modal
        modal.classList.remove("hidden");
        modal.querySelector("#modal-message").textContent = error;
        setTimeout(hideModal, 3000);
      });
  } else {
    //when someone likes a post that has an empty heart
    mimicServerCall()
      .then((resp) => {
        target.textContent = FULL_HEART;
        target.classList.add("activated-heart");
      })
      .catch((error) => {
        modal.classList.remove("hidden");
        modal.querySelector("#modal-message").textContent = error;
        setTimeout(hideModal, 3000);
      });
  }
}
function hideModal() {
  modal.classList.add("hidden");
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
