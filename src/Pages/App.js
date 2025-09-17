
import { Route, Routes } from 'react-router-dom';
import HomePage from './website/HomePages';
import Login from './Auth/Login';
import Register from './Auth/Register'
import Users from './Dashboard/Users';
import GoogleCallBack from './Auth/GoogleCallBack';
import Dashboard from './Dashboard/Dashboard';
import AuthRequire from './Auth/AuthRequire';
import User from './Dashboard/User';
import AddUser from './Dashboard/AddUser';
import Err404 from './Auth/404';
import Categories from './Dashboard/Categories';
import AddCategory from './Dashboard/AddCategory';
import Category from './Dashboard/Category';
import Products from './Dashboard/Products';
import AddProduct from './Dashboard/AddProduct';
import Product from './Dashboard/Product';
import WebSiteCategories from './website/WebSiteCategories';
import WebSite from './website/WebSite';
import SingleProduct from './website/SingleProduct/SingleProduct';
import SingleCategory from './website/SingleCategory/SingleCategory';
import SearchProduct from './website/Search/SearchProduct';
function App() {
  return (
    <div className="App">
     <Routes>
      {/* public route */}
      <Route element={<WebSite/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/categories' element={<WebSiteCategories/>}/>
      <Route path='/search' element={<SearchProduct/>}/>
      <Route path='/category/:id' element={<SingleCategory/>}/>
      <Route path='/product/:id' element={<SingleProduct/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/auth/google/callback' element={<GoogleCallBack/>}/>
      <Route path='/*' element={<Err404/>}/>
      {/* protacted route */}
      <Route element={<AuthRequire allowedRole={['1995','1996','1999']}/>}  >
      <Route path='/dashboard' element={<Dashboard/>}>
         <Route element={<AuthRequire allowedRole={['1995']}/>}  >
          <Route path='users' element={<Users/>}/>
          <Route path='users/:id' element={<User/>}/>
          <Route path='user/add' element={<AddUser/>}/>
        </Route>

         <Route element={<AuthRequire allowedRole={['1999','1995']}/>}  >
           {/* categories */}
          <Route path='categories' element={<Categories/>}/>
          <Route path='categories/:id' element={<Category/>}/>
          <Route path='category/add' element={<AddCategory/>}/>
           {/* Products */}
          <Route path='products' element={<Products/>}/>
          <Route path='products/:id' element={<Product/>}/>
          <Route path='product/add' element={<AddProduct/>}/>
  
        </Route>
        
      </Route>
      </Route>
     </Routes>
    </div>
  );
}

export default App;
