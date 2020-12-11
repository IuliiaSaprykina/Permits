const permitSelect = document.querySelector('#permit-select');
// import { verify } from './usps.js';
import usps from './usps.js'
const permitsURL = "http://localhost:3000/permits"
const userId = "503BYTEF2297"





fetch(permitsURL)
    .then(parseJSON)
    .then(displayPermitOptions)

function parseJSON(response){
    return response.json()
}

function displayPermitOptions(permits){
    permits.forEach(permit => {
        // console.log(permit)
        let permitOption = document.createElement('option')
        permitOption.innerText = permit.permite_type
        permitOption.value = permit.id

        permitSelect.append(permitOption)

    });
}

const permitSelectForm = document.querySelector('.permit-types form');

permitSelectForm.addEventListener('submit', (event) => {
    event.preventDefault();
        
    const formData = new FormData(event.target);
    const permitId = formData.get('permit_id');
    localStorage.setItem("permit_id", permitId)
})

const permitForm = document.querySelector('.permit-form form');
const userUrl = "http://localhost:3000/users/"
const userPermitsUrl = "http://localhost:3000/user_permits/"


permitForm.addEventListener('submit', (event) => {
    event.preventDefault();
        
    let addressObj = {}
    let today = new Date().toISOString().slice(0, 10)
    const formData = new FormData(event.target);
    const userName = formData.get('username');
    const userAddress = formData.get('address');
    userAddress.split(",")
    addressObj.Address2 = userAddress[0]
    addressObj.City = userAddress[1]
    addressObj.State = userAddress[2]
    addressObj.Zip = userAddress[3]
    verifiedAddress = usps.verify(addressObj)
    if (verifiedAddress) {
        const newUserPermit = {
            user_id: localStorage.getItem(user_id),
            permit_id: localStorage.getItem(permit_id),
            data: today,
            is_permit: true
        };
    
        fetch(userUrl)
            .then(parseJSON)
            .then(users => {
                users.forEach(user => {
                   if (user.username === userName) {
                       localStorage.setItem("user_id", user.id)
                   }
        })
    
        fetch(userPermitsUrl, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(newUserPermit)
        })
            .then(parseJSON)
        })
    }

})
