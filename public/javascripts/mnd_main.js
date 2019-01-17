/* Floating Label Fix */
document.querySelector('#exerciseCreate .modal-content').addEventListener("click", event => {

    document.querySelectorAll('fieldset').forEach(element => {         
        element.classList.remove("is-focused");
    });

    if (event.target.classList.contains("form-group")) {
        event.target.classList.add("is-focused");

    } else if (event.target.parentNode.classList.contains("form-group")) {
        event.target.parentNode.querySelector('label').classList.add("bmd-label-static");
        event.target.parentNode.classList.add("is-focused");

    }
});
document.querySelector('#exerciseEdit .modal-content').addEventListener("click", event => {

    document.querySelectorAll('fieldset').forEach(element => {         
        element.classList.remove("is-focused");
    });
    if (event.target.classList.contains("form-group")) {
        event.target.classList.add("is-focused");
    } else if (event.target.parentNode.classList.contains("form-group")) {
        event.target.parentNode.classList.add("is-focused");
    }
});

/* Edit Modal */
document.querySelectorAll('td').forEach(element=>{
    element.addEventListener("click", event => {
        console.log(event.target.parentNode.dataset.id);
        let editID = event.target.parentNode.dataset.id;
        const editForm = document.querySelector('#exerciseEditForm');

        let selected = exerciseArray.filter(exercise => exercise._id == editID);
        console.log(editForm.querySelector('.form-control[name="name"]'));
        editForm.querySelector('.form-control[name="_id"]').value = selected[0]._id;
        editForm.querySelector('.form-control[name="name"]').value = selected[0].name;
        editForm.querySelector('.form-control[name="muscle"]').value = selected[0].muscle._id;
        editForm.querySelector('.form-control[name="category"]').value = selected[0].category._id;
        editForm.querySelector('.form-control[name="equipment"]').value = selected[0].equipment._id;
        editForm.querySelector('.form-control[name="description"]').value = selected[0].description;
        
    });
});

console.log(exerciseArray);