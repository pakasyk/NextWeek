
// let form = document.querySelector('.profile-form')
// console.log(form);

// let inputs = form.getElementsByTagName("input");
// console.log(inputs);

let validateForm = () => {

    let form = document.forms['profileForm']['nickname', 'year', 'month', 'day', 
     'height', 'weight', 'photo', 'gender' ].value;
    if(form == ''){
        console.log(form);
        alert('Not all fields filling')
        return false;
    }
}
// let validateForm2 = () => {

//     let form = document.forms['profileFormEdit']['nickname', 'year', 'month',
//      'day',  'height', 'weight', 'photo', 'gender' ].value;
//     if(form == ''){
//         console.log(form);
//         alert('Not all fields filling')
//         return false;
//     }
// }


//Result tracker 
let bodyWeightForm = document.querySelector('.bodyWeightForm');
let measurmentsForm = document.querySelector('.measurmentsForm')

let openWeightForm = () => {
    bodyWeightForm.classList.toggle('hiddenForm');
}

let openMeasForm = () => {
    measurmentsForm.classList.toggle('hiddenForm');
}

let date = document.querySelector('.date')
console.log(date.firstChild);



// let user = {
//     name: vardas,
//     surName: pavarde
// }