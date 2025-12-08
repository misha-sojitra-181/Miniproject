import { BrowserRouter, Routes, Route} from "react-router-dom";
import Loginmini from "./components/Loginmini";
import ForgotpasLogin from "./components/Forgotpaslogin";
import ChangepasLogin from "./components/Changepaslogin";
import Userprofile from "./components/Userprofile";
import Userdashboard from "./components/Userdashboard";
import Guestmain from "./components/Guestmain";
import Guestdashboard from "./components/Guestdashboard";
import Guestvplans from "./components/Guestvplans";
import Plansearch from "./components/Plansearch";
import Guestwifiplan from "./components/Guestwifiplan";
import Mainuser from "./components/Mainuser";
import Footer from "./components/Footer";
import Edituserprofile from "./components/Edituserprofile";
import Mobileview from "./components/Mobileview";
import Paybill from "./components/Paybill";
import Insertlogin from "./components/Insertlogin";
import Userpayment from "./components/Userpayment";
import Userfeedback from "./components/Userfeedback";
import Wifiplan from "./components/Wifiplan";
import Wifipaybill from "./components/Wifipaybill";
import Userwifipayment from "./components/Userwifipayment";

function App() {
  return (
    <BrowserRouter>
        <Routes>
             <Route path="/" element={<Mainuser />} />
            <Route path="/loginmini" element={<Loginmini />} />
            <Route path="/forgotpaslogin" element={<ForgotpasLogin />} />
            <Route path="/changepaslogin" element={<ChangepasLogin />} />
            <Route path="/userprofile" element={<Userprofile />} />
            <Route path="/userdashboard" element={<Userdashboard />} />
            <Route path="/Guestmain" element={<Guestmain />} />
            <Route path="/Guestdashboard" element={<Guestdashboard />} />
            <Route path="/Guestvplans" element={<Guestvplans />} />
            <Route path="/Guestwifiplan" element={<Guestwifiplan />} />
            <Route path="/Plansearch" element={<Plansearch />} />
            <Route path="/Mainuser" element={<Mainuser />} />
            <Route path="/Footer" element={<Footer />} />
            <Route path="/Edituserprofile" element={<Edituserprofile />} />
            <Route path="/Mobileview" element={<Mobileview />} />
            <Route path="/Paybill" element={<Paybill />} />
            <Route path="/Insertlogin" element={<Insertlogin />} />
            <Route path="/Userpayment" element={<Userpayment />} />
            <Route path="/Userfeedback" element={<Userfeedback />} />
            <Route path="/Wifiplan" element={<Wifiplan />} />
            <Route path="/Wifipaybill" element={<Wifipaybill />} />
            <Route path="/Userwifipayment" element={<Userwifipayment />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
