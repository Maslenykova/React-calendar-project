import React, { useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import './header.scss';
import { months } from '../../utils/dateUtils.js';


const Header = ({ weekDates, onPrevWeek, onNextWeek, onToday, onAddEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const createTask = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleModalSubmit = (formData) => {
    onAddEvent(formData); 
    closeModal();
  };
  const getDisplayedMonths = (weekDates) => {
        if (!weekDates || weekDates.length === 0) return '';
    
        const firstMonth = months[weekDates[0].getMonth()];
        const lastMonth = months[weekDates[weekDates.length - 1].getMonth()];
        
        return firstMonth === lastMonth ? firstMonth : `${firstMonth} - ${lastMonth}`;
      };
    
      useEffect(() => {
        if (weekDates && weekDates.length > 0) {
          const firstDay = weekDates[0];
          const lastDay = weekDates[weekDates.length - 1];
    
          if (firstDay.getMonth() === 11 && lastDay.getMonth() === 0) {
            setCurrentYear(lastDay.getFullYear());
          } else {
            setCurrentYear(firstDay.getFullYear());
          }
        }
      }, [weekDates]);
    
      const displayedMonths = getDisplayedMonths(weekDates);

  return (
    <header className="header">
      <button className="create-task-btn button" onClick={createTask}>
        <i className="fas fa-plus create-task-btn__icon" aria-hidden="true"></i>
        <span> Create</span>
      </button>

      {isModalOpen && <Modal onClose={closeModal} onSubmit={handleModalSubmit} />}

      <div className="navigation">
        <button className="navigation__today-btn button" onClick={onToday}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={onPrevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={onNextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {displayedMonths} {currentYear}
       </span>
      </div>
    </header>
  );
};

export default Header;

