import { useState, useEffect } from 'react';
import Login from '@/components/admin/Login';
import AdminLayout from '@/components/admin/AdminLayout';
import CarouselEditor from '@/components/admin/CarouselEditor';
import ContactEditor from '@/components/admin/ContactEditor';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<'carousel' | 'contact'>('carousel');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={handleLogout}
    >
      {activeSection === 'carousel' && <CarouselEditor />}
      {activeSection === 'contact' && <ContactEditor />}
    </AdminLayout>
  );
};

export default Admin;