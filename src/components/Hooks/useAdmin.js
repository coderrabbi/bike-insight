import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.isAdmin);
          setLoading(false);
        });
    }
  }, [email]);
  return [admin, loading];
};

export default useAdmin;
