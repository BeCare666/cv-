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
                    }).then(() => {  
                    swal({
                    title: "Congratulations",
                    text: "Your account has been finalized!",
                    icon: "success",
                    closeOnClickOutside: false,
                    })
                    }).catch((error)=>{
                    swal({
                    title: "Erreur ",
                    text: "there is an error",
                    icon: "error",
                    closeOnClickOutside: false,
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
                closeOnClickOutside: false,
                })
         }else{
            swal.fire({
                title: "Congratulations",
                text: "Contact AM_WALLET to find out more. Thank!",
                icon: "success",
                closeOnClickOutside: false,
                }) 
         }
    })
  })


  usernameID.innerHTML = `${username} `
  balanceID.innerHTML = `&dollar; ${balanceIDAW} `
  balanceIDA.innerHTML = ` ${balanceIDAW} <span class="dollar">&dollar; `
  balanceIDB.innerHTML = `${balanceIDBW} <span class="dollar">&dollar;  `


}  

})
}else{
    window.location.href = "./auth0/login.html"
}

})


