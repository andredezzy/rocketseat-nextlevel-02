import React, { useCallback } from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const handleCreateNewConnection = useCallback(() => {
    api.post('connections', { user_id: teacher.id });
  }, [teacher.id]);  

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{teacher.cost}</strong>
        </p>

        <a 
          href={`https://wa.me/${teacher.whatsapp}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={handleCreateNewConnection}
        >
          <img src={whatsAppIcon} alt="WhatsApp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;