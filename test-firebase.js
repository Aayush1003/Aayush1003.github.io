// Test Firebase Connection
// Run this in browser console after configuring Firebase

function testFirebaseConnection() {
  if (!window.db) {
    console.error('Firebase not initialized');
    return;
  }

  console.log('Firebase initialized successfully!');
  console.log('Testing Firestore connection...');

  // Test write (optional - you can remove this)
  const testData = {
    test: true,
    timestamp: new Date(),
    message: 'Firebase connection test'
  };

  // Uncomment to test actual write:
  // addDoc(collection(window.db, 'test'), testData)
  //   .then(() => console.log('Test write successful'))
  //   .catch(error => console.error('Test write failed:', error));
}

testFirebaseConnection();