$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

let selectOptions = "";

const fetchAsync = async (url) =>
    await (await fetch(url)).json();

fetchAsync("/exercises/findAll")
    .then(data => {
        let selectElements = document.querySelectorAll('select[name="exercise"]');
        let tempOptions = '<option value="" selected disabled hidden></option>';

        if (Object.keys(data).length) {

            for (let i = 0; i < data.length; ++i) {
                tempOptions += `<option value="${data[i]._id}">${data[i].name}</option>`;
            }

            // selectElements.forEach(element => {
            //     element.innerHTML = tempOptions;
            // });

            // selectElements.innerHTML = tempOptions;
            selectOptions = tempOptions;
        }

    })
    .catch(reason => console.log(reason.message));


document.querySelector('button.add').addEventListener('click', () => {
    console.log("clicked");
    let node = document.createElement('div');
    node.classList.add('row');
    node.innerHTML = `<fieldset class="form-group bmd-form-group col">
    <label for="exercise" class="bmd-label-floating">Exercise</label>
    <select name="exercise" class="form-control" onchange="genExerciseBlock(this)">
       ${selectOptions}
    </select>
</fieldset>`;
document.querySelector('form#createForm').appendChild(node);
    
});


let genExerciseBlock = element => {
    let exerciseTitle = element.options[element.selectedIndex].text;
    let exerciseValue = element.value;
    let fragment = document.createDocumentFragment();
    element.parentNode.parentNode.remove();

    let node = document.createElement('div');
    node.classList.add('exerciseContainer', 'bg-secondary', 'text-white');

    node.innerHTML = `
   
        <div class="exerciseHeader pl-3 pt-2 pr-2" data-id="${exerciseValue}"><h6 class="float-left">${exerciseTitle}</h6><span class="trash oi oi-trash float-right" style="font-size: 1rem;" onclick="deleteExercise(this)"></span></div>
        <table class="table table-sm table-hover table-light">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Sets</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Weight</th>
                        
                    </tr>
                </thead>
                <tbody>
                   <tr>
                       <td scope="row">
                       <select name="sets" onchange="genExerciseSet(this)">
                       <option value="1" selected>1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                       <option value="6">6</option>
                       
                       </select>
                       </td>
                       <td><input type="number" name="reps" min="1" max="1000" value="8"></td>
                       <td><input type="number" name="weight" min="0" max="999" value="50"></td>
                   </tr>


                </tbody>
            </table>
 
    `;    
    fragment.appendChild(node);
    document.querySelector('form#createForm').appendChild(fragment);
}


let genExerciseSet = element => {
    console.log(element.value);
    let tbody = element.parentNode.parentNode.parentNode;
    console.log(tbody);
    let tempSets = "";
    let fragment = document.createDocumentFragment();
   
    
    
    if (element.value > tbody.querySelectorAll('tr').length){
        console.log("tr length"+ tbody.querySelectorAll('tr').length);
        for (let i = 0; i < (element.value - tbody.querySelectorAll('tr').length); i++){
            let node = document.createElement('tr');
            node.innerHTML += `
                       <td scope="row"></td>
                       <td><input type="number" name="reps" min="1" max="1000" value="${tbody.querySelector('input[name="reps"]').value}"></td>
                       <td><input type="number" name="weight" min="0" max="999" value="${tbody.querySelector('input[name="weight"]').value}"></td>
                   `;
                  fragment.appendChild(node);
        }
        // tbody.innerHTML += tempSets;
        tbody.appendChild(fragment);
        
    } else if (element.value < tbody.querySelectorAll('tr').length) {
        for (let i = tbody.querySelectorAll('tr').length; i > element.value; i--){
            tbody.querySelectorAll('tr')[i-1].remove();
            
        }

    }
}

let deleteExercise = element => {
    element.parentNode.parentNode.remove();
}

/* Add new Ajax Post requestas */
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}


document.querySelector('button.addNew').addEventListener("click", () => {
    // document.querySelector('form#createForm input[name="name"]').value;
    let sets = [];
    let exercises = [];
    let dataForDb = {};
    let name = document.querySelector('form#createForm input[name="name"]').value;
    console.log(document.querySelector('form#createForm input[name="name"]').value);

    dataForDb.name = document.querySelector('form#createForm input[name="name"]').value;
    dataForDb.exercises = [];


    document.querySelectorAll('.exerciseContainer').forEach((container, index) => {
        dataForDb.exercises.push({});
        console.log(container.querySelector('.exerciseHeader').dataset.id);
        exercises.push(container.querySelector('.exerciseHeader').dataset.id);
        dataForDb.exercises[index]._id = container.querySelector('.exerciseHeader').dataset.id;
        dataForDb.exercises[index].sets = [];
        sets.push([]);
        
        console.log("index: "+index);
        
        

        for (let i = 1; i<container.querySelectorAll('tr').length;i++){
            // container.querySelectorAll('tr')[i].querySelector('input[name="reps"]').value;
            // container.querySelectorAll('tr')[i].querySelector('input[name="weight"]').value;
            console.log(container.querySelectorAll('tr')[i].querySelector('input[name="reps"]').value);
            sets[index].push([container.querySelectorAll('tr')[i].querySelector('input[name="reps"]').value, container.querySelectorAll('tr')[i].querySelector('input[name="weight"]').value]);
            dataForDb.exercises[index].sets.push([{reps:container.querySelectorAll('tr')[i].querySelector('input[name="reps"]').value},{weight:container.querySelectorAll('tr')[i].querySelector('input[name="weight"]').value}]);
        }

        
        
        
    })
    console.log(sets);
    console.log(exercises);
    console.log("datafordb:");
    
    console.log(dataForDb);
    
    
    postAjax('workouts', JSON.stringify(dataForDb), function(data){ console.log(data); });
});