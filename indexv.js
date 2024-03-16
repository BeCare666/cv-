const firebaseConfig = {
    apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
    authDomain: "am-wallet.firebaseapp.com",
    databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
    projectId: "am-wallet",
    storageBucket: "am-wallet.appspot.com",
    messagingSenderId: "877693231070",
    appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
};
const unserconnectId = localStorage.getItem("unserconnect")
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    var tableOfPrice = []
    var tableEmail = []
   // document.getElementById('sameToBody').style.display = "none"
    firebase.auth().onAuthStateChanged(function(user) { 
        if(user){
        var userId = user.uid;
        var useremail = user.email;
        tableEmail.push(useremail)
        const userRef = database.ref(`/utilisateurs/${userId}`);
        userRef.once("value")
        .then((snapshot) => {
        if (!snapshot.exists()) {
            document.getElementById('sameToBody').style.display = "none"
            Swal.fire({
                title: "Your username",
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: false,
                confirmButtonText: "Send",
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                preConfirm: (username) => {
                  if (username) {                         
                    let timerInterval;
                    Swal.fire({
                    title: "Finalising your account",
                    html: "Your account will be finalized in <b></b> milliseconds at the most.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 1000);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                    }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                    });

                    firebase.database().ref('utilisateurs/' + userId).set({
                    userId : userId,
                    email: tableEmail[0],
                    username : username,
                    ACCOUNTPRINCIPAL: 0,
                    ACCOUNTPRINCIPALX: 0,
                    ABONNEMENT : false, 
                    MESSAGES : false,                                                  
                    }).then(() => {  
                    swal({
                    title: "Congratulations",
                    text: "Your account has been finalized!",
                    icon: "success",
                     allowOutsideClick: false,
                    })
                    }).catch((error)=>{
                    swal({
                    title: "Erreur ",
                    text: "there is an error",
                    icon: "error",
                     allowOutsideClick: false,
                    })
                    })
                  }else {
                    Swal.showValidationMessage("Please enter something.");
                  }
                }
          }).then((result)=>{
          if(result.isConfirmed){
           // window.location.href = "./login/end.html"
          }
          })

}else{
  document.getElementById('sameToBody').style.display = "none"
  var useremail = snapshot.val().email;
  var username = snapshot.val().username;
  var balanceIDAW = snapshot.val().ACCOUNTPRINCIPAL;
  localStorage.setItem("usernameT", username)
  localStorage.setItem("balanceIDAWWW", balanceIDAW)
  var balanceIDBW = snapshot.val().ACCOUNTPRINCIPALX;

  var ABIDX = document.getElementById("userABID")
  var balanceID = document.getElementById("balanceID")
  var usernameID = document.getElementById("usernameID")
  var balanceIDA = document.getElementById("balanceIDA")
  var balanceIDB = document.getElementById("balanceIDB")
  var iconitem =document.querySelectorAll('.icon-item')
  iconitem.forEach((T)=>{
    T.addEventListener('click', function(){
        if(balanceIDAW == 0){
            swal.fire({
            title: "Info ",
            text: "Your balance is insufficient",
            icon: "error",
            allowOutsideClick: false,
          })
         }else{
          if(T.id === "pix"){
            window.location.href = "pix.html"
          }else if(T.id === "orangemoney"){
            window.location.href = "orange.html"
          }else if(T.id === "paypal"){
            window.location.href = "paypal.html"
          }else if(T.id === "tigomoney"){
            window.location.href = "tigomoney.html"
          }else if(T.id === "uwallet"){
            window.location.href = "uwallet.html"
          }else if(T.id === "bitcoin"){
            window.location.href = "bitcoin.html"
          }else if(T.id === "perfectmoney"){
            window.location.href = "perfectmoney.html"
          }else if(T.id === "bankmoney"){
            window.location.href = "bank.html"
          }
         }
    })
  })


  usernameID.innerHTML = `${username} `
  balanceID.innerHTML = `&dollar; ${balanceIDAW} `
  //balanceIDA.innerHTML = ` &nbsp; &nbsp; &nbsp; &nbsp;${balanceIDAW} <span class="dollar">&dollar;<span class="dollar"> `
  //balanceIDB.innerHTML = `${balanceIDBW} &dollar;  `

  // Function to get messages
  var userArray = []
  var userArrayA = []
  const userListP = document.getElementById("phistoryId");
  const userListUl = document.createElement("span"); 
  var MESSAGES = snapshot.val().MESSAGES
var deletenotfifId = document.getElementById('deletenotfifId');
deletenotfifId.addEventListener('click', function(){
  const newData = {
    MESSAGES: ""
    };
    const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
    userRefx.update(newData, (error) => {
      if (error){
        Swal.fire({
            title: "Ooops",
            text:"error",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            icon: 'error'
            }).then((result)=>{
            if(result.isConfirmed){
                window.location.reload(); 
            }
         })
      }else{
        window.location.reload(); 
      }
    })
})
  //console.log(MESSAGES)
  userArray.push(MESSAGES)
 // console.log(userArray[0])
  userArray.forEach((T)=>{
   userArrayA.push(T)
  })
  for (const userId in userArrayA) {
    const usergal = userArrayA[userId];
   var userArrayAXXXX = []
    for(const userI in usergal){
      const userga = usergal[userI];
      userArrayAXXXX.push(userga.notificationid)
      console.log(userga.notificationid)
      const userLi = document.createElement("p");
      userLi.innerHTML = `<p class="txn-list" style="cursor: pointer !important; border-radius: 5px !important;">
      <strong id="IDTRANSLATEWALLETU">${userga.notificationid}</strong><br><br><span class="debit-amount" style="color: green !important; position:relative; right:0 !important;">${userga.time}</span></p><hr style="color:white;">`
      userListUl.appendChild(userLi);
    }
    const indicatClass = document.getElementById("indicatClass");
indicatClass.innerHTML = `&nbsp;${userArrayAXXXX.length}`
     // Ajoutez la liste à la balise p
  userListP.appendChild(userListUl);
    
  }
  var balanceIDAW = snapshot.val().ACCOUNTPRINCIPAL;
  //function to generate affilition link
const linkInput = document.getElementById('linkInput');
const copyButton = document.getElementById('affiliateID');
//linkInput.value = `Copier ici votre lien d'affiliation.`
// function to hide border when you click
copyButton.addEventListener('click', () => {
linkInput.value = `https://amwallet.netlify.app/?user-id=${unserconnectId}`
linkInput.select(); // Sélectionne le texte dans l'input
document.execCommand('copy'); // Copie le texte sélectionné dans le presse-papiers
Swal.fire({
  title: "Super !",
  text: "Your link has been copied to the clipboard",
  icon: "success",
  confirmButtonText: "OK",
})
{/*Swal.fire({
  title: "Super !",
  text: "Your link has been copied to the clipboard",
  icon: "success",
  input: 'text',
  confirmButtonText: "Send",
  cancelButtonText: "Back",
  showCancelButton: true,
  inputAttributes: {
    placeholder: 'Enter a amount',
    style: 'text-align: center;' // Center the input text
  },
  inputValidator: (value) => {
    if (!value || value <= 0 || isNaN(value)) {
      return 'Please enter a number';
    }else{
      if(balanceIDAW >= value){
        const newData = {
          ACCOUNTPRINCIPALACCESS: value
          };
          const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
          userRefx.update(newData, (error) => {
            if (error){
              Swal.fire({
                  title: "Ooops",
                  confirmButtonText: "D'accord",
                  allowOutsideClick: false,
                  text: "les données ne sont pas mise à jour ",
                  icon: 'error'
                  }).then((result)=>{
                  if(result.isConfirmed){
                      window.location.reload(); 
                  }
               })
            }else{
              Swal.fire({
                  icon: 'success',
                  title:"Succès",
                  confirmButtonText: "D'accord",
                  allowOutsideClick: false,
                  text : `les données ont été mise à jour avec succès !`,
                  }).then((result)=>{
                  if(result.isConfirmed){
                  window.location.reload();
                  }
              })
            }
          })
      }else{
        Swal.fire({
          title: "Info ",
          text: "Your balance is insufficient",
          icon: "error",
          allowOutsideClick: false,
        }) 
      }
    }
  },
  closeOnClickOutside: false
});*/}
});

}
const shwonotification = document.getElementById('shwonotificationid');
// Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page 

// start function to send notification 
shwonotification.addEventListener('click', function() {
  $("#Modalnotificationid").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
});
});

})
}else{
    window.location.href = "login.html"
}

})

var transfer_systems = document.getElementById('transfer_systems')
var transfer_for_user = document.getElementById('transfer_for_user')
var containerID = document.getElementById('containerID')
var containerIDx = document.getElementById('containerIDx')
transfer_systems.addEventListener("click", function(){
  containerIDx.style.display = "block"
  containerID.style.display = "none"
})

transfer_for_user.addEventListener("click", function(){ 
 window.location.href = "amwalette.html"
})
var containerId = document.getElementById('containerId');
var assistanceId = document.getElementById('assistanceId');
var menubtnId = document.getElementById('menu-btnId');
menubtnId.addEventListener('click', function(){
	containerId.style.display = "none"
	Swal.fire({
		title: "Info ",
		html: `Recharge your account for <strong style="color: blue;">am walette adress</strong>.`,
		icon: "Info",
    confirmButtonText: "Yes",
    cancelButtonText: "Back",
    showCancelButton: true,
    footer:`<a href="mailto:amobilewallet.inter@gmail.com">ask for address to assistance <strong style="color: blue;">am walette </strong>.`,
		allowOutsideClick: false, 
	  }).then((result)=>{
      if(result.isConfirmed){
        window.location.reload();
      }else{ 
        window.location.reload();
      }
   })
})
assistanceId.addEventListener('click', function(){
	containerId.style.display = "none"
	Swal.fire({
    imageUrl: "img/logo_of_wallet.jpg", // Remplacez "url_de_votre_image.jpg" par l'URL de votre image
    imageWidth: 200, // Largeur de l'image en pixels
    imageHeight: 200, // Hauteur de l'image en pixels
		html: `
    <div style="text-align: left !important;">
    <a href="https://wa.me/+447418315534" target="_blank" rel="noopener noreferrer">
    <i class="fab fa-whatsapp"></i> +44 7418315534
    </a><hr>
    <a href="mailto:amobilewallet.inter@gmail.com" target="_blank" rel="noopener noreferrer">
      <i class="far fa-envelope"></i>  amobilewallet.inter@gmail.com
    </a>
    </div>`,
		icon: "Info",
    confirmButtonText: "Yes",
    cancelButtonText: "Back",
    showCancelButton: true,
		allowOutsideClick: false,
	  }).then((result)=>{
      if(result.isConfirmed){
        window.location.reload();
      }else{ 
        window.location.reload();
      }
   })
})

