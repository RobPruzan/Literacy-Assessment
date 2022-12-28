import React from 'react';
export type CardProps = {
  children: React.ReactNode;
};
export const Card = ({ children }: CardProps) => {
  return <div className="card">{children}</div>;
};
