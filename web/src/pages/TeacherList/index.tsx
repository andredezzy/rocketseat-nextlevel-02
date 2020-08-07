import React, { useState, useCallback } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import './styles.css';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const handleSearchTeachers = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await api.get('classes', { 
      params: { 
        subject, 
        week_day, 
        time,
      },
    });

    setTeachers(response.data);
  }, [subject, time, week_day]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select 
            name="subject" 
            label="Matéria"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Inglês', label: 'Inglês' },
            ]}
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <Select 
            name="week_day" 
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
          />
          <Input 
            type="time" 
            name="time" 
            label="Hora"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;