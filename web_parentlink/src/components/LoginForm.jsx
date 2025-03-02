import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onClose }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Local validation
        if (!formData.username.trim() || !formData.password.trim()) {
            setErrorMessage('El nombre de usuario y la contraseña son obligatorios');
            return;
        }

        console.log(JSON.stringify({
                    username: formData.username,
                    password: formData.password,        
                }))

        try {
            const response = await fetch('http://localhost:8081/api/usersystem/login', { // Replace with your endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,        
                }),
            });

            console.log({response})

            if (response.ok) {
                navigate('/me');
                const result = await response.json();
                console.log('User successfully logged in:', result);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error while sending data:', error);
            setErrorMessage('Error en el servidor!!!');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="registration-form-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                {/* Close button */}
                <button className="close-button" type="button" onClick={onClose}>
                    ✖
                </button>
                <h2>Iniciar sesión</h2>
                <div className="form-group">
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group password-group">
                    <label htmlFor="password">Contraseña:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="show-password-button"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button className="submit-button" type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default LoginForm;
