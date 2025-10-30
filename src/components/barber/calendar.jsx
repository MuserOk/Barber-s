import React, { useState } from 'react';

export default function Calendario(){
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month' o 'day'
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Corte Carlos',
      date: new Date(2024, 0, 15, 10, 0),
      duration: 30,
      type: 'appointment'
    },
    {
      id: 2,
      title: 'Día Franco',
      date: new Date(2024, 0, 20),
      duration: 1440, // Todo el día
      type: 'day_off'
    }
  ]);

  // Navegación del calendario
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generar días del mes
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        events: []
      });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dayEvents = events.filter(event => 
        event.date.getDate() === i && 
        event.date.getMonth() === month && 
        event.date.getFullYear() === year
      );
      days.push({
        date,
        isCurrentMonth: true,
        events: dayEvents,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }

    // Días del siguiente mes
    const totalCells = 42; // 6 semanas
    while (days.length < totalCells) {
      const date = new Date(year, month + 1, days.length - firstDayOfWeek + 1);
      days.push({
        date,
        isCurrentMonth: false,
        events: []
      });
    }

    return days;
  };

  // Vista mensual
  const MonthView = () => {
    const days = getDaysInMonth();
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    return (
      <div className="bg-white shadow-lg md:max-w-200 md:m-auto md:rounded-tl-md md:rounded-tr-md py-4 px-2">
        {/* Header del mes */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-800">
            {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-stone-100 rounded-lg transition duration-200"
            >
              <span className="text-stone-600">◀</span>
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm text-gray-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition duration-200"
            >
              Hoy
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-stone-100  transition duration-200"
            >
              <span className="text-stone-600">▶</span>
            </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-px bg-stone-200">
          {weekDays.map(day => (
            <div key={day} className="bg-stone-50 p-2 text-center text-sm font-medium text-stone-600">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-px bg-stone-200">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-4 bg-white p-2 ${
                !day.isCurrentMonth ? 'bg-stone-50' : ''
              } ${day.isToday ? 'bg-amber-50 border-2 border-amber-200' : ''}`}
              onClick={() => setView('day')}
            >
              <div className={`text-sm font-medium ${
                !day.isCurrentMonth ? 'text-stone-400' : 
                day.isToday ? 'text-amber-600' : 'text-stone-700'
              }`}>
                {day.date.getDate()}
              </div>
              
              {/* Eventos del día */}
              <div className="mt-1 space-y-1">
                {day.events.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded text-white truncate ${
                      event.type === 'day_off' 
                        ? 'bg-red-500' 
                        : 'bg-blue-500'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
                {day.events.length > 3 && (
                  <div className="text-xs text-stone-500">
                    +{day.events.length - 3} más
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Vista diaria
  const DayView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
    
    const getEventsForDay = () => {
      return events.filter(event => 
        event.date.toDateString() === currentDate.toDateString()
      );
    };

    const dayEvents = getEventsForDay();

    return (
      <div className="bg-white shadow-lg px-2  md:max-w-200 md:m-auto md:rounded-tl-md md:rounded-tr-md py-4 ">
        {/* Header del día */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setView('month')}
              className="p-2 hover:bg-stone-100 rounded-lg transition duration-200"
            >
              <span className="text-stone-600">← Mes</span>
            </button>
            <h2 className="text-xl font-bold text-stone-800">
              {currentDate.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm text-gray-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition duration-200"
            >
              Hoy
            </button>
          </div>
        </div>

        {/* Agenda del día */}
        <div className="p-2">
          <div className="max-w-2xl mx-auto">
            {/* Horas */}
            <div className="space-y-4">
              {hours.map(hour => (
                <div key={hour} className="flex">
                  <div className="w-auto  text-sm text-stone-500 pt-2">
                    {hour}:00
                  </div>
                  <div className="flex-1 border-t border-stone-200 relative min-h-1">
                    {/* Eventos en esta hora */}
                    {dayEvents
                      .filter(event => event.date.getHours() === hour)
                      .map(event => (
                        <div
                          key={event.id}
                          className={`absolute left-0 right-0 m-1 p-2 rounded-lg text-white text-sm ${
                            event.type === 'day_off' 
                              ? 'bg-red-500' 
                              : 'bg-blue-500'
                          }`}
                          style={{
                            top: `${(event.date.getMinutes() / 60) * 100}%`,
                            height: `${(event.duration / 60) * 100}%`
                          }}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs opacity-90">
                            {event.date.toLocaleTimeString('es-ES', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Eventos de todo el día */}
            {dayEvents.filter(event => event.duration === 1440).length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-stone-700 mb-2">Todo el día</h3>
                <div className="space-y-2">
                  {dayEvents
                    .filter(event => event.duration === 1440)
                    .map(event => (
                      <div
                        key={event.id}
                        className="bg-red-100 border border-red-300 rounded-lg p-3"
                      >
                        <div className="font-medium text-red-800">{event.title}</div>
                        <div className="text-sm text-red-600">Día completo</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Modal para agregar evento
  const AddEventModal = ({ isOpen, onClose }) => {
    const [eventType, setEventType] = useState('day_off');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newEvent = {
        id: Date.now(),
        title: eventType === 'day_off' ? 'Día Franco' : title,
        date: new Date(date),
        duration: eventType === 'day_off' ? 1440 : 60,
        type: eventType
      };
      setEvents(prev => [...prev, newEvent]);
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-bold text-stone-800 mb-4">Agregar Evento</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Tipo de Evento
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="day_off">Día Franco / Falta Programada</option>
                <option value="appointment">Cita / Evento Personalizado</option>
              </select>
            </div>

            {eventType === 'appointment' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Título del Evento
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ej: Reunión con proveedor"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 transition duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition duration-200"
              >
                Agregar Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Header del calendario */}
      <div className="flex justify-between items-center my-4">
        <div className="flex space-x-3 px-2 justify-between items-center">
          {/* Selector de vista */}
          <div className="bg-white rounded-lg border border-stone-300 p-1">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded text-sm font-medium transition duration-200 ${
                view === 'month' 
                  ? 'bg-amber-500 text-white' 
                  : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              Mes
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded text-sm font-medium transition duration-200 ${
                view === 'day' 
                  ? 'bg-amber-500 text-white' 
                  : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              Día
            </button>
          </div>

          {/* Botón agregar evento */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200"
          >
            <span>+</span>
            <span>Agregar Evento</span>
          </button>
        </div>
      </div>

      {/* Vista del calendario */}
      {view === 'month' ? <MonthView /> : <DayView />}

      {/* Modal */}
      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

