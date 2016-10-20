const fs = require('fs')

// Create map of types and classnames for colouring based off of types
var typeMap = new Map()
typeMap["Nonmetal"] = "nonmetal"
typeMap["Metalloid"] = "metalloid"
typeMap["Other metal"] = "other-metal"
typeMap["Transition metal"] = "transition-metal"
typeMap["Unknown"] = "unknown"
typeMap["Alkali metal"] = "alkali-metal"
typeMap["Alkaline earth metal"] = "alkaline-earth-metal"
typeMap["Lanthanoid"] = "lanthanoid"
typeMap["Actinoid"] = "actinoid"
typeMap["Noble gas"] = "noble-gas"
typeMap["Halogen"] = "halogen"

var blockMap = new Map()
blockMap['p'] = "p-block"
blockMap['d'] = "d-block"
blockMap['s'] = "s-block"
blockMap['f'] = "f-block"

// Get elements data
var elements = JSON.parse(fs.readFileSync('elements.json', 'utf8'))

// Read lines from layout file
var lines = JSON.parse(fs.readFileSync('layout.json', 'utf8'))

// Create table and load element data and create element
var body = document.getElementsByTagName('body')[0]
var table = document.createElement('table')
table.className += " table"

var tbody = document.createElement('tbody')
tbody.id = "tbody"

for (var i = 0; i < lines.length; i++) {

  // Creat row
  var trow = document.createElement('tr')
  // Split line(string) into array of ints
  var line = lines[i].split(',')

  for (var j = 0; j < line.length; j++) {

    // Create cell
    var tcell = newCell(parseInt(line[j]))

    trow.appendChild(tcell)
  }

  tbody.appendChild(trow)
}

table.appendChild(tbody)
body.appendChild(table)

onColourByBlockClicked()

function newCell(index) {

  var tcell = document.createElement('td')

  tcell.classList.add("cell")

  if (index != 0) { // Normal cell
    var element = elements[index-1]
    tcell.appendChild(document.createTextNode(element.Symbol))
    tcell.classList.add("element")
    tcell.setAttribute("element-type", element.Type)
    tcell.setAttribute("element-block", element.Block)
  } else { // Empty space
    tcell.classList.add("empty")
  }

  return tcell;
}

function onOptionsClicked() {
  document.getElementById("options-dropdown").classList.toggle("show");
}

function hideDropdowns() {
  var dropdowns = document.getElementsByClassName("dropdown")

  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i]
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show')
    }
  }
}

window.onclick = function(event) {
  if (!event.target.matches('#options-btn') && !event.target.matches('#options-dropdown')) {

    hideDropdowns()
  }
}

function onColourByBlockClicked() {
   toggleColourClass("block")

   document.getElementById("colour-by-block-done").classList.add("icon-visible")
   document.getElementById("colour-by-type-done").classList.remove("icon-visible")
 }

function onColourByTypeClicked() {
  toggleColourClass("type")

  document.getElementById("colour-by-type-done").classList.add("icon-visible")
  document.getElementById("colour-by-block-done").classList.remove("icon-visible")
}

function toggleColourClass(classType) {

  var tbody = document.getElementById("tbody")

  for (i = 0; i < tbody.childNodes.length; i++) {
    var row = tbody.childNodes[i]

    for (j = 0; j < row.childNodes.length; j ++) {
      var cell = row.childNodes[j]

      if (!cell.classList.contains("empty")) {
        var elementType = cell.getAttribute("element-type")
        var elementBlock = cell.getAttribute("element-block")

        var toRemove, toAdd

        if (classType === "type") {
          toRemove = blockMap[elementBlock]
          toAdd = typeMap[elementType]
        } else {
          toRemove = typeMap[elementType]
          toAdd = blockMap[elementBlock]
        }

        if (cell.classList.contains(toRemove)) {
          cell.classList.remove(toRemove)
        }

        if (!cell.classList.contains(toAdd)) {
          cell.classList.add(toAdd)
        }
      }
    }
  }
}
