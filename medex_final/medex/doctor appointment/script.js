let selectedDoctor = null;
let appointments = []; // Store appointments for the user

// Function to show doctors based on visit type
async function showDoctors(visitType) {
    document.getElementById('home-page').style.display = 'none';
    const doctorListPage = document.getElementById('doctor-list');
    doctorListPage.style.display = 'block';

    const doctorsDiv = document.getElementById('doctors');
    doctorsDiv.innerHTML = '';  // Clear previous content

    // Fetch doctors from the backend API (for simplicity, using static data here)
    const doctors = await fetchDoctors();

    // Display doctors dynamically
    doctors.forEach(doctor => {
        const doctorCard = `
            <div class="doctor-card">
                <img src="images/${doctor.image}" alt="${doctor.name}" class="doctor-image"  >
                <div class="doctor-info">
                
                    <h3> Name: ${doctor.name}  </h3>
                    <p>Specialization: ${doctor.specialization} </p>
                    <p>Hospital: ${doctor.hospital}</p>
                    <p>Availability time: ${doctor.availability}</p>
                    <button onclick="makeCall('${doctor.phone}')">Call Doctor</button>
                    <button onclick="selectDoctor('${doctor._id}')">Book Appointment</button>
                </div>
            </div>
        `;
        doctorsDiv.innerHTML += doctorCard;
    });
}

// Mock data: Simulate fetching doctors from backend
async function fetchDoctors() {
    return [
        { _id: '1', name: "Dr. Sarah Connor", specialization: "Cardiologist", hospital:"Heart center", image: "men doc 1.jpg", availability:"Mon-Sat(10AM - 4PM)", phone: "123-456-7890" },
        { _id: '2', name: "Dr. Jane Doe", specialization: "Dermatologist", hospital:"KR hospital", image: "lady doc 1.jpg", availability:"Mon-Fri(10AM - 6PM)", phone: "098-765-4321" },
        { _id: '3', name: "Dr. John Smith", specialization: "Neurologist", hospital:"Gem healthcare", image: "men doc 2.jpg", availability:"Mon-Sat(9AM - 5PM)", phone: "987-789-456" },
        { _id: '4', name: "Dr. Kenny", specialization: "Nephrologist", hospital:"JP Hospitals", image: "lady doc 2.jpg", availability:"Mon-Thurs(10AM - 3PM)",  phone: "555-555-5555" },
        { _id: '5', name: "Dr. Johan", specialization: "General Medicine",  hospital:"KMCH", image: "men doc 3.jpg", availability:"Mon-Sat(10AM - 4PM)", phone: "555-555-5555" },
        { _id: '6', name: "Dr. Roshini", specialization: "Surgery",  hospital:"Apollo Hospital", image: "lady doc 3.jpg", availability:"Mon-Sat(10AM - 4PM)", phone: "555-555-5555" },
        { _id: '7', name: "Dr. Krishna Moorthy", specialization: "Dentist",  hospital:"Kumaran Hospital", image: "men doc 4.jpg", availability:"Mon-Sat(10AM - 4PM)", phone: "555-555-5555" },
        { _id: '8', name: "Dr. Priyadharshini", specialization: "Gynocologist",  hospital:"ANP Nursing Home", image: "lady doc 4.jpg", availability:"Mon-Sat(10AM - 4PM)", phone: "555-555-5555" },
        { _id: '9', name: "Dr. Akilesh ", specialization: "Oncologist",  hospital:"Sri Shakthi Hospital", image: "men doc 5.jpg", availability:"Mon-Sat(10AM - 4PM)", phone: "555-555-5555" },
        { _id: '10', name: "Dr. Sukitha Sree", specialization: "Diabetologist", hospital:"Dr.Manohar Clinic", image: "lady doc 5.jpg", availability:"Mon-Sat(10AM - 4PM)", phone: "555-555-5555" },
        { _id: '11', name: "Dr. Benny Dayalan", specialization: "Psychologist ", hospital:"St.Joseph's Healthcare", image: "men doc 6.jpeg", availability:"Mon-Sat(10AM - 4PM)", phone: "555-555-5555" },
        { _id: '12', name: "Dr. Nallichandra", specialization: "Ophthalmologists ",  hospital:"Aravinf Eye Hospital", image: "lady doc 5.jpeg", availability:"Mon-Sat(10AM - 4PM)", phone: "555-555-5555" },

    ];
}

// Function to make a call (opens the phone dialer on mobile devices)
function makeCall(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

// Function to select a doctor and show the appointment page
function selectDoctor(doctorId) {
    selectedDoctor = doctorId;
    document.getElementById('doctor-list').style.display = 'none';
    document.getElementById('appointment-page').style.display = 'block';
}

// Function to handle the appointment booking
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect appointment data
    const appointment = {
        id: appointments.length + 1,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        doctorId: selectedDoctor
    };

    // Store the appointment
    appointments.push(appointment);
    
    // Display appointment status
    document.getElementById('appointment-page').style.display = 'none';
    document.getElementById('status').style.display = 'block';
    document.getElementById('status-details').innerHTML = `
        <p>Appointment confirmed with Doctor ID: ${appointment.doctorId}</p>
        <p>Name: ${appointment.name}</p>
        <p>Email: ${appointment.email}</p>
        <p>Phone: ${appointment.phone}</p>
        <p>Date: ${appointment.date}</p>
        <p>Time: ${appointment.time}</p>
    `;
});

// Function to navigate to the View Appointments Page
function navigateToAppointmentsPage() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('status').style.display = 'none';
    document.getElementById('appointment-page').style.display = 'none';
    document.getElementById('doctor-list').style.display = 'none';
    const appointmentsPage = document.getElementById('appointments-page');
    appointmentsPage.style.display = 'block';
    
    // Display all appointments in the appointments page
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';  // Clear previous list
    if (appointments.length === 0) {
        appointmentsList.innerHTML = `<p>No appointments booked yet.</p>`;
    } else {
        appointments.forEach(appointment => {
            const appointmentInfo = `
                <p>Appointment ID: ${appointment.id}</p>
                <p>Doctor ID: ${appointment.doctorId}</p>
                <p>Name: ${appointment.name}</p>
                <p>Email: ${appointment.email}</p>
                <p>Phone: ${appointment.phone}</p>
                <p>Date: ${appointment.date}</p>
                <p>Time: ${appointment.time}</p>
               <br>
            `;
            appointmentsList.innerHTML += appointmentInfo;
        });
    }
}

// Function to go back to the home page from any other page
function goBackToHome() {
    document.getElementById('doctor-list').style.display = 'none';
    document.getElementById('appointments-page').style.display = 'none';
    document.getElementById('status').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}

// Function to go back to the doctor list from the appointment page
function goBackToDoctorList() {
    document.getElementById('appointment-page').style.display = 'none';
    document.getElementById('doctor-list').style.display = 'block';
}

// Function to go back to the appointment form from the status page
function goBackToAppointment() {
    document.getElementById('status').style.display = 'none';
    document.getElementById('appointment-page').style.display = 'block';
}

// Function to go back to the home page from the appointments page
function goBackToHomeFromAppointments() {
    document.getElementById('appointments-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}
