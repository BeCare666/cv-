window.onload = function() {
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

    var degreesxv = []
    let spinner = document.getElementById("spinner");
    let ctx = spinner.getContext("2d");
    let width = spinner.width;
    let height = spinner.height;
    let degrees = 0;
    let new_degrees = 359.999; // 99.99% of 360 degrees
    let difference = 0;
    let color = "white";
    let bgcolor = "#222";
    let text;
    let animation_loop, redraw_loop;

    // Restaurer la valeur de degrees depuis le localStorage localStorage.getItem('degreesxv')
    if (degreesxv[0]) {
       // degrees = parseFloat(localStorage.getItem('degreesxv'));
       degrees = parseFloat(degreesxv[0]);
        console.log("1", degrees)
    }

    function init() {
        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        ctx.strokeStyle = bgcolor;
        ctx.lineWidth = 30;
        ctx.arc(width / 2, width / 2, 100, 0, Math.PI * 2, false);
        ctx.stroke(); 
        let radians = degrees * Math.PI / 180;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 30;
        ctx.arc(width / 2, height / 2, 100, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.font = "30px arial";
        text = (degrees / 360 * 100).toFixed(2) + " %";
        text_width = ctx.measureText(text).width;
        ctx.fillText(text, width / 2 - text_width / 2, height / 2 + 15);
        //console.log(text)
        if(text === "100%"){
            setTimeout(()=>{ 
            document.getElementById('TransferId').style.display = "none"
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Hi, your transfer is about to be validated, please provide the necessary documents and follow the instructions to make it effective at the recipient's bank.`,
            cancelButtonText:"Already received",
            confirmButtonText: "Confirm email",
            showCancelButton: true,
            allowOutsideClick: false,
            }).then((result)=>{
            if(result.isConfirmed){
            var accesscodex = "IAJDGHNLEIFJHEIDJHEQIKAJHJEHH"
            localStorage.setItem('accesscodex', accesscodex)
            window.location.href = `https://hinlintransfert.netlify.app/validemail.html`
            }
            })
        },4000)
        
        }
    }

    function draw() {
        if (typeof animation_loop != undefined) clearInterval(animation_loop);
        difference = new_degrees - degrees;
        animation_loop = setInterval(animate_to, 1000 / difference);
    }

    function animate_to() {
        if (degrees >= new_degrees) {
            clearInterval(animation_loop);
            // Enregistrer la valeur de degrees dans le localStorage
            localStorage.setItem('degreesxv', degrees);
            degreesxv.push(degreesxv)
            console.log("2", degrees)
            button.textContent = `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`;
            document.getElementById('parisId').style.display = "block"
            stopRandomIncrement();
        } else {
            degrees += 0.100; // Increase degrees by a small fraction to reach exactly 359.964
            init();
        }
    }

    init();
    draw();
    const button = document.querySelector('.btn');
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let intervals = [];

    function updateButton() {
        button.textContent = `[${numbers.join(', ')}]`;
    }

    function randomIncrement(index) {
        numbers[index] = (numbers[index] + Math.floor(Math.random() * 10)) % 100;
        updateButton();
    }

    function startRandomIncrement() {
        intervals = numbers.map((_, index) => setInterval(() => {
            randomIncrement(index);
        }, Math.random() * 1000 + 500));
    }

    function stopRandomIncrement() {
        intervals.forEach(clearInterval);
        updateButton();
    }

    startRandomIncrement();

      firebase.auth().onAuthStateChanged(function(user) { 
        if(user){ 
        var userId = user.uid;
        const userRef = database.ref(`/utilisateurs/${userId}`);
        userRef.once("value")
        .then((snapshot) => {
        if(snapshot.exists()){
        //var ACCOUNTINVESTSATUS = snapshot.val().ACCOUNTINVESTSATUS;
        //var ACCOUNTINVEST = snapshot.val().ACCOUNTINVEST;
        var numberIdSubmit = document.getElementById('numberIdSubmit');
        numberIdSubmit.addEventListener('click', function(){ 
            var Amont = document.getElementById('numberId');
            var numberIdx = document.getElementById('numberIdx');         
            //var valeurx = "5"
            var Amonti = parseFloat(Amont.value);
            //var valeurxi = parseFloat(valeurx)
            //var sommes = Amonti + valeurxi
            //console.log(sommes)
            if(Amont.value && numberIdx.value){
                openKkiapayWidget({
                    amount: `${numberIdx.value}`,
                    position: "center",
                    callback: "javascript:sendmycommandinCentremodale()",
                    data: "",
                    theme: "blue",
                    sandbox : "false",
                    key: "878e7b7232e5a1e067f29d44816f4b801a029e09",
                  });
                 
                  //la reponse du payement kkiapay
                  addSuccessListener((response) => {
                    const dateActuelle = new Date();
                    const newData = {
                        ACCOUNTLOTO: Amonti,
                        AMONTTLOTO: numberIdx.value,
                        dateActuelle:dateActuelle,
                        };
                    userRef.update(newData, (error) => {
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
                               Swal.fire({
                                   title: "Congratulation",
                                   text:"succes",
                                   confirmButtonText: "OK",
                                   allowOutsideClick: false,
                                   icon: 'succes'
                                   }).then((result)=>{
                                   if(result.isConfirmed){
                                       window.location.href = "../index.html"; 
                               }
                               })
                        }
                        })
                  });
            
            }else {
                Swal.fire({
                    title: "Information",
                    text:"L'un des champs est vide.",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    icon: 'error'
                    }).then((result)=>{
                    if(result.isConfirmed){
                        //window.location.reload(); 
                  }
                 })
            }
    
        })
        }
       })
     
    }else{
        window.location.href = "../login.html"
      }
    // end function set active  investment
    })
    
    const cards = document.querySelectorAll(".card");
    cards.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cards.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
      });
    });
    
    const input = document.getElementById('numberId');

    input.addEventListener('input', function() {
        // Ensure the value is between 0 and 99
        let value = parseInt(input.value, 10);
        if (isNaN(value)) {
            input.value = '';
        } else if (value < 0) {
            input.value = 0;
        } else if (value > 99) {
            input.value = 99;
        } else {
            input.value = value;
        }

        // Limit to 2 digits
        if (input.value.length > 2) {
            input.value = input.value.slice(0, 2);
        }
    });
}
