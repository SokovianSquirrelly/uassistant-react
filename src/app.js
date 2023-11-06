import "./App.css";
import { Auth } from "./components/auth";
import { db } from "./firebase-config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [donorList, setDonorList] = useState([]);

  const donorCollectionRef = collection(db, "DonorsTest");

  useEffect(() => {
    const getDonorList = async () => {
      try {
        const data = await getDocs(donorCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDonorList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getDonorList();
  }, []);

  return (
    <div className="app">
      <Auth />
      <div>
        {donorList.map((donor) => (
          <div>
            <p>
              {donor.firstName} {donor.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
