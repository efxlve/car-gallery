const form = document.getElementById('car-form');
const titleElement = document.querySelector('#title');
const priceElement = document.querySelector('#price');
const urlElement = document.querySelector('#url');
const cardBody = document.querySelectorAll('.card-body')[1];
const clear = document.getElementById('clear-cars');

const ui = new UI();

const storage = new Storage();

eventListener();

function eventListener() {
    form.addEventListener('submit', addCar);
    document.addEventListener('DOMContentLoaded', function () {
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });
    cardBody.addEventListener('click', deleteCar);
    clear.addEventListener('click', clearAllCars);
}

function addCar(e){
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if(title === '' || price === '' || url === ''){
        ui.displayMessages('Please fill in all fields.', 'danger');
    } else {
        const newCar = new Car(title, price, url);
        ui.addCarToUI(newCar);
        storage.addCarToStorage(newCar);
        ui.displayMessages('Car added successfully.', 'success');
    }
    ui.clearInputs(titleElement, priceElement, urlElement);
    e.preventDefault();
}

function deleteCar(e) {
    if(e.target.id === 'delete-car') {
        ui.deleteCarFromUI(e.target);
        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages('Car deleted successfully.', 'success');
    }
}

function clearAllCars(e) {
    if(confirm('Are you sure you want to delete all cars?')) {
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
        ui.displayMessages('All cars deleted successfully.', 'success');
    }
}
