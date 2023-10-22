'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

const Page = () => {
  const [chipObj, setChipObj] = useState({
    key: '1',
    content: 'chip1',
    checked: false
  });
  const [chipObj2, setChipObj2] = useState({
    key: '2',
    content: 'chip2',
    checked: false
  });

  return (
    <div className="p-4">
      <section className="border-b p-3">
        <h1 className="pb-1">🐶 Button</h1>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => console.log('pr lg')}
          >
            primary
          </Button>
          <Button variant="primary" size="lg" disabled>
            primary
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => console.log('sc md')}
          >
            secondary
          </Button>
          <Button variant="tertiary" size="sm">
            tertiary
          </Button>
          <Button variant="outline" size="lg">
            outline
          </Button>
          <Button variant="text" icon="/images/icons/arrow.svg">
            text
          </Button>
          <Button variant="text" disabled>
            text
          </Button>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐱 Chip</h1>
        <div className="flex gap-2">
          <Chip
            item={chipObj}
            onClick={() =>
              setChipObj(prev => ({ ...prev, checked: !prev.checked }))
            }
          />
          <Chip
            item={chipObj2}
            onClick={() =>
              setChipObj2(prev => ({ ...prev, checked: !prev.checked }))
            }
            icon="/images/icons/time.svg"
          />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐭 Tabs</h1>
        <div className="flex gap-2">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Page;
