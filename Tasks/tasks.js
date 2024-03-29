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
const currentProject = "NX1cH7RBU17dK2GZJs0G";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in with ID: ", user.uid);
        loadUserData();
    } else {
        console.log("No user is signed in.");
    }
});

document.querySelector('.add-task').addEventListener('click', () => addNewTask())

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

function loadTasksOfProject() {
    const projRef = collection(db, "users", auth.currentUser.uid, "projects", currentProject)
}

function addNewTask() {
    const todolist = document.querySelector('.To-Do-List');
    let newTask = document.createElement('li');
    newTask.classList.add('mt-3');
    newTask.innerHTML = '<a class="block p-5 rounded-lg shadow bg-white" href="#">\n' +
        '                                <div class="flex justify-between">\n' +
        '                                    <p class="text-sm w-48 font-medium leading-snug text-gray-900">Add discount code to\n' +
        '                                        checkout page</p>\n' +
        '                                    <span>\n' +
        '                                                    <img class="h-6 w-6 ml-4 rounded-full "\n' +
        '                                                         src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=144&h=144&q=60">\n' +
        '                                            </span>\n' +
        '                                </div>\n' +
        '                                <div class="flex justify-between items-baseline">\n' +
        '                                    <time class="text-sm" datetime="2019-09-14">Sep 14</time>\n' +
        '                                    <div class="mt-2">\n' +
        '                                                <span class="px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded">\n' +
        '                                                    <svg class="h-2 w-2 text-teal-500" viewbox="0 0 8 8" fill="#000000">\n' +
        '                                                        <circle cx=\'4\' cy=\'4\' r=\'3\'/>\n' +
        '                                                    </svg>\n' +
        '                                                    <span class="ml-2 text-teal-900 font-medium text-sm ">Feature Request</span>\n' +
        '                                                </span>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </a>';
    todolist.appendChild(newTask);
}



