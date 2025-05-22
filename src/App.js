import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RoleBasedLayout from './layouts/RoleBasedLayout';
import Upload from './pages/Upload';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';
import DashboardRouter from './pages/DashboardRouter';
import CreateUser from './pages/CreateUser';
import ManageUsers from './pages/ManageUsers';
import EditUser from './pages/EditUser';
import ViewDocument from './pages/ViewDocument';
import FolderView from './pages/FolderView';
import Trash from './pages/Trash';
import Notifications from './pages/Notifications';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<RoleBasedLayout />}>
        <Route path="create-user" element={<CreateUser />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="edit-user/:email" element={<EditUser />} />
        <Route path="view-document/:id" element={<ViewDocument />} />
        <Route path="folders" element={<FolderView />} />
        <Route path="trash" element={<Trash />} />
        <Route path="notifications" element={<Notifications />} />
          <Route path="dashboard" element={<DashboardRouter />} />
          <Route path="upload" element={<Upload />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;