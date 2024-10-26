import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { ContactDisplay } from "../components/EmergencyContactDisplay";
import { ContactForm } from "../components/EmergencyContactForm";
import { Button } from "@nextui-org/react";

type User = {
  displayName: string | null;
  email: string | null;
};

interface Contact {
  id: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

const Profile: React.FC = () => {
  const { logout, getUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = getUser();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addContact = (newContact: Contact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...newContact, id: Date.now().toString() },
    ]);
    setShowForm(false);
  };

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    void logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {user?.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
      <div>
        <h1>Emergency Contact</h1>

        {contacts.length === 0 ? (
          <p className="text-lg mb-4">No Emergency Contact Added</p>
        ) : (
          contacts.map((contact) => (
            <ContactDisplay key={contact.id} contact={contact} />
          ))
        )}

        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            Add Emergency Contact
          </Button>
        )}

        {showForm && (
          <ContactForm
            onSubmit={addContact}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
