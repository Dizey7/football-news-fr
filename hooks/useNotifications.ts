'use client';

import { useState, useEffect } from 'react';
import type { Notification } from '@/types';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'breaking',
    title: 'Breaking News',
    message: 'Mbappé prolonge au Real Madrid jusqu\'en 2029 !',
    articleId: 'a2',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'algerie',
    title: 'Équipe d\'Algérie',
    message: 'La liste des convoqués pour le match contre la Guinée est tombée',
    articleId: 'a7',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'transfert',
    title: 'Transfert',
    message: 'Youcef Atal : Arsenal confirme son intérêt',
    transferId: 't3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
  },
  {
    id: 'n4',
    type: 'match',
    title: 'Match en direct',
    message: 'PSG 2 - 1 Inter Milan | 67\'',
    matchId: 'm1',
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    read: false,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
  };
}
