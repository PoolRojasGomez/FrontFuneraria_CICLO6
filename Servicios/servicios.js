
$(() => {
  const uri="https://funeraryapipablito.herokuapp.com/funeraria/api/"
  const tabla = $('#cuerpoTabla')
  let tablaHTML = ''

  fetch(uri+'items/all')
    .then(response => response.json())
    .then(datos => {
      let tablaf
      for (let valor of datos) {
        tablaf +=
          llenaTabla(valor.name, valor.name, valor.materialItem.description, valor.colorItem.name,
            valor.active.description, valor.stock, valor.priceUnit, valor.image)
      } return tabla.append(tablaf)
    })
    .catch(err => console.log(err.message));

    $('#btnBuscar').click(() => {
      tabla.empty()
      const filtro= $('#nomape').val()
      let numero=1
      let tablafi
      fetch(uri + 'items/filter/{name}'+filtro)
        .then(response => response.json())
        .then(datosfiltro => {
          console.log(filtro)
          console.log(datosfiltro)
          for (let valor of datosfiltro) {
            tablafi=llenaTabla(valor.name, valor.name, valor.materialItem.description, valor.colorItem.name,
              valor.active.description, valor.stock, valor.priceUnit, valor.image)
          }
          return tabla.append(tablafi)
        }).catch(err => console.log(err.message));
      })
})

function llenaTabla(id, name, description, materialItem, colorItem, active, stock, priceUnit, image) {
  tablaHTML = `<tr>
  <td scope="row">${id}</td>
  <td>${name}</td>
  <td>${description}</td>
  <td>${materialItem}</td>
  <td>${colorItem}</td>
  <td>${active}</td>
  <td>${stock}</td>
  <td>S/.${priceUnit}</td>
  <td><img src="${image}"/></td>
  <td><button type="button" class="btn btn-success" onclick="">Editar</button></td>
  <td><button type="button" class="btn btn-danger" onclick="">Eliminar</button></td>
  </tr>
  `
  return tablaHTML
}