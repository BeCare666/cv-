const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
  projectId: "am-wallet",
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f",
};
const unserconnectId = localStorage.getItem("unserconnect");
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
var userArrayASal = [];
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userId = user.uid;
    publish();
    const userRef = database.ref(`/utilisateurs/${userId}`);
    userRef.once("value").then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("sameToBody").style.display = "none";
        var userData = snapshot.val();
        var currentPoints = userData.points;
        var ACCOUNTPRINCIPAL = userData.ACCOUNTPRINCIPAL;
        var currentPointsDiv = currentPoints * 12;
        var currentPointsDiv1 = currentPointsDiv / 100;
        var currentPointsDiv2 = currentPointsDiv1 / 12;
        var aCCOUNTPRINCIPALX = parseFloat(ACCOUNTPRINCIPAL);
        var addCommissionConvertis = parseFloat(currentPointsDiv2);
        var myCommissionAdd = aCCOUNTPRINCIPALX + addCommissionConvertis;

        //let pointsClass = document.querySelector(".pointsClass");
        //pointsClass.textContent = `Get ${currentPoints} points`;

        if (currentPoints >= 1080) {
          Swal.fire({
            icon: "success",
            title: "Congratulations",
            confirmButtonText: "",
            allowOutsideClick: false,
            text: `You have reached your points threshold. Your points will be converted into 
                dollars and added to your account. 12 points = $0.12`,
          }).then((result) => {
            if (result.isConfirmed) {
              const newData = {
                ACCOUNTPRINCIPAL: myCommissionAdd,
                points: 0,
              };
              const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
              userRefx.update(newData, (error) => {
                if (error) {
                  Swal.fire({
                    title: "Ooops",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    text: "Your recharge  has failed.",
                    icon: "error",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "success",
                    title: "Succès",
                    confirmButtonText: "OK",
                    allowOutsideClick: true,
                    text: `Your recharge has been completed successfully.`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                }
              });
            }
          });
        }
        document
          .querySelector(".start-btn")
          .addEventListener("click", function () {
            let pointsClass = document.querySelector(".pointsClass");
            pointsClass.textContent = `Loading...`;
            let today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
            userRef.once("value").then((userSnapshot) => {
              let userData = userSnapshot.val();
              let lastActionDate = userData.lastActionDate || null;
              let currentPoints = userData.points || 0;

              if (lastActionDate === today) {
                alert("Action déjà effectuée aujourd'hui !");
                location.reload();
                return;
              }

              let percentage = 0;
              let textElement = document.querySelector(".text");
              let pointsClass = document.querySelector(".pointsClass");
              let backgroundElement = document.querySelector(".background");

              let interval = setInterval(() => {
                if (percentage >= 100) {
                  clearInterval(interval);
                  let newPoints = currentPoints + 12;

                  // Mise à jour des données dans Firebase
                  userRef.update({
                    lastActionDate: today,
                    points: newPoints,
                  });

                  pointsClass.textContent = `${newPoints} points`;
                } else {
                  percentage++;
                  textElement.textContent = percentage + "%";
                  let color = `hsl(${percentage * 3.6}, 50%, 50%)`;
                  textElement.style.textShadow = `0px 0px ${
                    percentage / 2
                  }px ${color}`;
                  backgroundElement.style.backgroundColor = color;
                }
              }, 100);
            });
          });
      }
    });
  } else {
    window.location.href = "../login.html";
  }
  function publish() {
    const userRef = database.ref(`/lespubs/`);
    userRef.once("value").then((snapshot) => {
      snapshot.forEach((productSnapshot) => {
        const productData = productSnapshot.val();
        //console.log(productData);
        userArrayASal.push(productData);

        function afficherPub() {
          var randomImage =
            userArrayASal[Math.trunc(Math.random() * userArrayASal.length)];
          console.log(randomImage.URLPUB);

          Swal.fire({
            imageUrl: `data:image/png;base64,` + randomImage.IMAGEPUB,
            imageWidth: 400,
            imageAlt: "Custom image",
            confirmButtonText: "Read more",
            showCloseButton: true, // Ajoute le bouton de fermeture en haut à droite
            allowOutsideClick: false, // Empêche la fermeture en cliquant à l'extérieur
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `${randomImage.URLPUB} `;
            }
          });
        }

        // Affiche la pub après 3 secondes
        setTimeout(afficherPub, 3000);

        // Répète l'affichage toutes les 15 secondes
        setInterval(afficherPub, 20000);
      });
    });
  }
});
