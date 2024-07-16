import 'bootstrap/dist/css/bootstrap.min.css';

import PasswordTable from "./components/PasswordEntityTable.tsx";

function App() {

  return (
      <div className="container mt-5">
        <h1>Менеджер паролей</h1>
        <PasswordTable />
      </div>
  );
}

export default App
