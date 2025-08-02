import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Help from "./pages/Help";
import RoutePlanner from "./pages/RoutePlanner";
import RouteScorer from "./pages/RouteScorer";
import Stories from "./pages/Stories";
import ProfilePage from "./pages/ProfilePage";
import RoutesPage from "./pages/RoutesPage";
import OpenedPost from "./components/OpenedPost";
import SavedPosts from "./pages/SavedPosts";
import SavedPost from "./pages/SavedPost";
import CreatePost from "./components/CreatePost";
import Drafts from "./components/Drafts";
import DraftPost from "./pages/DraftPost";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatButton from "./components/ChatButton";

function App() {
  const user = localStorage.getItem("user");
  console.log("link: ", Link);
  console.log("browserRouter: ", BrowserRouter);
  
  

  return (
    <BrowserRouter>
      <div className="flex flex-col h-[100vh]">
        <Header />
        <ChatButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Stories />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/routeplanner" element={<RoutePlanner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/routescorer" element={<RouteScorer />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/blog/stories/:id" element={<OpenedPost />} />
          <Route path="/blog/:id/saved" element={<SavedPosts />} />
          <Route path="/user/saved/:id" element={<SavedPost />} />
          <Route path="/posts/new" element={user && <CreatePost />} />
          <Route path="/user/drafts" element={user ? <Drafts /> : <Login />} />
          <Route path="/user/draft/:id" element={<DraftPost />} />
          <Route path="/user/posts" element={<MyPosts />} />
          <Route path="/stories/:id/edit" element={<EditPost />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
