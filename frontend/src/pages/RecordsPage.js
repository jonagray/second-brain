import React, { useState, useEffect } from 'react';

function RecordsPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('/api/records');
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
        // Handle the error appropriately
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="records-page">
      <h2>Records</h2>
      {records.length > 0 ? (
        <ul>
          {records.map((record, index) => (
            // Assuming each 'record' has 'id', 'title', and 'description' fields
            <li key={record.id || index}>
              <strong>{record.title}</strong> - {record.description}
              {/* You can add more details from the record here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  );
}

export default RecordsPage;
