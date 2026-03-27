import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomeScreen,
  FeedScreen,
  CollectionScreen,
  JourneyDetailScreen,
  RecordScreen,
  RecordByDateScreen,
  RecordByBookScreen,
  BookRecordsScreen,
  RecordDetailScreen,
  BookInfoScreen,
  JobJourneysScreen,
} from "@/screens";
import { AppProviders } from "./providers";
import PrologueScreen from "@/screens/prologue/Prologue";
import StartGate from "./StartGate";
import EndingScreen from "@/screens/ending/Ending";
import GrowthScreen from "@/screens/growth/Growth";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartGate/>}/>

          <Route path="/prologue" element={<PrologueScreen/>} />
          <Route path="/home" element={<HomeScreen />} />

          <Route path="/feed" element={<FeedScreen />} />
          <Route path="/growth" element={<GrowthScreen />} />

          <Route path="/record" element={<RecordScreen />} />
          <Route path="/record/:recordId" element={<RecordDetailScreen />} />

          <Route path="/record/by-date" element={<RecordByDateScreen />} />
          <Route path="/record/by-book" element={<RecordByBookScreen />} />
          <Route path="/record/by-book/:bookId" element={<BookRecordsScreen />} />

          <Route path="/book/:bookId" element={<BookInfoScreen />} />

          <Route path="/collection" element={<CollectionScreen />} />
          <Route path="/collection/jobs/:genre" element={<JobJourneysScreen />} />
          <Route path="/collection/journeys/:animalId" element={<JourneyDetailScreen />}/>
        
          <Route path="/ending" element={<EndingScreen/>}/>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;