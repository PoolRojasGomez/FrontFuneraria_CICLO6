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

  llenaTablaAll(uri, tabla)

  $('#btnBuscar').click(() => {
    tabla.empty()
    const filtro = $('#nomape').val()
    let numero = 1
    let tablafi

    fetch(uri + 'deceaseds/filter/' + filtro)
      .then(response => response.json())
      .then(datosfiltro => {
        console.log(filtro)
        console.log(datosfiltro)
        for (let valor of datosfiltro) {
          tablafi = llenaTabla(numero++, valor.typeIdentity.name, valor.deceasedId, valor.name, valor.lastname, valor.secondlastname,
            valor.gender.genderId, valor.birthdate, valor.dateofdeath,valor.placeofdeath, valor.image)
        }
        return tabla.append(tablafi)
      }).catch(err => console.log(err.message));
    if (filtro == "") {
      M.toast({html:'No se Ingresó un nombre', classes: 'rounded'})
      llenaTablaAll(uri, tabla)
    }
  })

  
})
function llenaTabla(numero, typeIdentity, id, name, lastName, secondLastName, gender, birthdate, dateofdeath, placeofdeath, image) {
  tablaHTML = `<tr>
                  <td scope="row">${numero++}</td>
                  <td><table><tr>
                  <td>${typeIdentity}</td>
                  <td>${id}</td
                  </tr>
                  </table>
                  </td>
                  <td>${name} ${lastName} ${secondLastName}</td>
                  <td>${gender}</td>
                  <td>${birthdate}</td>
                  <td>${dateofdeath}</td>
                  <td>${placeofdeath}</td>
                  <td><img src="${image}"/></td>
                  <td><button type="button" class="btn btn-success" onclick="abrirModal()" >Editar</button></td>
                  <td><button type="button" class="btn btn-danger" onclick="">Eliminar</button></td>
                  </tr>
                  `
  return tablaHTML
}
function abrirModal(){
  $('#modalRegistro').show();
}
function llenaTablaAll(uri, tabla) {
  fetch(uri + 'deceaseds/all')
    .then(response => response.json())
    .then(datos => {
      let numero = 1
      let tablaf
      for (let valor of datos) {
        tablaf +=
          llenaTabla(numero++, valor.typeIdentity.name, valor.deceasedId, valor.name, valor.lastname, valor.secondlastname,
            valor.gender.genderId, valor.birthdate, valor.dateofdeath, valor.placeofdeath,valor.image)
      }
      return tabla.append(tablaf)
    })
    .catch(err => console.log(err.message));
}