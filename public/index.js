import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';


document.addEventListener('DOMContentLoaded', function() {
	const loadEl = document.querySelector('#load');

	const firebaseConfig = {
		apiKey: "AIzaSyB-MRbZLGiKFjIgEadEhR_q5fm0FVl4YH8",
		authDomain: "scurtus-3c8e3.firebaseapp.com",
		databaseURL: "https://scurtus-3c8e3-default-rtdb.firebaseio.com",
		projectId: "scurtus-3c8e3",
		storageBucket: "scurtus-3c8e3.appspot.com",
		messagingSenderId: "886568910143",
		appId: "1:886568910143:web:5f5b7f1ad6a6ecb8db278a",
		measurementId: "G-SY1PQF4XSD"
	};

	try {
		let app = initializeApp(firebaseConfig);
		let dbRef = ref(getDatabase(app));
		if (window.location.pathname != '/') {
			get(child(dbRef, `links/${window.location.pathname}`)).then((snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					if ('dest' in snapshot.val()) {
						window.location.href = snapshot.val()['dest'];
					} else {
						console.error('unable to redirect!');
					}
				} else {
					console.log('no data');
				}
			});
		}

		loadEl.textContent = 'Firebase SDK loaded';
	} catch (e) {
		console.error(e);
		loadEl.textContent = 'Error loading the Firebase SDK :(';
	}
});
