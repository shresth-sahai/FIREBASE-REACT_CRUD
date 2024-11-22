// Create
import { collection, addDoc } from 'firebase/firestore';
const taskRef = collection(db, 'tasks');
await addDoc(taskRef, { text: task, timestamp: serverTimestamp() });

// Read
import { getDocs } from 'firebase/firestore';
const snapshot = await getDocs(collection(db, 'tasks'));
const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// Update
import { doc, updateDoc } from 'firebase/firestore';
await updateDoc(doc(db, 'tasks', id), { text: newText });

// Delete
import { deleteDoc } from 'firebase/firestore';
await deleteDoc(doc(db, 'tasks', id));
