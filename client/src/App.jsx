import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/header/Header"));
const About = lazy(() => import("./pages/About"));
const Flowers = lazy(() => import("./pages/Flowers"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Suspense fallback={"Loading..."}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/flowers" element={<Flowers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/single-product/:id" element={<SingleProduct />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
