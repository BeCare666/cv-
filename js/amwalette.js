//Your web app's Firebase configuration
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
    const balanceIDAWW = localStorage.getItem("balanceIDAWWW")
    const unserconnectId = localStorage.getItem("unserconnect")
    //const bilanuserId = "JyPM9obdRafgNHOZZ8e4piR1SVA3"
    
    firebase.auth().onAuthStateChanged(function(user) { 
    if(user){ 
        var submitid = document.getElementById("submitid");
        submitid.addEventListener("click", submitmy)
        function submitmy() {
            var amwalette_Adress = document.getElementById("amwalette_Adress").value; 
            var soldeId = document.getElementById("soldeId").value;
            var urlObject = new URL(amwalette_Adress);
            // Récupérer la valeur de user-id depuis les paramètres de l'URL        
            var amwalettuserId = urlObject.searchParams.get("user-id");
            if (urlObject.searchParams.has("user-id")){ 
            var soldeIdX = parseFloat(soldeId);
            var balanceIDAWWx = parseFloat(balanceIDAWW);
                const userRef = database.ref(`/utilisateurs/${amwalettuserId}`);
                userRef.once("value")
                .then((snapshot) => {
                if (snapshot.exists()) {
                    var ACCOUNTPRINCIPAL = snapshot.val().ACCOUNTPRINCIPAL
                   // var ACCOUNTPRINCIPALACCESS = snapshot.val().ACCOUNTPRINCIPALACCESS
                    var myComptaConvertis = parseFloat(ACCOUNTPRINCIPAL);
                    var addCommissionConvertis = parseFloat(soldeId)
                    if(balanceIDAWWx >= soldeIdX){
                     if(amwalettuserId != unserconnectId){
                    var myCommissionAdd = myComptaConvertis + addCommissionConvertis
                    const newData = {
                    ACCOUNTPRINCIPAL: myCommissionAdd
                    };
                    const userRefx = database.ref(`/utilisateurs/${amwalettuserId}`);
                    userRefx.update(newData, (error) => {
                      if (error){
                        Swal.fire({
                            title: "Ooops",
                            confirmButtonText: "OK",
                            allowOutsideClick: false,
                            text: "Error ",
                            icon: 'error'
                            }).then((result)=>{
                            if(result.isConfirmed){
                                window.location.reload(); 
                        }
                         })
                      }else{
                        var soldeId = document.getElementById("soldeId").value;
                        var myComptaConvertis = parseFloat(balanceIDAWW);
                        var addCommissionConvertis = parseFloat(soldeId)
                        var myCommissionAdd = myComptaConvertis - addCommissionConvertis
                        const newData = {
                        ACCOUNTPRINCIPAL: myCommissionAdd,
                        //ACCOUNTPRINCIPALACCESS:0
                        };
                        const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
                        userRefx.update(newData, (error) => {
                          if (error){
                            Swal.fire({
                                title: "Ooops",
                                confirmButtonText: "OK",
                                allowOutsideClick: false,
                                text: "Your transfer has failed.",
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
                                confirmButtonText: "OK",
                                allowOutsideClick: false,
                                text : `Your transfer has been completed successfully.`,
                                }).then((result)=>{
                                if(result.isConfirmed){
                                window.location.reload();
                                }
                            })
                          }
                        })   
                      }
                    }) 
                  }else{
                    Swal.fire({
                      title: "Ooops",
                      confirmButtonText: "OK",
                      allowOutsideClick: false,
                      text: "This transfert isn't possible. ",
                      icon: 'error'
                      }).then((result)=>{
                      if(result.isConfirmed){
                          window.location.reload(); 
                  }
                   })
                   }
                    
                  }else{
                    Swal.fire({
                        title: "Info ",
                        text: "You cannot transfer this amount",
                        icon: "error",
                        allowOutsideClick: false,
                      })
                }    
                } 
              
              })  
            }else{
              Swal.fire({
                title: "Ooops",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                text: "Error link",
                icon: 'error'
                }).then((result)=>{
                if(result.isConfirmed){
                    window.location.reload(); 
            }
             })
            } 
        } 
    }else{
        window.location.href = "login.html"
    }
    })
    
    function validerSaisie(input) {
        const valeurSaisie = input.value;
        const regexLettresAvecEspaces = /^\d+$/;
      
        if (!regexLettresAvecEspaces.test(valeurSaisie)) {
          //alert("ne fait pas ça")
          // Effacez la saisie incorrecte
          input.value = input.value.replace(/\D/g, '');
         
        } else {
        }
      }