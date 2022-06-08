import React, {useState} from 'react';
import { firestoreStore, app } from '../../firebase.config';

const { query, where, collection, orderBy, limit } = firestoreStore;

const useUserDetails = async () => {

  const firestoreInstance = firestoreStore.getFirestore();
  const myuser = await firestoreStore.getDoc(firestoreStore.doc(firestoreInstance, "users/", app.currentUser.uid));
  
  const usersDb = await firestoreStore.getDocs(firestoreStore.collection(firestoreInstance, "users"));
  const productDb = await firestoreStore.getDocs(firestoreStore.collection(firestoreInstance, "products"));
  // const productDbc = firestoreStore.collection(firestoreInstance, "products");

  let realproducts = productDb.docChanges().map((y) => ({...y.doc.data(), id: y.doc.id}));
  let products = realproducts;

  const mapUsers = usersDb.docs.map((x) => ({...x.data(), id: x.id }));
  products = products.map(eachProduct => {
    const [sellerDetails] = mapUsers.filter((user) => user.id === eachProduct.seller_id)
    return {
      ...eachProduct,
      seller_avatar: sellerDetails.profile
    }
  })

  const orderQuery = query(collection(firestoreInstance, "orders"), where("userId", "==", app.currentUser.uid));
  const orderQueryTrans = query(collection(firestoreInstance, "orders"), where("userId", "==", app.currentUser.uid), orderBy("createdAt", "desc"), limit(3));

  const ordersDb = await firestoreStore.getDocs(orderQuery);
  const orders = ordersDb.docs.map((x) => {
    const [product] = products?.filter((a) => a.id === x?.data()?.productId);
    
    return {...x.data(), id: x.id, product}});


  const ordersDbTran = await firestoreStore.getDocs(orderQueryTrans);
  const ordersTran = ordersDbTran.docs.map((x) => {

    const [product] = products?.filter((a) => a.id === x?.data()?.productId);
    
    return {...x.data(), id: x.id, product}});


  return {user: myuser.data(), products, orders, ordersTran}
}

export default useUserDetails;