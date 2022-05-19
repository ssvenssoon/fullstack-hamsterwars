import express from "express";
const router = express.Router();

import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../database/firebase.js";
const colRef = collection(db, "hamsters");

//GET ALL
router.get("/", async (req, res) => {
  let hamsters = [];

  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  res.send(hamsters);
});

//GET RANDOM
router.get("/random", async (req, res) => {
  let hamsters = [];

  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  res.send(hamsters[Math.floor(Math.random() * hamsters.length)]);
});

//POST
router.post('/', async (req, res) => {
    let newObject = req.body
  
    const newHamster = {
      name: req.body.name,
      age: req.body.age,
      favFood: req.body.favFood,
      loves: req.body.loves,
      imgName: req.body.imgName,
      wins: req.body.wins,
      defeats: req.body.defeats,
      games: req.body.games
    }
  
    if (Object.keys(newObject).length === 0) {
      res.sendStatus(400)
      return
    }
  
    const newDocRef = await addDoc(colRef, newHamster)
    res.status(200).send({ newHamster, id: newDocRef.id })
  })

//GET ID
router.get('/:id', async (req, res) => {
    let id = req.params.id
    // Får referensen till det specifika id som man skriver in i sökvägen
    const docRef = doc(colRef, id)
    // Get-funktionen är asynkron. Den hämtar datan från databasen och lägger inuti snapshot-objektet
    const snapshot = await getDoc(docRef)
  
    // Hämta datan - data är ett vanligt JavaScript-objekt
    const data = snapshot.data()
  
    if (snapshot.exists()) {
      console.log(data)
      res.status(200).send(data)
      return
    } else res.sendStatus(404)
  })

//DELETE
router.delete("/:id", async (req, res) => {
  let idToRemove = req.params.id;
  const docRef = doc(colRef, idToRemove);

  if (idToRemove !== "id-does-not-exist") {
    await deleteDoc(docRef);
    res.sendStatus(200);
    return;
  }
  res.sendStatus(404);
});

//PUT
router.put('/:id', async (req, res) => {
    let oldDocId = req.params.id
    let newData = req.body
    const oldDocRef = doc(colRef, oldDocId)
  
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log('Object does not exist')
      res.sendStatus(400)
      return
    }
  
    if (oldDocId === 'id-does-not-exist') {
      res.sendStatus(404)
      return
    }
    await updateDoc(oldDocRef, newData)
    res.sendStatus(200)
  })

export default router;