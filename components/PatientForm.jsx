"use client";

import React, { useState } from 'react';
//import axios from 'axios';
import axios from '@/utils/axiosInstance';

export default function PatientForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        diagnosis: '',
        userId: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await axios.post('https://patient-crud-api.onrender.com/api/patients', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjY5NzY0NjhiNzBiNjA3MGI5YmE2OSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTY1NzcxNiwiZXhwIjoxNzUxNjYxMzE2fQ.zJDiVqV07_zTd7KDFRGDhCbtdr7F_jVT-iZ9Bnkk2WY',
                },
            }
            );
            setMessage('Patient created successfully.');
            setFormData({ name: '', age: '', diagnosis: '', userId: '' });
        } catch (err) {
            console.log(err);
            setError('Failed to create patient.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Create New Patient</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="diagnosis"
                    type="text"
                    placeholder="Diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="userId"
                    type="text"
                    placeholder="User ID"
                    value={formData.userId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
                {message && <p className="text-green-600 text-sm">{message}</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
        </div>
    );
}