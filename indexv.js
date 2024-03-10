const firebaseConfig = {
    apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
    authDomain: "am-wallet.firebaseapp.com",
    databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
    projectId: "am-wallet",
    storageBucket: "am-wallet.appspot.com",
    messagingSenderId: "877693231070",
    appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
    };

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
  balanceIDA.innerHTML = `${balanceIDAW} <span class="dollar">&dollar;<span class="dollar"> `
  balanceIDB.innerHTML = `${balanceIDBW} &dollar;  `

  // Function to get messages
  var userArray = []
  var userArrayA = []
  const userListP = document.getElementById("phistoryId");
  const userListUl = document.createElement("span"); 
  var MESSAGES = snapshot.val().MESSAGES

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


