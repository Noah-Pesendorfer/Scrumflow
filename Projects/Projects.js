import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZJTH0Znyi13etPM6Ag5M-lQ_WeqXOIsU",
    authDomain: "scrumflow-6e479.firebaseapp.com",
    projectId: "scrumflow-6e479",
    storageBucket: "scrumflow-6e479.appspot.com",
    messagingSenderId: "828323679259",
    appId: "1:828323679259:web:6db3cfbf89942cc3d4fcbe",
    measurementId: "G-2427QNHC73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUserData()
    } else {
        console.log("No user is signed in.");
    }
});

function loadUserData() {
    const userRef = doc(db, "users", auth.currentUser.uid)
    getDoc(userRef)
        .then(async docSnapshot => {
            if (docSnapshot.exists()) {
                const UserData = docSnapshot.data();

                document.querySelector('.username').innerHTML = UserData.name;

            } else {
                console.log("Token-Dokument existiert nicht");
            }
        })
        .catch(error => {
            console.error("Fehler beim Laden des Token-Dokuments oder beim Aufrufen von GPT3: ", error);
        });
}



//Add Project functionality
// Funktion, um das Modal zu öffnen
function openProjectModal() {
    document.getElementById('projectModal').style.display = 'block';
}
  
// Funktion, um das Modal zu schließen
function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Funktion, um ein neues Projekt hinzuzufügen, nachdem das Formular eingereicht wurde
function submitProject() {
    var projectName = document.getElementById('projectName').value;
    var projectGrid = document.querySelector('.project-grid');

    // Erstellen des neuen Projekt-Elements
    var newProject = document.createElement('div');
    newProject.innerHTML = projectName;
    // Füge hier weitere Stile oder Klassen hinzu

    // Hinzufügen zum Projekt-Grid
    projectGrid.appendChild(newProject);

    // Modal schließen
    closeProjectModal();
}

// Verhindern, dass das Formular wirklich abgeschickt wird
document.getElementById('projectForm').addEventListener('submit', function(event){
    event.preventDefault();
    submitProject();
});
