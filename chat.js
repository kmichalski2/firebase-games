const messagesColection = collection(db, 'messages');

onSnapshot(messagesColection, (querySnapshot) => {
  querySnapshot.docs.forEach(doc => {
    console.log(`${doc.data().senderName}: ${doc.data().content}`);
  })
})