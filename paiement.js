const balanceIDAWx = localStorage.getItem("balanceIDAWx")

document.getElementById('submitid').value = `Pay now ${balanceIDAWx}$`
function submitmy(){
    document.getElementById('containerId').style.display = "none"
    Swal.fire({
      title: "Transfer...",
      html: "Your transfer will be finalized in <b></b> milliseconds at the most.",
      timer: 7000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
      },
      willClose: () => {
          clearInterval(timerInterval);
      }
      }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        swal.fire({
          title: "Ooops..",
          text: "Your transfer is failed, contact AM_WALLET to find out more. Thank!",
          icon: "error",
           allowOutsideClick: false,
          }).then((result)=>{
            if(result.isConfirmed){
              window.location.href = "index.html"
            }
          })
      }
      });

}