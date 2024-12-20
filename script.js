const steps = document.querySelectorAll('.step');
let currentStep = 0;

function nextStep(step) {
    steps[step].style.display = 'none';
    steps[step + 1].style.display = 'block';
    currentStep = step + 1;

    if (currentStep === 2) {
        renderSeats();
    }

    if (currentStep === 4) {
        generateTicket();
    }
}

function renderSeats() {
    const seatLayout = document.querySelector('.seat-layout');
    seatLayout.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.innerText = i + 1;
        seat.onclick = () => selectSeat(seat);
        seatLayout.appendChild(seat);
    }
}

let selectedSeats = [];
let totalPrice = 0;

function selectSeat(seat) {
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seat.innerText);
        totalPrice -= getPricePerSeat();
    } else {
        seat.classList.add('selected');
        selectedSeats.push(seat.innerText);
        totalPrice += getPricePerSeat();
    }
    document.getElementById('totalPrice').innerText = totalPrice;
}

function getPricePerSeat() {
    const movieSelect = document.getElementById('movieSelect');
    const price = movieSelect.options[movieSelect.selectedIndex].getAttribute('data-price');
    return parseInt(price, 10);
}

function generateTicket() {
    const movieSelect = document.getElementById('movieSelect');
    const theatreSelect = document.getElementById('theatreSelect');
    const showtimeSelect = document.getElementById('showtimeSelect');
    const paymentMethod = document.getElementById('paymentMethod');

    const ticketDetails = `
        Movie: ${movieSelect.options[movieSelect.selectedIndex].text}
        Theatre: ${theatreSelect.options[theatreSelect.selectedIndex].text}
        Show Time: ${showtimeSelect.options[showtimeSelect.selectedIndex].text}
        Seats: ${selectedSeats.join(', ')}
        Total Price: $${totalPrice}
        Payment Method: ${paymentMethod.options[paymentMethod.selectedIndex].text}
    `;

    document.getElementById('ticketDetails').innerText = ticketDetails;
}

function resetBooking() {
    steps[currentStep].style.display = 'none';
    steps[0].style.display = 'block';
    currentStep = 0;
    selectedSeats = [];
    totalPrice = 0;
    document.getElementById('totalPrice').innerText = totalPrice;
}
