import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  query,
  orderByChild,
  limitToLast,
  get,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://leteatsnow-279f5-default-rtdb.firebaseio.com',
  projectId: 'leteatsnow-279f5',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: '120392517218',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function submitScore(name, score) {
  const scoresRef = ref(db, 'scores');
  push(scoresRef, { name, score })
    .then(() => console.log('Score submitted successfully'))
    .catch((error) => console.error('Error submitting score:', error));
}

export async function getTopScores() {
  const scoresRef = ref(db, 'scores');
  const topScoresQuery = query(
    scoresRef,
    orderByChild('score'),
    limitToLast(10),
  );

  try {
    const snapshot = await get(topScoresQuery);
    if (snapshot.exists()) {
      const scores = [];
      snapshot.forEach((childSnapshot) => {
        scores.push(childSnapshot.val());
      });

      // Sort descending because `limitToLast` gives the lowest first
      scores.sort((a, b) => b.score - a.score);
      return scores;
    } else {
      console.log('No scores found');
      return [];
    }
  } catch (error) {
    console.error('Error retrieving scores:', error);
  }
}
