import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import NewCropCard from '../components/NewCropCard'
import url from '../url';
import getCropDetails from "../util/CropDetails";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [id, setId] = useState('');
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.post(
          `${url}`,
          { tok: cookies.token },
          { withCredentials: true }
        );
        const { status, user, id, language } = data;
        setUsername(user);
        setId(id);
        Cookies.set('id', id);
        Cookies.set('language', language);
        Cookies.set('username', user);
        if (!status) {
          removeCookie("token");
          Cookies.remove('id');
          navigate("/login");
        }
      } catch (error) {
        removeCookie("token");
        Cookies.remove('id');
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);



  //api for post of data
  useEffect(() => {
    if (id) {
      axios.post(`${url}/Cropfetch`, { id })
        .then(response => {
          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];
          const cropDetailsArray = cropNames.map(getCropDetails);
          setCrops(cropDetailsArray);
        })
        .catch(error => {
          console.error('Error fetching crops:', error);
        });
    }
  }, [id]);

  return (
    <>
      <div className="home_page">
        <div className="new_card">
          {crops.length > 0 && <NewCropCard crop={crops[0]} crops={crops} />}
        </div>
        <div className="card_container">
          {/* Add TopCropCard and RestCropCards here if needed */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};


export default Home;