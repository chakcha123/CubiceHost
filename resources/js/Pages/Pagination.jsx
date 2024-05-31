import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const Pagination = ({ data }) => {
  return (
    <nav aria-label="Page navigation" className="flex justify-center my-4">
      <ul className="inline-flex items-center -space-x-px">
        {data.links.map((link, index) => (
          link.url && (
            <li key={index}>
              <InertiaLink
                href={link.url}
                className={`px-3 py-2 border border-gray-300 ${link.active ? 'bg-creeper text-white' : 'bg-white text-gray-700 hover:bg-gray-200'} transition-colors duration-200 ease-in-out text-sm font-medium`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </li>
          )
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
