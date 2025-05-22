import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isThisWeek from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isThisWeek);

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | today | week

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notifications')) || [];

    // mark all as read
    const updated = stored.map((n) => ({ ...n, unread: false }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  }, []);

  const markAsRead = (index) => {
    const updated = [...notifications];
    updated[index].unread = false;
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const filtered = notifications.filter((n) => {
    const matchesText =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      (n.sender || '').toLowerCase().includes(search.toLowerCase());

    const timestamp = dayjs(n.timestamp);
    const matchesDate =
      filter === 'all' ||
      (filter === 'today' && timestamp.isToday()) ||
      (filter === 'week' && timestamp.isSameOrAfter(dayjs().subtract(7, 'day')));

    return matchesText && matchesDate;
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">🔔 Notifications</h2>

        <div className="flex gap-2 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded border text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search title/sender"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded text-sm w-64 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((n, i) => (
            <li
              key={i}
              onClick={() => markAsRead(i)}
              className={`flex justify-between items-start border-b pb-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${
                n.unread ? 'bg-blue-50 dark:bg-blue-900/30' : ''
              }`}
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {n.unread && <span className="text-blue-500 mr-1">🔵</span>}
                  {n.title}
                </p>
                {n.sender && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{n.sender}</p>
                )}
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {dayjs(n.timestamp).fromNow()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
