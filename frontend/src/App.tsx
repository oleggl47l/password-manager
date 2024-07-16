import 'bootstrap/dist/css/bootstrap.min.css';

import PasswordEntityTable from "./components/PasswordEntityTable.tsx";

function App() {

  return (
      <div className="container mt-5 text-center">
          <h1>Менеджер паролей</h1>
          <PasswordEntityTable/>
      </div>

  );
}

export default App
