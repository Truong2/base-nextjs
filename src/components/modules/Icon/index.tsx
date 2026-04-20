"use client";

import React, { useState, useMemo } from "react";
import * as Icons from "~/assets/svg";
import Input from "~/components/ui/Input";

const IconsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const allIcons = useMemo(() => {
    return Object.entries(Icons).map(([name, Component]) => ({
      name,
      Component,
    }));
  }, []);

  const filteredIcons = useMemo(() => {
    if (!searchTerm) {
      return allIcons;
    }

    return allIcons.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allIcons, searchTerm]);

  // Handle copy icon name
  const handleCopyIcon = (name: string) => {
    navigator.clipboard
      .writeText(name)
      .then(() => {
        setCopiedIcon(name);
        setTimeout(() => setCopiedIcon(null), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Icon Library</h1>

      <div className="mb-8">
        <Input
          name="search"
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredIcons.map(({ name, Component }) => (
          <div
            key={name}
            className="relative flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            onClick={() => handleCopyIcon(name)}
          >
            <div className="mb-2 text-3xl text-gray-700">
              <Component />
            </div>
            <p className="w-full truncate text-center text-sm text-gray-600">
              {name}
            </p>
            {copiedIcon === name && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-70">
                <span className="font-medium text-white">Copied!</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconsPage;
