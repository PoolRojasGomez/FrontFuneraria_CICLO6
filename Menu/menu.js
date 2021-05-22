$(document).ready(()=>{
    $("#siderbar").load("../Menu/siderbar.html",function(){
        $("#navbar").load("../Menu/navbar.html",function(){
            cargarOpcionesMenu();
        });
    });

    
});

function cargarOpcionesMenu(){
    var btnOcultar = document.body.querySelector("#btnOculApa");
        btnOcultar.addEventListener("click", () => {
            // localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            document.body.classList.toggle("sb-sidenav-toggled");
            ocultarCombo();
        });
    
        var cajaData = document.querySelector("#data_detalle");
        cajaData.addEventListener("click",()=>{
            var cerrado = document.body.classList.contains("sb-sidenav-toggled");
            if(!cerrado){
                document.body.classList.add("sb-sidenav-toggled");
            }
            ocultarCombo();
        });
    
        function ocultarCombo(){
            var cerrado = document.body.classList.contains("sb-sidenav-toggled");
            if(!cerrado){
                btnOcultar.classList.add("d-none");
            }else{
                btnOcultar.classList.remove("d-none");
            }
        }    
}
