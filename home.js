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
const auth = getAuth();
let projectsArr = [];

const grid = document.querySelector('.project-grid');

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadProjects();
    } else {
        console.log("No user is signed in.");
    }
});


document.querySelector('.add-project').addEventListener('click', () => addNewProject())

function loadProjects() {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const projectsRef = collection(db, "users", auth.currentUser.uid, "projects");
    getDoc(userRef)
        .then(async docSnapshot => {
            if (docSnapshot.exists()) {
                const UserData = docSnapshot.data();
                let username = UserData.name;

                document.querySelector('.username').innerHTML = username;

            } else {
                console.log("Token-Dokument existiert nicht");
            }
            getDocs(projectsRef)
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const projectData = doc.data();

                        const project = {id: doc.id, ...projectData};

                        projectsArr.push(project);

                        grid.append('            <div\n' +
                            '                    class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">\n' +
                            '                <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">\n' +
                            '                    10\n' +
                            '                </div>\n' +
                            '                <div class="p-2 flex justify-center">\n' +
                            '                    <a href="#">\n' +
                            '                    </a>\n' +
                            '                </div>\n' +
                            '\n' +
                            '\n' +
                            '                <div class="px-4 pb-3">\n' +
                            '                    <div>\n' +
                            '                        <a href="#">\n' +
                            '                            <h5\n' +
                            '                                    class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">\n' +
                            '                                ' + project.title +
                            '                            </h5>\n' +
                            '                        </a>\n' +
                            '\n' +
                            '                        <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">\n' +
                            '                            <i>Click to view Tasks</i>' +
                            '                        </p>\n' +
                            '                    </div>\n' +
                            '                </div>\n' +
                            '            </div>\n')

                    });
                })
        })
}

function addNewProject() {
    grid.append('<a class="block p-5 rounded-lg shadow bg-white" href="#">\n' +
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
        '                            </a>');
}

