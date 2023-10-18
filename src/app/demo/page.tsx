import { Button } from '@/components/ui/button';
import React from 'react';

const page = () => {
  return (
    <div className="p-4">
      <section className="border-b p-3">
        <h1 className="pb-1">🐶 Button</h1>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="lg"
            // onClick={() => console.log('pr lg')}
          >
            primary
          </Button>
          <Button variant="primary" size="lg" disabled>
            primary
          </Button>
          <Button variant="secondary" size="md">
            secondary
          </Button>
          <Button variant="thirdary" size="sm">
            thirdary
          </Button>
          <Button variant="thirdary" size="sm">
            thirdary
          </Button>
          <Button variant="outline">outline</Button>
        </div>
      </section>
    </div>
  );
};

export default page;
