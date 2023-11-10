let name = document.querySelector('#name');
let Price = document.querySelector('#Price');
let text = document.querySelector('#text');
let AddProductbtn = document.querySelector('#AddProduct');
let tablerow = document.querySelector('#tablerow');
let message = document.querySelector('#message');


async function getdata(){
  let box=``

  let x=await fetch("http://localhost:3000/get",{method:"GET"});
console.log(x);
let y=await x.json()
console.log(y);
let array=y.data;

localStorage.setItem("database",JSON.stringify(array))
for(var i=0;i<array.length;i++){
  box+=`
  <tr>
  <td>${array[i].id}</td>
  <td id="namee">${array[i].name}</td>
  <td id="pricee">${array[i].price}</td>
  <td>${array[i].description}</td>
  <td>
    <div class="mx-auto text-center">
      <button class="btn btn-danger" onclick="deleteProduct(${array[i].id})">Delete</button>
    </div>
  </td>
  <td>
    <div class="mx-auto text-center">
      <button class="btn btn-warning" onclick="update(${array[i].id})">Update</button>
    </div>
  </td>
</tr>
  
  `
}
tablerow.innerHTML = box;

console.log(array);
}

async function adddata() {
  // Get the values from the input fields
  const nameValue = name.value;
  const priceValue = Price.value;
  const descriptionValue = text.value;

  // Create a JavaScript object with the data
  const data = {
    name: nameValue,
    price: priceValue,
    description: descriptionValue,
  };

  // Send a POST request with JSON data
  let send = await fetch("http://localhost:3000/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Convert the data object to a JSON string
  });
  getdata()
  // Parse the response as JSON
  let jsn = await send.json();
  console.log(jsn);
  
}

async function productupdeted(idproduct){
  let data={
    name:name.value,
    price:Price.value,
    description:text.value
  }
  let response=await fetch(`http://localhost:3000/edit/${idproduct}`,{method:"PATCH", body: JSON.stringify(data), headers: {
    "Content-Type": "application/json",
  }})
let getdata=await response.json()
console.log(getdata);
}


async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Product deleted successfully
      console.log(`Product with id ${id} deleted successfully.`);
      // Optionally, you can refresh the data after deletion by calling getdata() again.
      getdata();
    } else {
      // Handle the case where the delete request was not successful.
      console.error('Failed to delete the product.');
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch.
    console.error('Error deleting the product:', error);
  }
}

async function update(index){

  let id=index-1
  let arr=JSON.parse(localStorage.getItem("database"));
  console.log(index);
  localStorage.setItem("id",index)
name.value=arr[id].name;
Price.value=arr[id].price;
text.value=arr[id].description;
console.log(arr[id].name,arr[id].price);
 AddProductbtn.innerHTML='Update Product';
     AddProductbtn.classList='btn btn-warning text-light w-75 button'
   
  
    
}



AddProductbtn.addEventListener('click', () => {

  if(name.value==`` && Price.value==`` && text.value==``){
    message.innerHTML="All Inputs Are Require"
  }
  else if(name.value==`` || Price.value==`` || text.value==``){
    message.innerHTML="All Inputs Are Require"
  }
  else{
    message.innerHTML=""
  }

 
  if(AddProductbtn.innerHTML=='Add Product'){
    adddata()
    // arr.push({ name: name.value, price: Price.value, text: text.value });
    // localStorage.setItem('data', JSON.stringify(arr));
    // display();
    name.value='';
    Price.value='';
    text.value='';
  }
  else if(AddProductbtn.innerHTML=='Update Product'){
    let id = localStorage.getItem("id")
    console.log(id);
    productupdeted(id);
   
    AddProductbtn.innerHTML='Add Product';
    AddProductbtn.classList='btn btn-success text-light w-75 button';
    
    adddata()

    // display();
    name.value='';
    Price.value='';
    text.value='';
}


});
getdata()