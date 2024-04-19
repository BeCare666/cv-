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
      var useremail = user.email
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
                    var usernameVal = snapshot.val().username
                    var userEmail = snapshot.val().email
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
                                allowOutsideClick: true,
                                text : `Your transfer has been completed successfully.`,
                                }).then((result)=>{
                                if(result.isConfirmed){
                                //window.location.reload();
                                }
                            })

                              // statr envoi de mail de validation
                              const apiKey = "8641DFD6DEB84F274A242CED8BEE37881D26BCEBA376A91F443285636EE43B33260B0611BBC88F1001BF8C88FBBC26C1";
                              const apiUrl = "https://api.elasticemail.com/v2/email/send";
                              
                              // Définir les paramètres de l'e-mail
                              const emailParams = {
                              apiKey: apiKey,
                              subject: "Notification de Commission",
                              from: "amobilewallet.inter@gmail.com",
                              fromName: "AM WALLET",
                              to:  userEmail,
                              bodyHtml: `
                              <table cellpadding="10" cellspacing="0" style="background-color: #f1f1f1; padding: 20px;">
                                  <tr>
                                <td>
                                    <h1 style="color: #333;">Congratulations ${usernameVal}!</h1>
                                    <p style="font-size: 16px; color: #666;">
                                    We are pleased to inform you that you have just received ${addCommissionConvertis}$ from ${useremail} about AM WALLET. thank you!
                                    </p>
                                    <p style="font-size: 14px; color: #999;">
                                        Stay tuned for more exciting news!
                                    </p>
                                    <p style="font-size: 14px; color: #999;">
                                        Sincerely,
                                    </p>
                                    <p style="font-size: 14px; color: #999;">
                                        The AM WALLET team.
                                    </p>
                                </td>
                            </tr>
                        </table>

                        `
                        };

                        // Effectuer une requête POST vers l'API ElasticEmail
                        fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams(emailParams)
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            //console.log(data); // Afficher la réponse de l'API ElasticEmail
                            if (data.success) {
                               window.location.href = "index.html"
                            // localStorage.removeItem('IDAFILIATE');
                            console.log("E-mail envoyé avec succès.");
                            } else {
                            console.error("Erreur lors de l'envoi de l'e-mail.");
                            window.location.href = "index.html"
                            }
                        })
                        .catch((error) => {
                            console.error("Erreur lors de la requête API :", error);
                             window.location.href = "index.html"
                        });
                        // end envoi de mail de validation


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