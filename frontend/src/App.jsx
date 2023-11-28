import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { CartPage, HomePage, LoginPage, SignupPage ,CheckoutPage, ProductDetailsPage,PageNotFound, OrderSuccessPage, OrdersPage, UserProfilePage, ForgotPasswordPage, AdminHomePage, AdminProductDetailPage, AdminProductFormPage, AdminOrdersPage} from './pages';
import { Protected } from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemByUserIdAsync } from './features/cart/CartSlice';
import { checkAuthAsync, removeError, selectAuthStatus, selectLoggedInUser } from './features/auth/authSlice';
import { fetchLoggedInUserAsync } from './features/user/UserSlice';
import { Logout } from './features/auth/components/Logout';
import { ProtectedAdmin } from './features/auth/components/ProctectedAdmin';



function App() {

  const dispatch=useDispatch()
  const user=useSelector(selectLoggedInUser)

  const authchecked=useSelector(selectAuthStatus)


  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[])

  useEffect(()=>{
    if(user){
      dispatch(getCartItemByUserIdAsync(user._id))
      dispatch(fetchLoggedInUserAsync(user._id))
      dispatch(removeError())
    }
  },[user,dispatch])



  return (
    <Router>

      {authchecked &&  <Routes>
        <Route path='/' element={<Protected><HomePage/></Protected>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
        <Route path='/checkout' element={<Protected><CheckoutPage/></Protected>}/>
        <Route path='/product-details/:id' element={<Protected><ProductDetailsPage/></Protected>}/>
        <Route path='/order-success/:id' element={<Protected><OrderSuccessPage/></Protected>}/>
        <Route path='/orders' element={<Protected><OrdersPage/></Protected>}/>
        <Route path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
        <Route path='/logout' element={<Protected><Logout/></Protected>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/admin' element={<ProtectedAdmin><AdminHomePage/></ProtectedAdmin>}/>
        <Route path='/admin/product-details/:id' element={<ProtectedAdmin><AdminProductDetailPage/></ProtectedAdmin>}/>
        <Route path='/admin/product-form' element={<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>}/>
        <Route path='/admin/product-form/edit/:id' element={<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>}/>
        <Route path='/admin/orders' element={<ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>}
    </Router>
  );
}

export default App;
