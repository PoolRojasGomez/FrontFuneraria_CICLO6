function genera_tabla() {
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // Crea las celdas
  for (var i = 0; i < 2; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("celda en la hilera " + i + ", columna " + j);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}
$(() => {

  const uri = "https://funeraryapipablito.herokuapp.com/funeraria/api/"
  const tabla = $('#cuerpoTabla')
  fetch(uri + 'representatives/all')
    .then(response => response.json())
    .then(datos => {
      console.log(datos)
      let numero = 1
      let tablaf
      for (let valor of datos) {
        tablaf +=
          llenaTabla(numero++, valor.staffId, valor.name, valor.lastName, valor.secondLastName, valor.gender.genderId, valor.address,
            valor.district.name, valor.phone, valor.email, valor.position.name, valor.salary, valor.photo)
      }
      return tabla.append(tablaf)
    })
    .catch(err => console.log(err.message));

  $('#btnBuscar').click(() => {
    tabla.empty()
    const filtro = $('#nomape').val()
    let numero = 1
    let tablafi
    fetch(uri + 'representatives/filter/' + filtro)
      .then(response => response.json())
      .then(datosfiltro => {
        console.log(filtro)
        console.log(datosfiltro)
        for (let valor of datosfiltro) {
          tablafi = llenaTabla(numero, valor.staffId, valor.name, valor.lastName, valor.secondLastName, valor.gender.genderId, valor.address,
            valor.district.name, valor.phone, valor.email, valor.position.name, valor.salary, valor.photo)
        }
        return tabla.append(tablafi)
      }).catch(err => console.log(err.message));
  })
  $('#btnGuardar').click(()=>{
    const tipoDoc= $('#comboTipoDoc').val()
    const nroDoc= $('#dni').val()
    const nomape= $('#apellidos').val()
    const genero= $('#comboGenero').val()
    const estado= $('#comboEstadoCivil').val()
    const fnac= $('#fechaNacimiento').val()
    const ffal= $('#fechaFallecimiento').val()
    const lugarf= $('#lugarFallecimiento').val()
      
  })

})
function llenaTabla(numero, id, name, lastName, secondLastName, gender, address, district, phone, email, position, salary, photo) {

  tablaHTML = `<tr>
  <td scope="row">${numero}</td>
  <td>${id}</td>
  <td>${name} ${lastName} ${secondLastName}</td>
  <td>${gender}</td>
  <td>${address} - ${district}</td>
  <td>${phone}</td>
  <td>${email}</td>
  <td>${position}</td>
  <td>S/.${salary}</td>
  <td><img src="${photo}"/></td>
  <td><button type="button" class="btn btn-success" onclick="">Editar</button></td>
  <td><button type="button" class="btn btn-danger" onclick="">Eliminar</button></td>
  </tr>
  `
  return tablaHTML
}