let btn = document.getElementById("btn");
let url = "https://randomuser.me/api/";

function getRandomUser() {
  fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      let user = data.results[0];

      // Update HTML elements
      document.getElementById("avatar").src = user.picture.medium;
      document.getElementById("fullname").innerText = user.name.first + " " + user.name.last;
      document.getElementById("username").innerText = user.login.username;
      document.getElementById("email").innerText = user.email;
      document.getElementById("city").innerText = user.location.city;
    })
    .catch(function(error) {
      console.log("Error fetching user:", error);
    });
}

btn.addEventListener("click", getRandomUser);

getRandomUser();