import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase , ref ,  push ,onValue ,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-d6873-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database,"shoppingList")
 
const inputFiled = document.getElementById("inputFiled")
const btn =  document.getElementById("btn")
const shoppingList =  document.getElementById("shopping-list")

btn.addEventListener("click" , function(){
    let inputValue = inputFiled.value
    push(shoppingListDB ,inputValue )
    clearInputFieldEl()
})
onValue(shoppingListDB,function(snapshot){
    if (snapshot.exists()) {
    let itemArray = Object.entries(snapshot.val())
    clearShoppingListEl()
    for(let i = 0 ; i<itemArray.length ; i++){
        let currentItem = itemArray[i]
        let currentItemID = itemArray[0]
        let currentItemValue = itemArray[1]
        appendItemToShoppingListEl(currentItem)
    } } else {
        shoppingList.innerHTML = ""

    }

})

function clearShoppingListEl() {
    shoppingList.innerHTML = ""
}


function clearInputFieldEl(){
    inputFiled.value = ''
}

function appendItemToShoppingListEl(context) {
    let itemId = context[0]
    let itemValue = context[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingList.append(newEl)

}

