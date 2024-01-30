document.addEventListener('DOMContentLoaded',()=>{
    const itemlist=document.getElementById('item-list');
    //funcion para las solicitudes

    async function solicitudItems(){
        itemlist.innerHTML="";

        const response=await fetch('/items');
        const items=await response.json();

        items.forEach(item=>{
            const listItem=document.createElement('li');
            listItem.textContent=item.nombre;
            itemlist.appendChild(listItem);
        });
    }

    window.updateItem= async function(){
        const updateId=document.getElementById('id').value;
        const updateNombre=document.getElementById('actualizacion-nombre').value;
        console.log(updateId+updateNombre);
        const response=await fetch(`/items/${updateId}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({nombre: updateNombre}),
        });

        if(response.ok){
            solicitudItems();
        }else{
            alert('Error al actualizar le producto');
        }
    };
    //funcion para eliminar un producto
    window.deleteItem= async function(){
        const deleteId=document.getElementById('eliminar-id').value;

        const response=await fetch(`/items/${deleteId}`,{
            method:'DELETE',
        });

        if(response.ok){
            solicitudItems();
        }else{
            alert('Error al eliminar el producto');
        }
    };

    solicitudItems();
    //Funcion para actualizar el formulario //Actualizacion
    window.updateItemFromIndex=async function(){
        const idActualizar=document.getElementById('actualizar-formulario')
    }
    //Funcion para actualizar formulario //Eliminacion 
});