import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdNotificationsNone  } from 'react-icons/md';
import './SinoNotificacao.css'; 

const API_BASE_URL = 'http://localhost:8084';

const SinoNotificacao = () => {
    const [notificacoes, setNotificacoes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem('token');

    const unreadCount = notificacoes.filter(n => !n.lida).length;

    useEffect(() => {
        const fetchNotificacoes = async () => {
            if (!token) return;
            try {
                const response = await axios.get(`${API_BASE_URL}/notificacoes`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotificacoes(response.data);
            } catch (error) {
                console.error("Erro ao buscar notificações:", error);
            }
        };
        fetchNotificacoes();
        const interval = setInterval(fetchNotificacoes, 60000); 
        return () => clearInterval(interval);
    }, [token]);

    const handleToggle = async () => {
        setIsOpen(!isOpen);
        if (!isOpen && unreadCount > 0) {
            try {
                await axios.put(`${API_BASE_URL}/notificacoes/marcar-como-lidas`, null, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
            } catch (error) {
                console.error("Erro ao marcar notificações como lidas:", error);
            }
        }
    };

    return (
        <div className="notification-bell">
            <button onClick={handleToggle} className="bell-button">
                <MdNotificationsNone  />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </button>
            {isOpen && (
                <div className="notification-dropdown">
                    {notificacoes.length > 0 ? (
                        notificacoes.map(notificacao => (
                            <Link to={notificacao.link} key={notificacao.id} className="notification-item" onClick={() => setIsOpen(false)}>
                                <p>{notificacao.mensagem}</p>
                                <small>{new Date(notificacao.createdAt).toLocaleString()}</small>
                            </Link>
                        ))
                    ) : (
                        <div className="notification-item">
                            <p>Nenhuma notificação nova.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SinoNotificacao;
