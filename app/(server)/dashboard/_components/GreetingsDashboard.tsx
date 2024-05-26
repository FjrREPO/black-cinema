import React from "react";

interface Props {
  firstName: string;
}

export default function GreetingsDashboard({ firstName }: Props) {
  return (
    <div className="border-b">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
        <p className="text-3xl font-bold">Hello, {firstName}!👋🏼</p>
      </div>
    </div>
  );
}
